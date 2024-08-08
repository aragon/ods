# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   Update `@typescript-eslint` packages to v8
-   Update `eslint` to v9

## [1.0.42] - 2024-08-07

### Fixed

-   Hide minimum participation details on `ProposalVotingBreakdownToken` module component when minParticipation is set
    to zero
-   Correctly forward web3 params (e.g. `chainId`) to native `ProposalActions` components
-   Fix ENS name truncation on `<Wallet />` module component
-   Update `<Wallet />` module component to only resolve user ENS name when name property is not set
-   Fix expand behaviour of `TextAreaRichText` core component when used inside a dialog and hide the input label
-   Fix `NumberInput` component to correctly update values on plus / minus buttons click
-   Fix `ProposalVotingBreakdownToken` module component to display correct progress variant when min-participation and
    support are equal to the threshold required

### Added

-   Update `<Wallet />` module component to support custom `chainId` and `wagmi` configurations
-   Add z-index property customisation for `TextAreaRichText` core component when expanded
-   Handle `useFocusTrap` property on dialog components to support disabling default focus-trap behaviour
-   Add `AlertCard` to `ProposalActionsAction` to alert user when action will send native currency
-   Update `ICompositeAddress` interface and components using it to support custom avatar
-   Make `ProposalStatus` strings customisable
-   Implement and export `proposalStatusToVotingStatus` utility
-   Add 'Raw' and 'Decoded' views to `ProposalActions` module component

### Changed

-   Update minor and patch NPM dependencies
-   Bump `postcss` from 8.4.40 to 8.4.41
-   Update `ProposalStatus` type to enum to align it with `ProposalVotingStatus` enum

## [1.0.41] - 2024-07-30

### Added

-   Export `VoteIndicator` type from `Vote` module
-   Update `useBlockExplorer` hook to export a `getBlockExplorer` function, update `buildEntityUrl` function to support
    a `chainId` parameter which overrides the `chainId` hook parameter

### Changed

-   Update minor and patch NPM dependencies

## [1.0.40] - 2024-07-26

### Added

-   Implement `ProposalAction` and `ProposalVoting` module components
-   Handle `WithdrawToken`, `ChangeMembers`, `UpdateMetadata`, `ChangeSettings` and `TokenMint` actions on
    `ProposalActions` module component
-   Add optional `hideLabelTokenVoting` and `tokenSymbol` props to the `MemberDataListItemStructure` module component
-   Implement `invariant` core utility

### Changed

-   Renamed `votingPower` prop to `tokenAmount` in the `MemberDataListItemStructure` module component
-   Update interface for `Accordion.Container` to expose value prop
-   Update styles on `Tabs.List` for latest spec
-   Rename `indicator` property of `<Progress />` core component to `thresholdIndicator` and set `data-value` property
    to indicator component to easier test its value
-   Bump `softprops/action-gh-release` from 2.0.6 to 2.0.8
-   Bump `ws` from 7.5.9 to 7.5.10
-   Update minor and patch NPM dependencies

### Fixed

-   Update `ProposalDataListItem` module component to avoid showing `null` when date property is not defined
-   Fix `DURATION` date format to use the date locale set on the formatter

## [1.0.39] - 2024-07-16

### Changed

-   Update minor and patch NPM dependencies
-   Update `useBlockExplorer` hook to return information about the block explorer

## [1.0.38] - 2024-07-16

### Added

-   Add new `variant` prop to core `Progress` component, which defaults to `primary`
-   Add new optional `indicator` prop to core `Progress` component
-   Add reset filter functionality to `DataListFilter` core component

### Fixed

-   Remove fixed width from `EmptyState` core component
-   Center `CardEmptyState` core component
-   Truncate long strings on `DaoDataListItem`, `AssetDataListItem`, `VoteDataListItem` module components
-   Fix errors and warnings thrown on component tests

### Changed

-   Bump `prettier-plugin-organize-imports` to 4.0.0
-   Update minor and patch NPM dependencies
-   Update minor and patch Github workflow dependencies

## [1.0.37] - 2024-07-08

### Changed

-   Format dates with `formatterUtils` within components
-   Update minor and patch NPM dependencies

## [1.0.36] - 2024-06-28

### Changed

-   Reduce the use of controlled components in stories to improve code visibility in Storybook
-   Export `DateFormat` and additional types for handling dates with the `FormatterUtils`
-   Update required parameters of `useBlockExplorer` hook, implement enum for chain entity types

## [1.0.35] - 2024-06-28

### Added

-   Implement `VoteProposalDataListItem` with Structure and Skeleton module
-   Add `useBlockExplorer` hook to generate block explorer links
-   Add `formatDate` utility function to `formatterUtils` to format dates
-   Add support for copy customization
-   Add `contentClassNames` property to `Dropdown.Container` component to support custom max width

### Changed

-   Remove Radix props dependency
-   Update minor and patch Github action dependencies
-   Update minor and patch NPM dependencies
-   Revert to using `react-docgen-typescript` for Storybook documentation generation

## [1.0.34] - 2024-06-21

### Fixed

-   Ensure `MemberAvatar` component only creates the blockies url on client environment

### Changed

-   Bump `@rollup/plugin-commonjs` from `25.0.8` to `26.0.1`
-   Update minor and patch dependencies of Github workflows
-   Update minor and patch NPM dependencies
-   Update `yarn` version to `4.3.0`
-   Update unit tests to use userEvent instead of fireEvent
-   Move all form items under a `forms` folder
-   Upgrade storybook to v8
-   Update `MemberDataListItem` component to support `votingPower` property set as string

### Added

