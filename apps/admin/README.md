# apps/admin — Kitchen / Admin web app

**Status: bootstrap placeholder.** No product code has been implemented yet.
This directory establishes the workspace location described by
`docs/architecture/Repository-GitHub-Setup-V1.md` §1 so that CI, workspace
tooling, and future task packets have a stable path to target.

## Frozen direction (do not implement ahead of a task packet)

Per `docs/architecture/Architecture-V1.md` §2 and
`docs/implementation/v4-implementation-research/10-admin-kitchen-operations.md`:

- React/Next.js application
- Role-based views for `ADMIN` and `KITCHEN` (custom claims); `DRIVER` role
  reserved for future use — no separate driver app in V1
- Live order board via `onSnapshot`, catalog CRUD, availability, delivery
  slot management, staff role assignment

## What exists right now

- `package.json` — minimal workspace member manifest so the root workspace
  and CI can resolve this package. No dependencies installed yet.
- `tsconfig.json` — extends the shared base config.
- `src/` — empty; awaits the first scoped implementation task.

## Do not

- Do not add product screens, privileged writes, or Firebase wiring without
  an approved task packet referencing this path as an allowed path.
- Any code here that can transition order status, write catalog data, or
  assign roles is **High/Architectural risk**
  (`docs/architecture/Repository-GitHub-Setup-V1.md` §10) and requires the
  corresponding review path.
