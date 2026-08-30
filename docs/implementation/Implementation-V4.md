# Fire & Stone — V4 Implementation Baseline

**Status:** Frozen implementation baseline
**Source:** V4 Implementation Research packet decisions.

## 1. Mobile application

- Expo SDK 57 / current frozen target from research
- React Native
- TypeScript
- Expo Router
- Monorepo app at `apps/mobile`

The existing JSX prototype is a reference, not production architecture.

## 2. State and data fetching

- Zustand for local/client application state
- TanStack Query for server state and cache
- Selective Firestore `onSnapshot` listeners only where realtime behavior is required
- Local cart for V1
- Offline checkout is blocked; readable/cacheable content may remain available when appropriate

## 3. Firestore

Firestore remains the server data source. The exact schema/query rules are defined by the V4 research packets:

- `03-firestore-data-model-queries.md`
- `04-security-rules-authorization.md`
- `05-cloud-functions-backend.md`
- `06-cart-pricing-order-integrity.md`

## 4. Server-authoritative operations

Server/business logic must control:

- current product prices
- product availability
- valid extras/options
- order totals
- delivery fees
- delivery slot capacity
- order state transitions
- privileged notifications

Order creation is a backend operation and must be idempotent.

## 5. Authentication

- Anonymous/guest access is supported for browsing and early cart usage.
- Account linking can convert an anonymous session to a permanent customer identity.
- Phone OTP is the primary customer authentication direction.
- Staff use role-controlled authenticated accounts.

## 6. Checkout

Current launch checkout path:

```text
Delivery/Pickup
→ Address (delivery)
→ Delivery slot (delivery)
→ Payment method
→ Order summary
→ Place order
```

For the current implementation, payment is a supported abstraction but not a live provider integration. Cash on Delivery is the active launch path. Mobile Money and Card remain future provider integrations.

## 7. Notifications

FCM is used for order communication. The V4 research defines event-to-notification behavior and token management.

## 8. Admin/Kitchen

A separate web app provides:

- order board
- kitchen workflow
- menu/product management
- availability
- delivery slot management
- administrative functions subject to role permissions

V1 does not require a separate driver app.

## 9. Offline and resilience

- Local cart remains usable without a backend round-trip until checkout.
- Checkout requires connectivity.
- Network-dependent failures must expose recovery actions.
- Duplicate order submissions are prevented through idempotency.

## 10. Performance and launch baseline

Use focused Firestore listeners, pagination where necessary, image optimization, and current Firebase/Expo quotas as defined in the research packets. Do not introduce infrastructure solely for theoretical scale.

## 11. Frozen research packet references

The authoritative detailed research is contained in:

- `01-routing-navigation-app-structure.md`
- `02-state-data-fetching.md`
- `03-firestore-data-model-queries.md`
- `04-security-rules-authorization.md`
- `05-cloud-functions-backend.md`
- `06-cart-pricing-order-integrity.md`
- `07-checkout-future-payments.md`
- `08-authentication-account-lifecycle.md`
- `09-notifications-order-communication.md`
- `10-admin-kitchen-operations.md`
- `11-offline-resilience-edge-cases.md`
- `12-performance-quotas-launch.md`

Changes require a decision/ADR rather than silent reinterpretation.
