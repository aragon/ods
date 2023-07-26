# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.8] - 2023-07-26

### Added

-   New icons: IconExplore, IconShrink, IconRadioPause, IconQuestion, and IconFailure
-   `acceptableFileFormat` property for InputImage component

### Changed

-   Changed the contents of IconCopy and IconLinkExternal

## [0.2.7] - 2023-07-24

### Changed

-   Changed the contents of IconFeedback

### Added

-   `build:analyze` script to analyze bundle size

### Fixed

-   Set correct padding and height for `input-wallet` and `input-number` components
-   Preview workflow to correctly udpate preview comments on PRs
-   Fix "unknown event handler" warning on input components

## [0.2.6] - 2023-07-18

### Fixed

-   Set all dependencies as external

## [0.2.5] - 2023-07-13

### Fixed

-   Remove scroll from modals and bottom sheet components

## [0.2.4] - 2023-07-13

### Changed

-   Allow ENS address on address list-item component

### Added

-   Workflows to deploy Storybook previews
-   Step to enforce updates to changelog file

## [0.2.3] - 2023-07-12

### Fixed

-   Correctly bundle library to avoid `undefined` dependencies

## [0.2.2] - 2023-07-11

### Fixed

-   Add missing export for `breadcrumb` component

## [0.2.1] - 2023-07-11

### Fixed

-   Add missing exports for components
-   Fix `lint-staged` configuration file

## [0.2.0] - 2023-07-11

### Added

-   All components, tests and stories from `@aragon/ui-components` package

## [0.1.4] - 2023-07-11

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
