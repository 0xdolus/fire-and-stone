# Research Packet 10: Deployment + QA + Client Handoff

Covers environments (Q180–182), deployment (Q183–192), QA (Q168–179), and hand-over (Q193–202).

## Environments

| Environment | Firebase | Builds |
|-------------|----------|--------|
| Development | Emulator Suite + `demo-` | Local / Expo Go / dev client |
| Staging | Separate Firebase project | EAS internal / TestFlight / internal track |
| Production | Fire & Stone project + billing | App Store + Play Store |

```text
DEVELOPMENT → Emulators
     ↓
STAGING → Firebase staging
     ↓
PRODUCTION → Fire & Stone Firebase
```

## Deployment pipeline

1. Feature branch → PR → required checks (lint, types, unit, emulator tests).
2. Merge to `main`.
3. Staging: deploy admin web + EAS preview/internal build.
4. Production: explicit approval → EAS production build → store submit.

**CI:** GitHub Actions on Linux; stay inside free Actions minutes.
**Mobile builds:** EAS (free tier has limited monthly builds; sufficient early on). Local Android builds free; local iOS needs Mac.
**Internal distribution:** EAS links, Play internal track, TestFlight.
**Store accounts & signing:** Ultimately owned by Fire & Stone; transfer credentials at hand-over.
**Production approval:** Designated release manager(s) from team + Fire & Stone.

## QA

| Area | Approach |
|------|----------|
| Mobile UI | Component tests + real devices |
| Security rules | Rules unit testing vs emulators |
| Order / checkout | Integration via `emulators:exec` |
| Offline | Manual + automated with network off |
| Notifications | Emulator + device with test tokens |
| Admin | Role-based flows (automated or manual) |
| E2E journey | Browse → cart → checkout → kitchen status → customer update |

Automated Firebase tests always use emulators.

## Cost ownership after hand-over

**Can stay $0 longer:** local emulators, GitHub Free Actions under quota, FCM, most Auth, Firestore/Storage inside free quotas, early EAS free builds.

**Fire & Stone pays when needed:** Blaze, overages, Phone SMS, paid EAS, Apple/Google developer fees, payment provider fees.

## Accounts at hand-over

**Fire & Stone owns:**
- Production Firebase + Cloud Billing
- Apple Developer + Google Play
- Production Expo/EAS project
- Domains, email, future payment merchant accounts

**Dev team can keep (or temporary):** staging/dev Firebase, personal dev accounts, sandbox payment keys.

## Hand-over checklist

1. Transfer production Firebase project ownership.
2. Move/re-link Cloud Billing to Fire & Stone.
3. Transfer store accounts and signing credentials.
4. Transfer production EAS project.
5. Deliver docs: architecture packets, runbooks, seed scripts, rules.
6. Set budget alerts and spending limits on production billing.
7. Revoke all development access to production credentials and project.

## Decision summary

| Topic | Decision |
|-------|----------|
| Envs | Dev (emulators) → Staging → Production |
| CI | GitHub Actions + emulators |
| Mobile builds | EAS free tier first |
| Production gate | Explicit approval |
| Store/signing | Fire & Stone owns |
| QA | Emulator-first + device matrix |
| Handoff | Full ownership + docs + credential transfer |
