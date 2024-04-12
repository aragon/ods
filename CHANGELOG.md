# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   Implement `AssetTransfer` module component

### Changed

-   Update `README` logo
-   Bump `tar` from 6.2.0 to 6.2.1
-   Update `eslint` to v9

## [1.0.21] - 2024-04-04

### Added

-   Implement `DaoDataListItem.Structure`, `ProposalDataListItem.Structure`, `TransactionDataListItem.Structure`,
    `MemberDataListItem.Structure`, `AssetDataListItem.Structure`, and `AddressInput` module components
-   Implement `StatePingAnimation` core component
-   Implement `addressUtils` and `ensUtils` module utilities
-   Implement `useDebouncedValue` core hook and `clipboardUtils` core utility
-   Support `withSign` option on formatter

### Changed

-   Update `Tag` component primary variant styling
-   Update Eslint rules to align usage of boolean properties
-   Update default query-client options to set a stale time greater than 0
-   Bump `webpack-dev-middleware` from 6.1.1 to 6.1.2
-   Bump `express` from 4.18.2 to 4.19.2 #132

### Fixed

-   Reexport module components
-   Library build process to avoid bundling dependencies and peer-dependencies when using subfolders import (e.g.
    `wagmi/chains`)
-   Formatter utility to support negative numbers

## [1.0.20] - 2024-03-13

### Fixed

-   Fix library build to avoid bundling peer dependencies
-   Remove export of module components until the Aragon App migrates to Wagmi v2

## [1.0.19] - 2024-03-13

### Added

-   Implement animations for `Dialog` and `DialogAlert` components
-   Implement `DaoAvatar` and `MemberAvatar` module components
-   Implement `OdsModulesProvider` for using wagmi hooks on modules components
-   Introduce component customisations for the z-index property of the `Dropdown` and `Dialogs` components

### Changed

-   Update library structure to support module components
-   Update documentation about how to install the library
-   Update minor and patch dependencies
-   Update `@typescript-eslint` and `eslint-plugin-storybook` dependencies
-   Set minimum required node version to 18.18.0 (required by `@typescript-eslint` v7)
-   Update documentation on modules components
-   Update required dependencies, move `react` and `react-dom` to peer dependencies

## [1.0.18] - 2024-02-29

### Fixed

-   Usage of `Dropdown` component inside a `Dialog` component
-   Remove auto-focus to `Dropdown` trigger to avoid closing dialogs on `DropdownItem` click

## [1.0.17] - 2024-02-28

### Added

-   Implement `DataList` component
-   Handling of responsive sizes to `Progress` component

### Changed

-   Update `eslint` rules to enforce no circular dependencies

### Fixed

-   `CardEmptyState` component to horizontally center content
-   Spacings of `EmptyState` component when being stacked and having an object illustration
-   Typos on documentation and comments

### Removed

-   `ActionItem` component

## [1.0.16] - 2024-02-27

### Added

-   Add `customTrigger` and `align` properties to Dropdown component
-   Implement `DialogAlert` and `Dialog` components

### Fixed

-   `Icon` styling to prevent shrinking
-   Correct `IconType.MINUS` icon for InputNumber component

## [1.0.15] - 2024-02-23

### Changed

-   Add `disabled` and `isLoading` properties to Button component, remove `state` property
-   Update `AlertCard` component to accept any ReactNode as `description` property
-   Rename `isDisabled` property of input components to `disabled`
-   Bump `ip` library from 2.0.0 to 2.0.1

## [1.0.14] - 2024-02-20

### Added

-   Implement `Heading`, `InputFileAvatar` and `Dropdown` components
-   All SVGs have new designs/code implemented with "currentColor" fill, 16x16 mask
-   Added `richtext-heading`, `blockchain-block`, `app-transactions`, `logout`, `critical` and `sort-desc` icon files
-   Ref property handling on `Button` component

### Removed

-   Removed `radio-pause`, `switch`, `tx-failure`, `turn-off` and `update` icon files

### Changed

