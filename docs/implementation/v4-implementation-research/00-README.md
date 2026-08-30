# Fire & Stone — V4 Implementation Research

**Status:** Frozen research set (12 packets)
**Purpose:** Evidence-based implementation decisions for the pizza delivery platform (React Native/Expo + Firebase), derived from Architecture V1 and expanded into build-ready contracts.

**Format used in each packet:**
Question → Evidence → Options → Recommendation → Decision → Implementation consequence

## Packets

| # | File | Topic |
|---|------|--------|
| 01 | `01-routing-navigation-app-structure.md` | Expo Router, monorepo, deep linking |
| 02 | `02-state-data-fetching.md` | Zustand, TanStack Query, hybrid Firestore |
| 03 | `03-firestore-data-model-queries.md` | Schema, indexes, money, snapshots |
| 04 | `04-security-rules-authorization.md` | Rules, custom claims, roles |
| 05 | `05-cloud-functions-backend.md` | createOrder, status, idempotency |
| 06 | `06-cart-pricing-order-integrity.md` | Server prices, qty, integrity |
| 07 | `07-checkout-future-payments.md` | COD, payment abstraction |
| 08 | `08-authentication-account-lifecycle.md` | Anonymous, phone, deletion |
| 09 | `09-notifications-order-communication.md` | FCM, events, deep links |
| 10 | `10-admin-kitchen-operations.md` | Kitchen board, catalog admin |
| 11 | `11-offline-resilience-edge-cases.md` | Offline policy, races, TZ |
| 12 | `12-performance-quotas-launch.md` | Quota, monitoring, launch bar |

## Stack baseline (frozen)

- Expo SDK 57 + React Native + Expo Router
- Firebase: Auth, Firestore, Storage, Cloud Functions, FCM
- State: Zustand (client) + TanStack Query (server) + selective `onSnapshot`
- Money: integer RWF minor units (whole francs)
- Orders: created only via Cloud Functions
- V4 live payment: Cash on Delivery only; digital providers abstracted for later

## Next step

Derive the **Technical Build Specification** (tickets) from the **Decision** sections only. Do not re-open architecture unless requirements change.
