# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

-   Minimum `tailwindcss` version required
-   Fix disabled input style on Firefox
-   Max Length on inputs is restyle, only shows if no alert

### Added

-   Implement `InputDate`, `Avatar` and `InputNumberMax` components
-   Add `AvatarIcon` documentation and tests

## [1.0.8] - 2024-01-17

### Fixed

-   Fix label size of `Switch` component

### Changed

-   Update minor and patch versions of dependencies

## [1.0.7] - 2024-01-12

### Added

-   Implement `Card`, `CardSummary`, `Switch`, `Toggle` and `ToggleGroup` components

### Changed

-   Update `Spinner` and `Button` components to handle responsive sizes
-   Update `Icon` and `AvatarIcon` components to handle xl and 2xl responsive sizes

### Fixed

-   Update `InputSearch` component to fix server-side rendering

## [1.0.6] - 2023-12-13

### Added

-   Implement `Tag`, `InputContainer`, `InputText` and `InputSearch` components
-   Documentation on how to handle library dependencies
-   `shadow-none` and `shake` Tailwind CSS utility classes

### Changed

-   Update library documentation
-   Output `build.css` file to be able to use ODS library without TailwindCSS
-   Relax `dependencies` and `peerDependencies` versions
-   Prettier configuration to propertly format markdown files
-   Bump `@adobe/css-tools` from 4.3.1 to 4.3.2

### Fixed

-   Correctly format `README.md` links on Storybook
-   Handling of value length for controlled inputs

## [1.0.5] - 2023-11-20

### Changed

-   Update `lint-staged` to v15
-   Update `babel`, `rollup`, `storybook` dependencies
-   Bundle `tslib` utilities into library by removing `importHelpers` TypeScript configuration

### Fixed

-   Introduce `@svgr/rollup` to correctly bundle SVGs
-   Remove redundant `jackspeak` dependency resolution
-   Move `"@svgr/rollup` dependency to dev dependencies

### Removed

-   Remove redundant `postcss` step and dependency
-   Do not include `tailwindcss` configuration utilities into bundle

## [1.0.4] - 2023-11-09

### Fixed

-   Mark all dependencies as external to fix library build

## [1.0.3] - 2023-11-08

### Fixed

-   Fix directory of types declarations
-   Remove empty `index.css` file

## [1.0.2] - 2023-10-25

### Added

-   Implement `formatterUtils` class to format numbers

### Changed

-   Bump `@babel/traverse` from 7.23.0 to 7.23.2

## [1.0.1] - 2023-10-16

### Added

-   Initial v1.0 release of `@aragon/ods` library
