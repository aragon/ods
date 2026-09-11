---
"@aragon/gov-ui-kit": minor
---

Allow applications to provide custom editors for individual decoded proposal action parameters while retaining automatic calldata encoding.
Custom parameter components receive the current decoder mode, so the same component can serve the read, watch and edit views. The `proposalActionsDecoder` types are now exported from the package root.
