# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2023-10-10

### Changed

-   Update `TailwindCSS` dependencies to v3
-   Update `React` dependencies to v18

## [0.2.19] - 2023-10-09

### Added

-   mobile pagination

### Fixed

-   Fix incorrect regex on Number Input that prevents "-" sign from being entered

### Changed

-   Update `postcss` to 8.4.31

## [0.2.18] - 2023-09-29

### Added

-   Removed display of dao url and dao ens name from `HeaderDao`, substituted with dropdown component
-   Introduced required `daoAddress` in `HeaderDao`
-   Made `daoEnsName` optional in `HeaderDao`
-   Renamed `copiedOnClick` to `onCopy` prop on `HeaderDao`, made `onCopy` accept copy input to be more generic
-   Added `shortenDaoUrl` util

## [0.2.17] - 2023-09-26

### Added

-   `IconSort` icon

## [0.2.16] - 2023-09-22

### Added

-   `bannerContent` property to `CardProposal` component to allow for optionally display banner
-   `bannerIcon` property to `CardProposal` component to allow optionally select icon for the banner

## [0.2.15] - 2023-09-19

### Added

-   `containerClassName` property to `TextInput` component to make it more customisable

### Fixed

-   Correctly udpate `WalletInput` display mode when changing the input value programmatically
-   Fix racing conditions on `WalletInput` component when resolving ens-names and addresses

### Changed

-   Removed `IconUpdate` fixed white color

## [0.2.14] - 2023-09-12

### Added

-   `ActionItemAddress` component
-   `IconUpdate` component

### Changed

-   `Link` component to include description

## [0.2.13] - 2023-08-31

### Fixed

-   Bump `@adobe/css-tools` from 4.2.0 to 4.3.1
-   Re-renders on `WalletInput` component when programmatically changing its value

## [0.2.12] - 2023-08-23

### Changed

-   `VoterListItem` onClick action to open etherscan

## [0.2.11] - 2023-08-23

### Fixed

-   Performances of `isEnsDomain` utility

### Added

-   New `VoterListItem` Component
-   Add `build:watch` script to re-build the library on file changes

### Changed

-   `VotersTable` component according to new ODS designs

## [0.2.10] - 2023-08-08

### Fixed

-   Disable page scroll when Modal component is open

## [0.2.9] - 2023-07-31

### Fixed

-   Revert "remove scroll from modals and bottom sheet components" to fix scroll issues

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
