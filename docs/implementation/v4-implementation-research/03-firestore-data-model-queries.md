# V4 Packet 03 — Firestore Data Model & Query Design

## Collections (root)

`users`, `categories`, `products`, `extras`, `orders`, `deliverySlots`, `addresses`, `settings`

## Schema highlights

### users/{uid}

uid, phone, email, displayName, role (optional mirror), fcmTokens[], createdAt, updatedAt

### products/{productId}

name, description, categoryId, **basePriceMinor** (int), imageUrl, isAvailable, sortOrder,
sizes: [{ id, name, priceDeltaMinor }], extraIds[], timestamps

### extras/{extraId}

name, priceMinor (int), isAvailable

### orders/{orderId}

userId, status, items[] (snapshots), subtotalMinor, deliveryFeeMinor, totalMinor, currency `"RWF"`,
deliverySlotId?, addressSnapshot, customerSnapshot, paymentMethod, paymentStatus,
statusHistory[], clientRequestId, notes?, createdAt, updatedAt

**Line item:** productId, name, sizeId?, sizeName?, quantity, unitPriceMinor, extras[{ id, name, priceMinor }], lineTotalMinor

### deliverySlots/{slotId}

date, startTime, endTime, capacity, reservedCount (Function-only writes), isActive

## Money

**Decision:** Integer minor units = whole RWF francs. No float prices. Snapshot all money on order lines at purchase.

## Indexes (firestore.indexes.json)

- products: categoryId + isAvailable + sortOrder
- orders: userId + createdAt desc
- orders: status + createdAt asc
- deliverySlots: date + isActive + startTime

## Queries by screen

| Screen | Query |
|--------|--------|
| Menu | products by categoryId + isAvailable |
| Customer orders | userId == uid orderBy createdAt desc |
| Tracking | get/snapshot orders/{id} |
| Kitchen | status in active set orderBy createdAt |
| Slots | date + isActive + capacity check in Function |

## Decision summary

| Topic | Decision |
|-------|----------|
| Orders | Root collection + line snapshots |
| Money | Integer RWF |
| Cart | Not in Firestore |
| Availability | isAvailable flags; re-checked in createOrder |

**Decision produced:** Exact Firestore schema + indexes for V4.
