# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   Downgrade `tailwindcss` dependency to v2
-   Remove `tailwind-merge` dependency, use `classnames` instead
-   Bump `semver` from 5.7.1 to 5.7.2

### Added

-   CSS custom properties for design system

### Fixed

-   Font size of Tag component
-   Unknown option warning when running prettier

## [0.1.3] - 2023-07-10

### Fixed

-   Entrypoint of library on `package.json` file

## [0.1.2] - 2023-07-10

### Added

-   Export Tailwind configuration file

### Changed

-   Path to `index.css` file, from `src/styles/index.css` to `/index.css`

## [0.1.1] - 2023-07-10

### Added

-   Setup of development tools for ODS library
-   Tag component
