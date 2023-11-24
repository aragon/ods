# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   Implement `Tag` component

### Changed

-   Update library documentation
-   Output `build.css` file to be able to use ODS library without TailwindCSS
-   Relax `dependencies` and `peerDependencies` versions
-   Prettier configuration to propertly format markdown files

## [1.0.5] - 2023-11-20

### Changed

-   Update `lint-staged` to v15
-   Update `babel`, `rollup`, `storybook` dependencies

### Fixed

-   Introduce `@svgr/rollup` to correctly bundle SVGs
-   Remove redundant `jackspeak` dependency resolution
-   Move `"@svgr/rollup` dependency to dev dependencies

### Removed

-   Remove redundant `postcss` step and dependency
-   Do not include `tailwindcss` configuration utilities into bundle

### Changed

-   Bundle `tslib` utilities into library by removing `importHelpers` TypeScript configuration

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