-   Renamed `menu-vertical` to `dots-vertical`
-   Renamed `menu-horizontal` to `dots-horizontal`
-   Renamed `menu-default` to `menu`
-   Renamed `sort` to `sort-asc`
-   Renamed `add` to `plus`
-   Renamed `remove` to `minus`
-   Renamed `question` to `help`
-   Renamed `radio-cancel` to `remove`
-   Renamed `radio-default` to `radio`
-   Renamed `radio-check` to `success`
-   Renamed `checkbox-multi` to `checkbox-indeterminate`
-   Renamed `checkbox-default` to `checkbox`
-   Renamed `tx-smart-contract` to `blockchain-smartcontract`
-   Renamed `tx-deposit` to `deposit`
-   Renamed `tx-withdraw` to `withdraw`
-   Renamed `app-finance` to `app-assets`
-   Renamed `app-governance` to `app-proposals`
-   Renamed `app-community` to `app-members`
-   Renamed `explore` to `app-explore`
-   Renamed `dashboard` to `app-dashboard`
-   Renamed `blockchain` to `blockchain-blockchain`
-   Renamed `gas-fee` to `blockchain-gasfee`
-   Renamed `wysiwyg-bold` to `richtext-bold`
-   Renamed `wysiwyg-italic` to `richtext-italic`
-   Renamed `wysiwyg-link-set` to `richtext-link-add`
-   Renamed `wysiwyg-link-unset` to `richtext-link-remove`
-   Renamed `wysiwyg-list-ordered` to `richtext-list-ordered`
-   Renamed `wysiwyg-list-unordered` to `richtext-list-unordered`

## [1.0.13] - 2024-02-14

### Added

-   Implement `Tooltip` component

### Changed

-   Update minor and patch versions of dependencies

### Fixed

-   Style of `Progress` component to make it full width

## [1.0.12] - 2024-02-12

### Added

-   Implement `CardEmptyState`, `EmptyState`, `Checkbox`, `CheckboxGroup`, `CheckboxCard`, `RadioGroup`, `Radio`, and
    `RadioCard` components
-   Export all component types
-   Handle style transitions on `ActionItem`, `Button` and `Toggle` components
-   Property `defaultValue` to `ToggleGroup` component to set an initial value for uncontrolled usage
-   `shadow-info` Tailwind CSS utility class and documentationonents
-   Ref forwarding to `InputNumber`, `InputSearch`, `InputText` and `TextArea` components

### Fixed

-   Storybook stories to only use the component's required properties on `default` stories
-   `Button` component to render a button element when the `href` property is set to `undefined`
-   Hide clear icon on `InputSearch` component when disabled

### Changed

-   Implement new style for `AlertCard`, `Spinner`, `Switch`, `InputContainer`, `Toggle` and `Tag` components
-   Mark variant property of `AlertInline` and `AlertCard` components as optional and set it to `info` by default
-   Remove border color from `Card` component, update style of `CardSummary` component as for new design
-   Set default properties to `Button` and `Spinner` components
-   Hide date picker indicator when `InputDate` component is disabled
-   Update `InputNumber` component to handle prefix and suffix properties through `react-imask`
-   Align cursor style of disabled components
-   Update line-height and height of `TextArea` and `TextAreaRichText` components

## [1.0.11] - 2024-02-06

### Fixed

-   Properly export ESM/CJS library depending on current environment and fix CJS build

## [1.0.10] - 2024-02-05

### Added

-   Implement `Link`, `InputNumber`, `InputTime`, `TextArea` and `TextAreaRichText` components
-   Implement Addon element for `InputText` component
-   Handle size property on `Progress` component
-   `border-none` Tailwind CSS utility class

### Changed

-   Update minor and patch versions of dependencies
-   Update `husky` to v9
-   Add `wrapperClassName` property to `InputContainer` component to customise the input wrapper
-   Update `InputContainer` props to accept any HTML div property and support textarea elements

### Fixed

-   Fix styling conflict in `InputText` introduced by Addon element

## [1.0.9] - 2024-01-23

### Fixed

-   Minimum `tailwindcss` version required
-   Fix disabled input style on Firefox
-   Max Length on inputs is restyled and only shows if no alert
-   Fix `Toggle` component shadow styling

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
