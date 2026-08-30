# Research Packet 6: Emulator Suite + $0 Development

Covers checklist questions 73–82.

## What it is

Firebase Local Emulator Suite runs Auth, Firestore, Storage, Functions, and Hosting on localhost. Apps and Functions talk to emulators instead of the cloud → zero cost and zero production risk.

## Emulators used (Q73)

| Emulator | Priority |
|----------|----------|
| Authentication | Required |
| Cloud Firestore | Required |
| Cloud Storage | Required |
| Cloud Functions | Required (even if production deploy is deferred) |
| Emulator Suite UI | Always |
| Hosting | Optional |

## Local capabilities (Q74–78)

- Auth: users, test phone codes, custom claims, linking.
- Firestore: full rules enforcement, real-time listeners.
- Storage: upload/download rules.
- Functions: HTTP, callable, background triggers; interoperates with other emulators.
- Rules: unit-tested with `@firebase/rules-unit-testing`.

## Seed data (Q79)

- `firebase emulators:start --import=./seed-data --export-on-exit`
- Or Admin SDK seed scripts pointed at emulators via env vars.
- Keep seed under `packages/firebase/seed/` in the monorepo.

## Reset (Q80)

- Firestore: `clearFirestore()` or emulator REST DELETE.
- Auth: clear accounts endpoint.
- Use in `beforeEach` for deterministic tests.

## CI (Q81)

```bash
firebase emulators:exec --only auth,firestore,storage,functions "npm run test:integration"
```

- Runs on GitHub Actions Linux runners.
- Use `demo-` project IDs.
- Cache `~/.cache/firebase/emulators`.

## Prevent production access (Q82)

**Strongest:** `demo-` project IDs — no real cloud resources; accidental non-emulated calls fail.

Also:
- Env guards (`__DEV__` / `USE_EMULATORS`) before `connect*Emulator`.
- No production service accounts in repo or on developer machines.
- Separate real projects for staging and production.
- Production IAM restricted to release roles only.

## Daily $0 workflow

```bash
firebase emulators:start --import=./seed-data
# other terminal
npx expo start   # app pointed at emulators
```

## Decision summary

| Topic | Decision |
|-------|----------|
| Emulators | Auth + Firestore + Storage + Functions |
| Local/CI project | `demo-` projects |
| Seed | Versioned import + scripts |
| CI | `emulators:exec` |
| Cost | $0 for local and CI |