-   Handle new `layoutClassnames` property on `DataList.Container` component to simplify implementation of custom
    `DataList` layouts
-   Create `ssrUtils` core utilities

## [1.0.33] - 2024-06-06

### Fixed

-   Correctly export `Collapsible` core component

## [1.0.32] - 2024-06-04

### Added

-   Implement `Wallet` module component
-   Implement `VoteDataListItem` with Structure and Skeleton module
-   Implement `ghost` variant for `Button` component
-   Implement `primaryInverted` variant for `Spinner` component

### Changed

-   Update minor and patch NPM dependencies
-   Update `yarn` version from `4.1.1` to `4.2.2`
-   Bump `@testing-library/react` from `15.0.7` to `16.0.0`
-   Update sizes of `Avatar` core component
-   Update style of `Button`, `CheckboxCard`, `InputContainer`, `RadioCard`, `Spinner` and `Switch` components
-   Cleanup size class definitions to use `size-*` instead of `h-* w-*`
-   Cleanup `shink-0` class usage across components
-   Add `data-testid` attribute to svg files

### Fixed

-   Fix responsiveness classes and utilities to support style for screens below `sm` breakpoint
-   Export module utilities

## [1.0.31] - 2024-05-24

### Fixed

-   Update library exports to support `require` calls

## [1.0.30] - 2024-05-24

### Fixed

-   Export `DefinitionList` core component

## [1.0.29] - 2024-05-24

### Added

-   Implement `DefinitionList` core component
-   Implement `TransactionDataListItem.Skeleton` module component
-   Implement `OdsCoreProvider`, `LinkBase` and `AvatarBase` core components to support `Link` and `Image` NextJs
    components.

### Changed

-   Bump NPM minor and patch dependencies
-   Bump minor and patch dependencies of Github workflows
-   Expose `onValueChange` property on `Accordion` core component
-   Update type extensions for `Tabs.Root` core component to allow forward ref
-   Update `OdsModulesProvider` component to render the `OdsCoreProvider` context.

## [1.0.28] - 2024-05-16

### Added

-   Implement `MemberDataListItem.Skeleton`, `AssetDataListItem.Skeleton`, and `DaoDataListItem.Skeleton` module
    components
-   Implement `Tabs` core component
-   Custom CSS property added for `Collapsible` to adjust z-index

### Fixed

-   Prose styling to match design system, better handling for `<code>` elements
-   Move z-index on Collapsible optional overlay to CSS as 'auto'
-   Fixed disabled styling of AvatarIcon for disabled `AccordionItem`

## [1.0.27] - 2024-05-08

### Added

-   Implement `Collapsible`, and `CardCollapsible` core components

## [1.0.26] - 2024-05-06

### Added

-   Implement `DocumentParser` and `Accordion` core component

### Changed

-   Bump `actions/checkout` from 4.1.3 to 4.1.4
-   Bump `peter-evans/find-comment` from 2.4.0 to 3.1.0
-   Bump `actions/github-script` from 6.4.1 to 7.0.1
-   Bump `ejs` from 3.1.9 to 3.1.10
-   Bump minor and patch dependencies

## [1.0.25] - 2024-04-24

### Added

-   Setup `Dependabot` to keep dependencies updated

### Changed

-   Set `yarn` version to v4 and update publish workflow
-   Update Dependabot config to group Github actions dependencies and fix Storybook group
-   Bump `mindsers/changelog-reader-action` from 2.2.2 to 2.2.3
-   Bump `peter-evans/create-or-update-comment` from 2 to 4.0.0
-   Bump `actions/setup-python` from 4.6.1 to 5.1.0
-   Bump `actions/setup-node` from 3.6.0 to 4.0.2
-   Bump `softprops/action-gh-release` from 0.1.15 to 2.0.4
-   Bump `dangoslen/changelog-enforcer` from 3.5.0 to 3.6.1
-   Bump `actions/checkout` from 3.5.3 to 4.1.3
-   Bump minimum Node version required from 18.18 to 20
-   Bump minor and patch dependencies

### Fixed

-   `ProposalDataListItemStructure` module component to clamp title to one line
-   Warnings on Github workflows for using deprecated yarn options
-   Warnings on tests because of `@testing-library/dom` version mismatch

## [1.0.24] - 2024-04-23

### Added

-   Implement `ProposalDataListItemSkeleton` module component
-   Extend `addressUtils` with `isAddressEqual` method

### Changed

-   Remove padding from `DataListContainer`, `DataListFilterStatus`, `DataListPagination` and `DataListRoot`
-   Add `stageId` and `stageTitle` properties to `IApprovalThresholdResult` & `IMajorityVotingResult` interfaces
-   Add `id` and optional `tag` properties to `ProposalDataListItemStructure`
-   Remove `publisherProfileLink` and `protocolUpdate` properties from `ProposalDataListItemStructure`
-   Update `date` and `result` properties of `ProposalDataListItemStructure` to be optional and `publisher` to allow for
    multiple publishers

### Fixed

-   `Link` core component to truncate on overflow

## [1.0.23] - 2024-04-18

### Added

-   Implement `Breadcrumbs`, `StateSkeletonBar`, and `StateSkeletonCircular` core components
-   Added `slash` icon file

### Changed

-   Update minor and patch dependencies
-   Update `@testing-library/react` to v15
-   Adjusted active and hover start styling on `AssetTransfer` module component
-   Export all components to allow usage without dot-notation

## [1.0.22] - 2024-04-12

### Added

-   Implement `AssetTransfer` module component

### Changed

-   Update `README` logo
-   Bump `tar` from 6.2.0 to 6.2.1
-   Drop `common-js` support

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
