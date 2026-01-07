# react-table-skeleton

![npm](https://img.shields.io/npm/v/react-table-skeleton?color=brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)
![build](https://img.shields.io/github/actions/workflow/status/RomanFedytskyi/react-table-skeleton/ci.yml?branch=main)

Lightweight React `<tbody>` skeleton rows for loading tables with a **stable layout** and optional **shimmer animation**.

---

## Why use it

- Prevent layout jumps while table data is loading (fixed row heights).
- Reduce visual flicker with consistent skeleton cells matching column count.
- Works with plain `<table>` markup or any table library (TanStack Table, custom solutions).

---

## Quick example

```tsx
import React from "react";
import { TableSkeletonBody } from "react-table-skeleton";

function MyTable({ loading, data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>

      {loading ? (
        <TableSkeletonBody rows={5} columns={3} />
      ) : (
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.age}</td>
              <td>{d.city}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}
```

---

## Props

| Prop               | Type                  | Default                  | Description |
|--------------------|-----------------------|--------------------------|-------------|
| `rows`             | `number`              | `5`                      | Number of skeleton rows |
| `columns`          | `number \| array`     | `3`                      | Column count or column width config |
| `rowHeight`        | `number \| string`    | `48px`                   | Fixed row height (prevents layout shift) |
| `cellPadding`      | `number \| string`    | `8px`                    | Padding for each cell |
| `shimmer`          | `boolean`             | `true`                   | Enable shimmer animation |
| `randomize`        | `boolean`             | `false`                  | Stable per-column width variation |
| `className`        | `string`              | —                        | Passed to `<tbody>` |
| `style`            | `React.CSSProperties` | —                        | Inline styles for `<tbody>` |
| **Theming (v0.2.0)** |                     |                          | |
| `backgroundColor`  | `string`              | `#e6e6e6`                | Background color of skeleton bars |
| `shimmerColor`     | `string`              | `rgba(255,255,255,0.6)`  | Color of shimmer animation |
| `barHeight`        | `number \| string`    | `14px`                   | Height of skeleton bars |
| `barBorderRadius`  | `number \| string`    | `3px`                    | Border radius of skeleton bars |

### Column width configuration

```ts
columns={[
  { width: "40%" },
  { width: "30%" },
  { width: "30%" }
]}
```

Accepted values:
- `number`
- `string` (`px`, `%`, `fr`)
- `{ width?: number | string }`

### Theming example

Customize the appearance to match your design system:

```tsx
<TableSkeletonBody
  rows={5}
  columns={3}
  backgroundColor="#1e293b"
  shimmerColor="rgba(148, 163, 184, 0.3)"
  barHeight={16}
  barBorderRadius={6}
/>
```

For dark mode:

```tsx
<TableSkeletonBody
  rows={5}
  columns={3}
  backgroundColor="#374151"
  shimmerColor="rgba(156, 163, 175, 0.2)"
/>
```

---

## Accessibility

- Renders `<tbody aria-busy="true">` while loading.
- Skeleton bars use `role="presentation"` to avoid screen reader noise.

---

## Compatibility

- React 18+ (peer dependency)
- Works with:
  - Plain HTML tables
  - Next.js
  - Vite
  - Any bundler
- Ships:
  - ESM + CJS
  - TypeScript declarations
  - CSS marked as a side effect (not tree-shaken)

---

## Local example

A demo app is included in `./example`, consuming the package via `file:..`.

```bash
cd example
npm install
npm run dev
```

---

## Installation

```bash
npm install react-table-skeleton
```

---

## Build & publish (maintainers)

```bash
npm run typecheck
npm run build

npm pack
tar -tf react-table-skeleton-*.tgz

npm publish --access public
```

---

## Links

- Repository: https://github.com/RomanFedytskyi/react-table-skeleton
- Issues: https://github.com/RomanFedytskyi/react-table-skeleton/issues
- CI: https://github.com/RomanFedytskyi/react-table-skeleton/actions
- License: https://github.com/RomanFedytskyi/react-table-skeleton/blob/main/LICENSE
- Contributing: https://github.com/RomanFedytskyi/react-table-skeleton/blob/main/CONTRIBUTING.md
- Code of Conduct: https://github.com/RomanFedytskyi/react-table-skeleton/blob/main/CODE_OF_CONDUCT.md
- Security: https://github.com/RomanFedytskyi/react-table-skeleton/blob/main/SECURITY.md
- npm: https://www.npmjs.com/package/react-table-skeleton
