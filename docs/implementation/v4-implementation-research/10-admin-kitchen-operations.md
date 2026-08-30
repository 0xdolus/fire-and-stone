# V4 Packet 10 — Admin & Kitchen Operations

## Surface

**Kitchen + Admin:** web app first (responsive). Customer mobile remains the consumer app. Kitchen-native mobile optional later.

## Kitchen tools (V4)

- Live order board (onSnapshot)
- Order detail + status actions
- New-order attention (sound/badge)
- Mark COD paid

## Concurrent staff

Server validates transitions; loser gets failed-precondition; UI refreshes from snapshot.

## Admin tools (V4 must-have)

1. Login + role gate
2. Kitchen board + status
3. Catalog CRUD (categories, products, extras)
4. Availability toggles + integer prices
5. Product image upload (Storage)
6. Delivery slots (capacity; reservedCount via system)
7. Settings (delivery fee, flags)
8. Staff role assignment (claims)

## Permissions

| Action | Kitchen | Admin |
|--------|---------|-------|
| Orders view/status | ✓ | ✓ |
| Catalog/prices/slots/settings | ✗ | ✓ |
| Role assignment | ✗ | ✓ |

## Audit

statusHistory on each order: { status, at, byUid, note? }

## Drivers

Out of V4; OUT_FOR_DELIVERY can be set without driver entity.

## Offline kitchen

Online required for truthful board; show offline banner.

## Decision summary

| Topic | Decision |
|-------|----------|
| Kitchen UI | Admin web |
| Live data | onSnapshot |
| Launch admin | Board + catalog + slots + COD |

**Decision produced:** Admin/kitchen operational model for V4.
