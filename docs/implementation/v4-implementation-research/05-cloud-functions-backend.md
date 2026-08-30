# V4 Packet 05 — Cloud Functions & Backend Business Logic

## Function-owned operations

| Operation | Type |
|-----------|------|
| createOrder | Callable |
| updateOrderStatus | Callable |
| cancelOrder | Callable |
| Payment webhooks | HTTP (future) |
| Role assignment | Callable (Admin) |
| Optional: onOrderStatusChange | Trigger for FCM |

## createOrder algorithm

1. Require auth
2. Idempotency: `(uid, clientRequestId)` → return existing if present
3. Validate items, quantities, payload
4. Load products/extras from server
5. Reject unavailable items
6. Compute all prices server-side (ignore client prices)
7. Delivery fee from settings
8. **Transaction:** slot capacity check + increment reservedCount + write order
9. Return `{ orderId, totalMinor, status }`

## Status graph

```text
PENDING → CONFIRMED → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED
         ↘ CANCELLED / REJECTED (policy-dependent)
```

Transitions validated by role + current status in callable; append statusHistory.

## Errors

Throw `HttpsError` with codes: unauthenticated, invalid-argument, failed-precondition, resource-exhausted, permission-denied, not-found, internal.

## Idempotency

- createOrder: clientRequestId
- Status: no-op if already at target status
- Triggers: lastNotifiedStatus / event id

## Testing

Functions + Firestore + Auth emulators; unit tests for pricing helpers.

## Decision summary

| Topic | Decision |
|-------|----------|
| Privileged writes | Functions only |
| Slot safety | Single transaction |
| Prices | Server only |
| Notify | After status; non-blocking |

**Decision produced:** Backend service contract for V4.
