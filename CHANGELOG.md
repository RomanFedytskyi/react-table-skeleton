# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-01-07

### Added
- Comprehensive test suite with 31 tests using Vitest and React Testing Library
- New badges to README: npm downloads, bundle size, TypeScript support, PRs welcome
- Vite configuration for example app to optimize development experience
- Test coverage for all component props and features
- Accessibility tests for ARIA attributes

### Fixed
- **Critical**: Fixed JSX rendering bug that caused "Objects are not valid as a React child" error
- Fixed shimmer animation to be smooth and infinite (no more blinking or gaps)
- Fixed package.json exports to correctly reference built files (main: dist/index.js, module: dist/index.mjs)
- Fixed React dependency handling by marking it as external in build

### Changed
- **Breaking (internal)**: Changed JSX transform from "react-jsx" to "react" in tsconfig (no impact on end users)
- Improved shimmer animation timing from 1.2s linear to 2s ease-in-out for more natural motion
- Enhanced animation flow: translateX(-100% → 200%) for seamless infinite loop
- Updated gradient positioning with centered shimmer at 50% for better visual effect
- Updated CI workflow to run tests before build

### Technical
- Added external dependencies configuration: ["react", "react/jsx-runtime"]
- Added bun.lock to .gitignore
- Updated example app to demonstrate correct CSS import usage

## [0.2.0] - 2026-01-07

### Added
- Customizable theming props:
  - `backgroundColor`: customize skeleton bar background color
  - `shimmerColor`: customize shimmer animation color
  - `barHeight`: control skeleton bar height
  - `barBorderRadius`: control skeleton bar border radius
- CSS custom properties (variables) for efficient theming
- Example app with multiple theme presets (default, dark, custom)

### Changed
- Implementation uses CSS variables without additional CSS overhead
- All theme props are optional with sensible defaults

## [0.1.0] - 2026-01-07

### Added
- Initial release
- Basic table skeleton component (`<TableSkeletonBody />`)
- Configurable rows and columns
- Optional shimmer animation
- Randomized column widths with seeded generation
- Fixed row heights to prevent layout shift
- TypeScript support with full type definitions
- ESM and CJS builds
- Accessibility features (aria-busy, role attributes)
- Example application
- CI/CD with GitHub Actions
- Comprehensive README with usage examples

[0.3.0]: https://github.com/RomanFedytskyi/react-table-skeleton/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/RomanFedytskyi/react-table-skeleton/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/RomanFedytskyi/react-table-skeleton/releases/tag/v0.1.0
