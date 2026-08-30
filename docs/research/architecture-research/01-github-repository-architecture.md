# Research Packet 1: GitHub + Repository Architecture

Covers checklist questions 11–22 (and related overall architecture points).

## What it is

GitHub is the source of truth for code, history, collaboration, issues, and CI/CD via GitHub Actions. For Fire & Stone it holds the mobile app, admin/kitchen web surfaces, shared types/logic, docs, and tests.

## Why Fire & Stone needs it

- Single place for all code so the eventual hand-over is clean.
- Enforces review + automated checks before anything reaches production-ready code.
- Provides free (or very low-cost) CI that can later integrate with EAS builds and Firebase emulators.
- Supports private development while the product is not public.

## Decisions

### 11. Repository visibility

**Private** for the entire development and early production period.

- Code contains business rules, pricing logic, order flows, and later payment integration points.
- On GitHub Free: unlimited private repositories and unlimited collaborators.
- Transfer the entire private repository (or organization) to Fire & Stone at hand-over.

### 12. Monorepo vs separate repos

**One monorepo.**

- Mobile (Expo), Admin web, Kitchen web, and shared domain types change together.
- Atomic PRs that update client + shared types + security rules reduce API drift.
- Simpler for a small team and for final hand-over.
- Expo officially supports monorepos (workspaces + Metro configuration).

### 13. Recommended structure

```text
fire-and-stone/
├── apps/
│   ├── mobile/          # Expo / React Native customer app
│   ├── admin/           # Admin + Kitchen web
│   └── web/             # Optional public / marketing
├── packages/
│   ├── shared/          # Types, validation, order helpers
│   ├── firebase/        # Emulator config, rules, seed, Functions stubs
│   └── ui/              # Optional shared components
├── docs/
├── .github/workflows/
├── scripts/
├── package.json
├── pnpm-workspace.yaml  # or yarn/npm equivalent
└── README.md
```

### 14–16. Branch strategy

**GitHub Flow (simplified).**

- `main` = always production-ready / releasable.
- Short-lived feature branches from `main`.
- No long-lived `develop` required at the start.
- Optional later: `staging` or `release/*` if a longer QA window is needed.

`main` should always represent production-ready code. Use feature flags or environment config for unfinished work.

### 17–18. Pull requests and checks

- All changes via PR.
- At least one approving review.
- Prefer squash-merge; delete branch after merge.
- Required checks: lint, TypeScript, unit tests; later Firebase emulator / rules tests.
- Path filters so mobile-only changes do not re-run admin tests.

### 19. GitHub Issues

- Product backlog and technical tasks.
- Labels: `mobile`, `admin`, `firebase`, `security`, `cost`, `handover`.
- Milestones for releases or research packets.

### 20–22. GitHub Actions

Automate early: lint, typecheck, unit tests on PR/push to main. Prefer Linux runners only.

**Free limits (2026):**

| Plan | Private-repo minutes / month | Artifact storage | Public repos |
|------|------------------------------|------------------|--------------|
| Free | 2,000 Linux minutes | 500 MB | Unlimited |
| Pro / Team | 3,000 | 1–2 GB | Unlimited |

- Linux = 1×, Windows = 2×, macOS = 10× against quota.
- Without a payment method, usage is blocked once the free quota is exhausted.
- Path filters, caching, and concurrency groups keep usage inside free tier.

## Security

- Secrets (Firebase, EAS, later payment keys) in GitHub Actions secrets — never in the repo.
- Least-privilege collaborator access; admin rights only for CI identity and eventual owners.

## Decision summary

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Visibility | Private | IP + safety |
| Structure | Single monorepo | Shared types, atomic changes, clean hand-over |
| Branch model | GitHub Flow | Simple, fits mobile + CI |
| `main` | Always releasable | Predictable releases |
| CI | GitHub Actions (Linux, path-filtered) | Stays inside free 2,000 min |
| Ownership at hand-over | Transfer whole repo/org | Clean cut |
