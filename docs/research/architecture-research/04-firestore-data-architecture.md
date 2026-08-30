# Research Packet 4: Firestore Data Architecture

Covers checklist questions 60–72.

## What it is

Cloud Firestore is the single source of truth for products, prices, orders, delivery slots, users, and settings. Document model; no joins — denormalize intentionally.

## Recommended collections (Q60)

Shallow hierarchy (1–2 levels). Prefer root collections for kitchen/admin cross-queries.

```text
users/{userId}
products/{productId}
categories/{categoryId}
extras/{extraId}
orders/{orderId}
deliverySlots/{slotId}
addresses/{addressId}          # or under users
notifications/{notificationId}
settings/{docId}
```

**Orders** store line items with `unitPriceAtPurchase`, product name snapshot, extras, subtotal, deliveryFee, total, status, statusHistory, deliverySlotId, address snapshot, paymentStatus.

## Carts (Q61–62)

**Client-side** for v1 (AsyncStorage / secure storage).
On checkout, send cart to a Cloud Function that re-fetches prices, recalculates, creates the order, and reserves the slot.
Server-side carts only if multi-device sync becomes required.

## Price authority (Q63–64)

**Server only.** Client may show estimates; final totals are calculated in `createOrder`. Security rules reject client writes to monetary fields and status.

## Customizations (Q65)

Structured options on the product; snapshot selected extras (id, name, price) into each order line item.

## Unavailable products (Q66)

`isAvailable` (or status enum) on product. Soft-delete; never hard-delete products that appear in historical orders.

## Delivery slots (Q67–68)

Slot documents: date, start/end, capacity, reservedCount, isActive.
Reservation is atomic (transaction in Cloud Function). Clients never write `reservedCount`.

## Indexes (Q69)

Typical composites:
- orders: userId + createdAt
- orders: status + createdAt
- products: categoryId + isAvailable
- deliverySlots: date + startTime + isActive

Disable unused single-field indexes to reduce write cost.

## Retention (Q70–71)

Keep completed orders and payment records. Soft-delete catalog items. Archive very old data later if volume demands it.

## Security rules (Q72)

- Customers: only own data (`request.auth.uid == resource.data.userId`).
- Staff roles: status and menu writes.
- No client writes to totals, unit prices, status, or reservedCount.
- Prefer custom claims for roles to avoid extra rule reads.
- Test every rule in the Emulator Suite.

## Decision summary

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Style | Root collections, shallow | Kitchen queries, simplicity |
| Carts | Client-side initially | $0, simple, guest-friendly |
| Prices | Server-only | Anti-manipulation |
| Order items | Snapshot prices/names | Immutable history |
| Slots | Atomic reservation | No double-booking |
| Rules | Role-based + no client money fields | Core safety |
