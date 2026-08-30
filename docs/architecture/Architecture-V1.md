# Fire & Stone — Architecture V1

**Status:** Frozen baseline
**Purpose:** Technical architecture source of truth for implementation.

## 1. Product platform

Fire & Stone is a mobile-first ordering platform for the Kigali, Rwanda restaurant. The customer application covers discovery, menu browsing, pizza customization, cart, checkout, order tracking, order history and account management. Rewards are removed from scope. Live payments are not connected in the current build, but the architecture supports future Cash, Mobile Money and Card integrations.

## 2. Applications

### Customer mobile
- React Native + Expo + TypeScript
- Android + iOS from one codebase

### Admin/Kitchen web
- React/Next.js application
- Role-based views for ADMIN and KITCHEN
- DRIVER role reserved for future use; no separate driver app in V1

## 3. Backend

Initial backend platform: Firebase.

- Firebase Authentication
- Firestore
- Firebase Storage for production media
- Firebase Cloud Messaging
- Cloud Functions for privileged/server-side business logic
- Firebase Emulator Suite for local development
- Firebase Hosting may host admin/web assets

The client is not the source of truth for prices, totals, availability, order state, delivery capacity or payment state.

## 4. Data model

Core Firestore collections:

- users
- products
- categories
- extras
- orders
- deliverySlots
- addresses
- notifications
- settings

Orders retain historical snapshots of purchased product name, unit price, selected extras and totals.

## 5. Order lifecycle

```text
PENDING → CONFIRMED → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED
```

Exception states include CANCELLED and REJECTED.

Customer-visible state is derived from backend state; the client cannot authoritatively transition an order.

## 6. Cart and pricing

The V1 implementation uses a local device cart. At order creation, the backend re-fetches authoritative product data and calculates the authoritative total.

Money is stored as integer RWF francs, not floating-point currency values.

Order creation must be idempotent using a client request identifier.

## 7. Delivery

Delivery slots are backend-controlled and capacity-limited.

Slot reservation must be atomic so concurrent customers cannot overbook the same slot.

V1 does not include live GPS, maps, or a driver application.

## 8. Authentication

Customers may browse as guests. Anonymous authentication may be linked to a permanent account later.

Preferred customer authentication: phone OTP.

Staff authentication uses staff identities with role-based authorization.

Roles:

- CUSTOMER
- ADMIN
- KITCHEN
- DRIVER (future)

## 9. Notifications

Firebase Cloud Messaging is the initial notification mechanism for order events. Notifications are triggered by backend events rather than arbitrary client timers.

## 10. Payments

Live payment providers are deferred.

The application exposes a PaymentService abstraction supporting:

- Cash on Delivery
- Mobile Money
- Card

The current build uses a mock/stub payment implementation. Future digital payment confirmation must be server/webhook-authoritative.

## 11. Environments

```text
DEVELOPMENT → Firebase Emulator Suite
STAGING     → Separate Firebase project
PRODUCTION  → Fire & Stone-owned production project
```

Production infrastructure and third-party provider accounts are owned and funded by Fire & Stone at launch.

## 12. Security

AI agents and local development environments must not receive production secrets, production Firebase Admin credentials, payment secrets, live customer PII or production database exports.

Firestore and Storage rules enforce data isolation and role-based access. Sensitive business operations execute server-side.

## 13. Cost constraint

Development should remain effectively $0 using local tooling, free development tiers where appropriate, and Firebase Emulator Suite. Production-only services are connected when Fire & Stone supplies the required accounts and billing.

## 14. Deferred capabilities

The following are intentionally outside current V1 implementation:

- Rewards/loyalty
- Live GPS
- Maps
- Dedicated driver app
- SMS infrastructure
- Live payment providers
- Advanced analytics
- Additional AI agents

## 15. Authority

This document is the approved architecture baseline. Changes require a documented proposal/ADR and human approval.
