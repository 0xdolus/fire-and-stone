# V4 Packet 01 — Routing, Navigation & App Structure

Format: Question → Evidence → Options → Recommendation → Decision → Implementation consequence

## Context

Architecture V1 selected Expo + React Native monorepo. This packet freezes **how** routes and folders are structured.

## Key decisions

### Navigation library

**Decision:** **Expo Router** (file-based routing).
Evidence: Deep linking, typed routes, and Expo SDK alignment. Avoid React Navigation-only manual config unless forced.

**Consequence:** Routes live under `apps/mobile/src/app/` (or `app/` per Expo convention). Screens are files; layouts nest stacks/tabs.

### Monorepo layout

**Decision:**

```text
apps/
  mobile/          # Customer Expo app
  admin/           # Kitchen/Admin web (Vite or Expo web)
packages/
  shared/          # Types, money helpers, status transitions
functions/         # Cloud Functions
```

Feature folders under mobile: `src/features/{menu,cart,orders,auth,...}` plus shared `components/`.

### Deep linking

**Decision:** Scheme `fireandstone://` (and HTTPS universal links when domains ready).
Paths: `/order/[orderId]`, menu, cart, checkout. Notification taps open order tracking.

### Auth-gated routes

**Decision:** Browse/menu/cart public. Checkout and account require Auth (anonymous allowed). Staff admin is a separate app with role gate.

### Decision summary

| Topic | Decision |
|-------|----------|
| Router | Expo Router |
| Structure | apps/mobile, apps/admin, packages/shared, functions |
| Deep links | fireandstone:// + /order/[id] |
| Guest browse | Yes; checkout needs auth |

**Decision produced:** App shell and routing contract for V4.
