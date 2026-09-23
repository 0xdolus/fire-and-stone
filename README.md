# Fire & Stone

A restaurant ordering platform: a customer mobile app (Expo/React Native)
and a Kitchen/Admin web app (React/Next.js), backed by Firebase.

**Status: repository bootstrap.** This repository currently contains the
project foundation only — workspace structure, documentation, security
rules baseline, and CI scaffolding. No customer-facing product features
have been implemented yet. See `apps/mobile/README.md`,
`apps/admin/README.md`, `packages/shared/README.md`, and
`functions/README.md` for the status of each workspace.

## Start here

- **`CLAUDE.md`** — implementation agent conventions: branch/commit/PR
  rules, allowed/forbidden paths, stop-and-ask rules, security boundaries.
- **`docs/README.md`** — source-of-truth hierarchy and where each kind of
  document lives.
- **`docs/architecture/Architecture-V1.md`** — frozen system architecture.
- **`docs/implementation/Implementation-V4.md`** — frozen implementation
  baseline (stack, structure, phased build order).
- **`docs/workflow/AI-Development-Workflow-v1.md`** — how work is scoped,
  assigned, and reviewed across human and AI agents.
- **`environment/README.md`** — how to configure local development (no
  real Firebase project required).

## Repository layout

```text
apps/mobile/        Customer app (Expo + React Native + TypeScript)
apps/admin/          Kitchen / Admin web app (React/Next.js + TypeScript)
packages/shared/      Shared types, money helpers, order-status logic
functions/            Firebase Cloud Functions (server-authoritative logic)
docs/                 Architecture, implementation, workflow, research, decisions
tasks/                Optional durable copies of task packets
environment/          Environment variable documentation (names only)
.github/              CI workflows, issue/PR templates, CODEOWNERS
firebase.json, firestore.rules, firestore.indexes.json, storage.rules
```

## Tech stack (frozen)

Per `docs/architecture/Architecture-V1.md` and
`docs/implementation/Implementation-V4.md`:

- **Mobile:** Expo SDK 57, React Native, TypeScript, Expo Router, Zustand,
  TanStack Query
- **Admin:** React/Next.js, TypeScript
- **Backend:** Firebase (Firestore, Auth with custom claims, Cloud
  Functions, Cloud Storage, Cloud Messaging)
- **Environments:** local Firebase Emulator Suite (dev) → staging Firebase
  project → production Firebase project
- **Payments (V1):** Cash on Delivery only; online payments are a
  documented future phase, not implemented now

## Local development

No real Firebase project or billing account is required to develop
locally — everything runs against the Firebase Emulator Suite. See
`environment/README.md` for setup steps.

```bash
npm install
firebase emulators:start
```

## Workspace scripts

This is an npm workspaces monorepo. From the repo root:

```bash
npm run lint --workspaces
npm run typecheck --workspaces
npm run test --workspaces
```

At bootstrap time these are placeholder scripts (see each workspace's
`package.json`) — they will be replaced with real ESLint/`tsc`/test-runner
commands as each workspace is implemented.

## Contributing

All work is scoped by a GitHub Issue using the task-packet template
(`.github/ISSUE_TEMPLATE/task-packet.md`) and delivered via PR using
`.github/PULL_REQUEST_TEMPLATE.md`. See `CLAUDE.md` and
`docs/workflow/AI-Development-Workflow-v1.md` for the full process,
including risk classification and review requirements.

## Security

Do not commit secrets, credentials, service-account files, payment
secrets, App Store/Google Play credentials, or real customer data. See
`.gitignore` and `environment/README.md`. Report any accidental exposure
immediately rather than attempting to "fix" it via a follow-up commit.
# trigger lint
# CI trigger Wed Sep 23 16:22:11 CAT 2026
