# packages/shared

**Status: bootstrap placeholder.** No product code has been implemented yet.

## Purpose (frozen direction)

Per `docs/architecture/Repository-GitHub-Setup-V1.md` §1 and
`docs/implementation/v4-implementation-research/03-firestore-data-model-queries.md`:

Shared TypeScript types, money helpers (integer RWF minor units — no
floating-point currency), and order status transition logic used by both
`apps/mobile` and `apps/admin`, and mirrored by `functions/` where
applicable.

## What exists right now

- `package.json` — minimal workspace member manifest.
- `tsconfig.json` — extends the shared base config; this package is the
  base for other workspaces' path aliases once implemented.
- `src/` — empty; awaits the first scoped implementation task.

## Do not

- Do not define order-total or pricing logic here as the *authoritative*
  calculation — the server (`functions/`) is the price/total authority per
  `docs/architecture/Architecture-V1.md` §6 and §10. Shared helpers here are
  for consistent formatting/typing, not for computing trusted totals
  client-side.
