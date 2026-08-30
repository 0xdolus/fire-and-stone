# Research Packet 3: Firebase + Pricing / Free Limits

Covers checklist questions 38–48.

## What it is

Firebase provides Authentication, Cloud Firestore, Cloud Storage, Cloud Messaging, and (later) Cloud Functions. Emulator Suite supports fully local development.

## Services needed (Q38)

| Service | Needed? | Notes |
|---------|---------|-------|
| Authentication | Yes | Email + phone |
| Cloud Firestore | Yes | Primary database |
| Cloud Storage | Yes | Pizza images (requires Blaze since Feb 2026) |
| Cloud Messaging (FCM) | Yes | Push (always free) |
| Cloud Functions | Later | Business rules; architect now, deploy later |
| Hosting | Optional | Admin web if not elsewhere |
| Analytics / Crashlytics / Remote Config | Nice-to-have | Free |

## Spark vs Blaze (Q39–40)

- **Spark**: No payment method. Free products + free quotas on paid products.
- **Blaze**: Linked billing account. Same free quotas, then pay-as-you-go. Required for Cloud Storage (from Feb 2026) and Cloud Functions.

## Free quotas (Q41) — apply on both Spark and Blaze free tier

**Firestore (daily):**
- Stored data: 1 GiB
- Reads: 50,000 / day
- Writes: 20,000 / day
- Deletes: 20,000 / day
- Egress: 10 GiB / month

**Storage (Blaze; free tier still applies):**
- Stored: ~5 GB
- Downloads: ~1 GB / day

**Functions (Blaze):**
- Invocations: 2 million / month (plus compute free allowances)

**Always free:** FCM, Crashlytics, Remote Config, App Check, etc.

**Auth:** Email/social/anonymous free up to ~50k MAU; Phone SMS is paid and requires Blaze.

## Exceeding quotas (Q42)

- Spark: service throttled/blocked for the period.
- Blaze: continues; overage billed (e.g. Firestore reads ~$0.06/100k). Set budget alerts — there is no hard cap by default.

## Development and staging free? (Q43–44)

- **Development:** Yes — Emulator Suite only → pure $0.
- **Staging:** Separate project; stay inside free quotas (Spark or low-usage Blaze with budget alerts).

## Production billing (Q45)

Eventually needs Blaze (Storage + Functions + real usage). Fire & Stone pays.

## Ownership and transfer (Q46–47)

- Production project should end under Fire & Stone Google account / organization.
- Transfer: add new Owner in Firebase Console → Users and permissions; adjust Cloud Billing account in Google Cloud Console.

## Prevent touching production (Q48)

1. Separate projects: emulators / staging / production.
2. No production credentials on developer machines or in the repo.
3. Emulator Suite + `demo-` projects for daily work.
4. Least-privilege IAM on production.
5. Branch protection for production config changes.

## Decision summary

| Topic | Decision |
|-------|----------|
| Services | Auth, Firestore, Storage, FCM (+ Functions later) |
| Development | Emulator Suite → $0 |
| Staging | Separate project, free quotas |
| Production | Blaze when needed; Fire & Stone owns billing |
| Protection | Separate projects + emulators + no prod keys in repo |
