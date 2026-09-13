---
"@aragon/gov-ui-kit": minor
---

Allow applications to provide custom editors for individual decoded proposal action parameters while retaining automatic calldata encoding.
Custom parameter components receive the current decoder mode, so the same component can serve the read, watch and edit views. The `proposalActionsDecoder` types are now exported from the package root.
`ProposalActions.Item` accepts an `alerts` slot, rendered above the action view alongside the warnings the component raises itself, for risk a consumer knows about and the component cannot infer.
