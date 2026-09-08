---
"@aragon/gov-ui-kit": patch
---

Reveal the full address from `AddressOutput` by default only while the rendered text is a truncated address: an ENS name, a DAO name or the literal `You` is not the address and has nothing to reveal, and the complete address needs no second copy of itself. An explicit `reveal` still wins in both directions, and the components that pre-truncated the address into their `label` now leave the truncation to `AddressOutput`, so they keep the reveal where the address is actually shortened.
