# V4 Packet 08 — Authentication & Account Lifecycle

## Customer

| Stage | Behavior |
|-------|----------|
| Browse / cart | No auth required |
| Checkout | Auth required — **Anonymous OK** |
| Upgrade | linkWithCredential (Phone primary, Email optional) |
| Return | Firebase Auth session persistence |

## Staff

Email/password (optional Google). Roles via custom claims. **No self-serve elevation.** Separate admin web.

## Guest → permanent

Prefer **link** so uid and orders stay continuous. On credential-already-in-use: sign in to existing account; migrate local cart if needed.

## Profile & addresses

users/{uid} profile fields; addresses with userId (root collection preferred for simple rules).

## Deletion

user.delete → Function cleans profile/addresses/tokens; **anonymize** order PII but retain order economics for restaurant records.

## Phone

Firebase Phone Auth (OTP). Production SMS needs Blaze; test numbers in emulator/dev. App Check before prod phone.

## Decision summary

| Topic | Decision |
|-------|----------|
| Guest checkout | Anonymous then optional link |
| Primary customer auth | Phone OTP |
| Staff | Email + claims |
| Deletion | Anonymize; keep orders |

**Decision produced:** Complete identity lifecycle for V4.
