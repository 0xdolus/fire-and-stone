# Research Packet 5: Firebase Auth + Security

Covers checklist questions 49–59.

## What it is

Firebase Authentication identifies users and issues ID tokens used by Security Rules and Cloud Functions.

## Accounts before ordering? (Q49)

**No.** Support guest / progressive checkout. Browse and cart without sign-in; collect contact at checkout; optionally upgrade to a permanent account after order.

## Login methods (Q50)

- **Primary (customers):** Phone OTP — natural for Rwanda / delivery contact.
- **Secondary:** Email (password or email-link) + optional Google/Apple.
- **Staff:** Email + strong password or Google.

Phone SMS requires Blaze and is paid per message; use test numbers in development.

## Guest checkout (Q51)

Yes. Anonymous Auth or client guest session, then link phone/email to preserve `uid` and order history.

## Recovery (Q52)

Phone: new OTP. Email: reset / magic link. Staff: verified email + optional MFA later.

## Phone verification (Q53)

Firebase SMS flow with reCAPTCHA / platform integrity. Test numbers free; production SMS billed.

## Duplicates (Q54)

Handle with account linking. On conflict, sign into existing account, migrate Firestore data, delete empty duplicate. Prefer “prevent multiple accounts per email” project setting.

## Previous orders (Q55)

Linking keeps the same `uid`, so existing orders remain associated. True merges use Admin SDK migration.

## Roles (Q56–57)

| Role | Capabilities |
|------|----------------|
| CUSTOMER | Own orders, addresses, place orders |
| ADMIN | Menu, prices, slots, users, settings |
| KITCHEN | Order board, status transitions, availability |
| DRIVER | (Future) assigned deliveries |

Store roles in **custom claims** (preferred) or on `users/{uid}`. Set claims only via Admin SDK.

## Enforcement (Q58)

1. Security Rules (`request.auth.token.role`).
2. Cloud Functions re-verify token/role for privileged actions.
3. Client UI hides controls but is never the security boundary.

## Customer isolation (Q59)

Strict `uid` match in rules. Staff are the only exception, limited to needed fields.

## Cost notes

Email/social/anonymous free to ~50k MAU. Phone SMS paid. Custom claims and rules are free.

## Decision summary

| Topic | Decision |
|-------|----------|
| Account required | No — guest/progressive |
| Primary login | Phone OTP |
| Roles | CUSTOMER / ADMIN / KITCHEN / DRIVER |
| Role storage | Custom claims |
| Client marks paid / status | Never |
