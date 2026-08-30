# apps/mobile — Customer app (Expo)

**Status: bootstrap placeholder.** No product code has been implemented yet.
This directory establishes the workspace location described by
`docs/architecture/Repository-GitHub-Setup-V1.md` §1 so that CI, workspace
tooling, and future task packets have a stable path to target.

## Frozen direction (do not implement ahead of a task packet)

Per `docs/implementation/Implementation-V4.md` §1 and
`docs/implementation/v4-implementation-research/01-routing-navigation-app-structure.md`:

- Expo SDK 57, React Native, TypeScript
- Expo Router (file-based routing) — routes under `src/app/`
- Zustand for client state, TanStack Query for server state
- Feature folders under `src/features/{menu,cart,orders,auth,...}`

## What exists right now

- `package.json` — minimal workspace member manifest so the root workspace
  and CI can resolve this package. No dependencies installed yet.
- `tsconfig.json` — extends the shared base config.
- `src/` — empty; awaits the first scoped implementation task.

## Do not

- Do not port the JSX prototype (`prototype/FireAndStoneApp.jsx` in the
  bootstrap input) into this directory as-is. It is a visual/interaction
  reference only, not production architecture
  (`docs/implementation/Implementation-V4.md` §1).
- Do not add product screens, navigation, or Firebase wiring without an
  approved task packet referencing this path as an allowed path.
