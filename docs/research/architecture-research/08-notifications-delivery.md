# Research Packet 8: Notifications + Delivery

Covers checklist questions 117–124 and 146–156.

## Notifications

### Events (Q117)

| Event | Recipient | Channel (v1) |
|-------|-----------|--------------|
| Order confirmed | Customer | Push |
| PREPARING / READY / OUT_FOR_DELIVERY / DELIVERED | Customer | Push |
| Cancelled / rejected | Customer | Push |
| New order | Kitchen / Admin | Push + in-app sound |

### Push vs SMS (Q118–119)

**Primary: FCM push (free, unlimited).**
SMS only later for critical cases (paid, requires Blaze).

FCM works with Expo (`expo-notifications`) or React Native Firebase Messaging. Tokens stored on the user document. Send from Cloud Functions via Admin SDK.

### Permissions (Q120–121)

Request after first order or on tracking screen — not on cold start. If denied, in-app status via Firestore still works. Never block ordering.

### Duplicates and automation (Q122–123)

Idempotent sender (e.g. `lastNotifiedStatus`). Automatic send on status change via Function/trigger.

### Templates (Q124)

Simple templates in Functions or `settings` so Admin can edit copy without redeploy.

## Delivery

### GPS / maps (Q146–147)

**Not in v1.** Manual addresses (text + optional lat/lng later).

### Addresses (Q148)

Entered or selected at checkout; full snapshot stored on the order.

### Zones and fees (Q149–150)

v1: flat or simple zone fee in `settings`, calculated server-side in `createOrder`.

### Slots (Q151–153)

Capacity + `reservedCount`; atomic reservation; Admin manages capacity.

### Drivers (Q154–156)

**v1: no separate driver app.** Kitchen/Admin marks OUT_FOR_DELIVERY and optional driver notes. DRIVER role + simple view later.

## Decision summary

| Topic | Decision |
|-------|----------|
| Notifications | FCM push first; SMS deferred |
| Permission | Soft; never block order |
| GPS | Not in v1 |
| Slots | Capacity + atomic reserve |
| Drivers | Admin board first |
