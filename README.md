# react-table-skeleton

![npm (scoped)](https://img.shields.io/npm/v/react-table-skeleton?color=brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)
![build](https://img.shields.io/github/actions/workflow/status/RomanFedytskyi/react-table-skeleton/ci.yml?branch=main)

Lightweight React `<tbody>` skeleton rows for loading tables with stable layout and optional shimmer.

Why use it

- Avoid layout jumps when a table is loading (fixed row heights).
- Reduce flicker by showing consistent skeleton cells matching column counts.
- Works with plain `<table>` markup or any table library (TanStack Table, custom solutions).

Quick example

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

Props (v0.1.0)

- `rows` (number, default: `5`): Number of skeleton rows to render inside the `<tbody>`.
- `columns` (number | array, default: `3`): Either a column count or an array describing column widths. Array items may be `number | string | { width?: number | string }`.
- `rowHeight` (number | string, default: `48px`): Fixed CSS height for each skeleton row (prevents layout shifts).
- `cellPadding` (number | string, default: `8px`): Padding applied to each cell.
- `shimmer` (boolean, default: `true`): Enable the shimmer animation on bars.
- `randomize` (boolean, default: `false`): Deterministic per-column width variations for unspecified columns (stable between renders).
- `className`, `style`: Passed to the rendered `<tbody>` as usual.

Accessibility

- The component renders `<tbody aria-busy="true">` to signal loading state.
- Skeleton bars are `role="presentation"` to avoid noisy screen reader output.

Compatibility

- React 18+ (peer dependency).
- Works with plain `<table>` markup, Next.js, Vite, and other bundlers.
- Ships both ESM and CJS builds plus TypeScript declarations. CSS is included and marked as a side effect in `package.json` so bundlers will not tree-shake it.

Example (local demo)

An example app is included at `./example` that consumes the package via a local `file:..` dependency. To run it:

```bash
cd example
npm install
npm run dev
```

This opens a small Vite app demonstrating toggling between skeleton rows and real data.

Install

```bash
npm install react-table-skeleton
```

Build and publish (local steps)

Run these locally to verify and publish:

```bash
# run typecheck and build
npm run typecheck
npm run build

# verify what's published by packing locally
npm pack
tar -tf react-table-skeleton-*.tgz

# publish (requires npm login)
npm publish --access public
```

Links

- Repository: https://github.com/RomanFedytskyi/react-table-skeleton
- Issues: https://github.com/RomanFedytskyi/react-table-skeleton/issues
- CI: https://github.com/RomanFedytskyi/react-table-skeleton/actions
- License: ./LICENSE
- Contributing: ./CONTRIBUTING.md
- Code of Conduct: ./CODE_OF_CONDUCT.md
- Security: ./SECURITY.md
- npm: https://www.npmjs.com/package/react-table-skeleton

# react-table-skeleton

Lightweight React `<tbody>` skeleton rows for loading tables with stable layout and optional shimmer.

Usage

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

Props

- `rows` (default: `5`) — number of skeleton rows
- `columns` (default: `3`) — number or array of column widths
- `rowHeight` (default: `48px`) — fixed row height
- `cellPadding` (default: `8px`) — cell padding
- `shimmer` (default: `true`) — enable/disable shimmer animation
- `randomize` (default: `false`) — deterministic random widths for unspecified columns

Accessibility

- Renders `<tbody aria-busy="true">` when shown.
- Skeleton bars use `role="presentation"` to avoid extra screen reader noise.

Build

```
npm ci
npm run build
```
