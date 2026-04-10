# @ds-mo/icons

IcoMo — 380 SVG icons as tree-shakeable React components, TypeScript definitions, and SVG sprite.

Part of the **ds-mo design system trilogy**: [@ds-mo/tokens](https://www.npmjs.com/package/@ds-mo/tokens) → **@ds-mo/icons** → [@ds-mo/ui](https://www.npmjs.com/package/@ds-mo/ui) (CompoMo).

Figma-first: icons are exported from Figma and built into React components via generator scripts. Drop in new SVGs, run the build, everything updates.

## Install

```bash
npm install @ds-mo/icons
# or
pnpm add @ds-mo/icons
```

React is a peer dependency — make sure it's installed in your project.

## Usage

### React components

```tsx
import { ArrowRight, CheckCircle, Gear } from '@ds-mo/icons';

// Default: 20px, currentColor
<ArrowRight />

// Custom size
<ArrowRight size={24} />

// Custom size and color
<ArrowRight size={24} color="red" />

// With CSS variables
<ArrowRight size="var(--dimension-size-400)" color="var(--color-icon-primary)" />

// With a ref
import { useRef } from 'react';
const ref = useRef<SVGSVGElement>(null);
<ArrowRight ref={ref} />
```

All standard SVG attributes are forwarded, plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `20` | Width and height |
| `color` | `string` | `'currentColor'` | Fill color |
| `className` | `string` | — | CSS class |

### Direct imports

For guaranteed tree-shaking in environments where barrel imports aren't optimised:

```tsx
import { ArrowRight } from '@ds-mo/icons/icons/ArrowRight';
```

### SVG sprite (non-React)

Include the sprite in your HTML, then reference icons by kebab-case name:

```html
<svg width="20" height="20"><use href="/sprite.svg#arrow-right"/></svg>
<svg width="20" height="20"><use href="/sprite.svg#check-circle"/></svg>
<svg width="20" height="20"><use href="/sprite.svg#gear"/></svg>
```

## CompoMo integration

IcoMo icons are designed to work with [CompoMo (@ds-mo/ui)](https://www.npmjs.com/package/@ds-mo/ui) components via the `icon` prop pattern. CompoMo components accept any React component that matches:

```ts
icon?: React.ComponentType<{ size?: number | string }>
```

All IcoMo icons satisfy this interface, so you can pass them directly:

```tsx
import { Button } from '@ds-mo/ui';
import { ArrowRight, CheckCircle } from '@ds-mo/icons';

<Button icon={ArrowRight}>Continue</Button>
<Button icon={CheckCircle} variant="success">Done</Button>
```

## Icon names

All icons are PascalCase in React, kebab-case in the sprite:

| React | Sprite |
|---|---|
| `ArrowRight` | `arrow-right` |
| `CheckCircle` | `check-circle` |
| `EntityVehicleFilled` | `entity-vehicle-filled` |

## Adding or updating icons

1. Export SVGs from Figma as 16×16, fill-based, with `fill="black"`
2. Drop into `src/icons/` — filenames must be PascalCase (e.g. `MyNewIcon.svg`)
3. Run the build:

```bash
node scripts/build.mjs
```

## Dev

```bash
node scripts/build.mjs          # full build
node scripts/build.mjs --watch  # watch mode (rebuilds on SVG changes)
```

## License

MIT
