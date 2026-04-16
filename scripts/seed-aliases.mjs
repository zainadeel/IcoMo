/**
 * seed-aliases.mjs — one-off seeder
 *
 * Parses ICON_ALIASES_REVIEW.md and writes a sidecar src/icons/<IconName>.json
 * for every icon with an `aliases` array.
 *
 * Run once:   node scripts/seed-aliases.mjs
 *
 * After seeding, the JSON sidecars are the source of truth — edit them
 * directly. This script can be re-run safely; it overwrites existing
 * sidecars.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const docPath = join(root, 'ICON_ALIASES_REVIEW.md');
const iconsDir = join(root, 'src', 'icons');

const doc = readFileSync(docPath, 'utf8');

// Match lines like:  - `IconName` → `alias1`, `alias2`, `alias3`
// Supports ASCII "->" and unicode "→" between name and aliases.
const lineRe = /^- `([A-Za-z0-9]+)`\s*(?:→|->)\s*(.+)$/gm;
const aliasRe = /`([^`]+)`/g;

const entries = [];
for (const m of doc.matchAll(lineRe)) {
  const name = m[1];
  const aliases = [...m[2].matchAll(aliasRe)].map(x => x[1]);
  if (aliases.length) entries.push({ name, aliases });
}

// Guard against duplicate parse (e.g. if someone lists an icon twice).
const seen = new Map();
for (const e of entries) {
  if (seen.has(e.name)) {
    console.warn(`  ! duplicate entry for ${e.name} — using last occurrence`);
  }
  seen.set(e.name, e.aliases);
}

// Sanity check: every sidecar should have a matching SVG.
const svgNames = new Set(
  readdirSync(iconsDir)
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace(/\.svg$/, ''))
);

let written = 0;
let missing = [];
for (const [name, aliases] of seen) {
  if (!svgNames.has(name)) {
    missing.push(name);
    continue;
  }
  const outPath = join(iconsDir, `${name}.json`);
  writeFileSync(outPath, JSON.stringify({ aliases }, null, 2) + '\n');
  written++;
}

// Report SVGs with no alias entry — useful when new icons land without doc updates.
const withoutAliases = [...svgNames].filter(n => !seen.has(n));

console.log(`\n  ✓ sidecars written: ${written}`);
if (missing.length) {
  console.log(`  ! aliases for missing SVGs (${missing.length}): ${missing.join(', ')}`);
}
if (withoutAliases.length) {
  console.log(`  ! SVGs with no aliases yet (${withoutAliases.length}): ${withoutAliases.join(', ')}`);
}
console.log();
