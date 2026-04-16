/**
 * Generate dist/meta.json + dist/meta.d.ts
 *
 * Reads per-icon sidecar JSONs (src/icons/<IconName>.json) and merges them
 * into a single machine-readable manifest that ships with the package.
 *
 * Sidecar shape: { "aliases": string[] }
 *
 * Output shape (meta.json):
 * {
 *   "version": "0.2.1",
 *   "count": 377,
 *   "icons": [
 *     { "name": "ArrowRight", "kebab": "arrow-right", "aliases": ["right", ...] }
 *   ]
 * }
 *
 * Consumers (agents, docs, tooling) can:
 *   import meta from '@ds-mo/icons/meta'
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIconManifest } from './utils/naming.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.resolve(__dirname, '..');
const SRC_ICONS = path.join(PKG_ROOT, 'src', 'icons');
const DIST_DIR = path.join(PKG_ROOT, 'dist');

const pkg = JSON.parse(readFileSync(path.join(PKG_ROOT, 'package.json'), 'utf8'));
const manifest = getIconManifest(SRC_ICONS);

const icons = manifest.map(({ pascal, kebab }) => {
  const sidecarPath = path.join(SRC_ICONS, `${pascal}.json`);
  let aliases = [];
  if (existsSync(sidecarPath)) {
    try {
      const parsed = JSON.parse(readFileSync(sidecarPath, 'utf8'));
      if (Array.isArray(parsed.aliases)) aliases = parsed.aliases;
    } catch (err) {
      console.warn(`    ! malformed sidecar ${pascal}.json — skipping aliases`);
    }
  }
  return { name: pascal, kebab, aliases };
});

const withoutAliases = icons.filter(i => i.aliases.length === 0).map(i => i.name);

const meta = {
  version: pkg.version,
  count: icons.length,
  icons,
};

writeFileSync(path.join(DIST_DIR, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');

// Tiny .d.ts so `import meta from '@ds-mo/icons/meta'` is typed.
const dts = `export interface IconMetaEntry {
  name: string;
  kebab: string;
  aliases: string[];
}

export interface IconMeta {
  version: string;
  count: number;
  icons: IconMetaEntry[];
}

declare const meta: IconMeta;
export default meta;
`;
writeFileSync(path.join(DIST_DIR, 'meta.d.ts'), dts);

// Also emit an ESM wrapper so bundlers can tree-shake / import default.
writeFileSync(
  path.join(DIST_DIR, 'meta.mjs'),
  `import meta from './meta.json' with { type: 'json' };\nexport default meta;\n`
);

console.log(`    Generated meta.json (${icons.length} icons, ${icons.length - withoutAliases.length} with aliases)`);
if (withoutAliases.length) {
  console.log(`    ! ${withoutAliases.length} icons without aliases: ${withoutAliases.slice(0, 5).join(', ')}${withoutAliases.length > 5 ? '…' : ''}`);
}
