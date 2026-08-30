# Environment configuration

How to configure local development, CI, EAS (mobile builds), and Cloud
Functions for Fire & Stone. This document describes **where values live**,
not the values themselves. No secret or production value belongs in git.

## Environments

Per `docs/architecture/Architecture-V1.md` §11:

```text
DEVELOPMENT → Firebase Emulator Suite (local, $0)
STAGING     → Separate Firebase project
PRODUCTION  → Fire & Stone-owned production project
```

| Environment | Firebase project | Owner |
|---|---|---|
| Development | `demo-fireandstone` (emulator-only, no real cloud resources) | N/A — local only |
| Staging | *to be created — record project id here once provisioned* | Engineering |
| Production | *to be created — record project id here once provisioned* | Fire & Stone |

Project ids for staging and production are **not yet assigned** as of
bootstrap. Record them here once Fire & Stone provisions the projects; do not
invent ids.

## Local development setup

1. Copy `.env.example` to `.env` in the relevant app (`apps/mobile/.env`,
   `apps/admin/.env`, `functions/.env`) as needed. `.env` is gitignored.
2. Fill in **development** values only. For local work this typically means
   `USE_FIREBASE_EMULATORS=true` and the `demo-fireandstone` project id —
   never a real Firebase API key tied to staging/production billing.
3. Start the emulator suite from the repo root:
   ```bash
   firebase emulators:start --import=./environment/seed-data --export-on-exit
   ```
4. In a second terminal, start the app you're working on (see that app's
   own README under `apps/mobile/` or `apps/admin/`).

No real Firebase project, billing account, or production credential is
required to develop locally.

## CI (GitHub Actions)

CI never receives production credentials. Workflows under `.github/workflows/`
run against the Firebase Emulator Suite using `demo-` project ids, exactly as
local development does. Any secret a workflow needs (none required for the
bootstrap-level CI in this repo) would be stored in **GitHub Actions
secrets**, referenced by name, and never echoed in logs.

## EAS (mobile builds)

Expo/EAS build profiles (`development`, `preview`, `production`) are
configured in `apps/mobile/eas.json` once that app is implemented. Secrets
for EAS builds live in **EAS environment variables / secrets**
(`eas secret:create`), not in this repo. Agents and CI reference variable
*names* only.

## Cloud Functions

Functions configuration and secrets live in Firebase Functions config or
Secret Manager, referenced by name from `functions/` source. No Functions
secret value is ever placed in this repository or shared with an AI agent.

## What is never committed

- `.env` (any variant except `.env.example`)
- Firebase service-account / Admin SDK JSON key files
- GitHub Personal Access Tokens
- Payment provider API keys or webhook secrets
- App Store Connect / Google Play credentials
- Production database exports or real customer data

See `.gitignore` at the repo root and
`docs/architecture/Repository-GitHub-Setup-V1.md` (environment/config rules
table) for the enforced list.
