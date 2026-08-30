# Research Packet 7: Admin / Kitchen + Backend

Covers checklist questions 93–103 and 125–135.

## Admin / Kitchen app (Q125–127)

**One web application with role-based views** (React/Next.js + Firebase JS SDK).

| Role | Capabilities |
|------|----------------|
| ADMIN | Menu, prices, availability, slots, users, settings, reports |
| KITCHEN | Live order board, status transitions, mark unavailable |
| DRIVER | Future: assigned deliveries |

Protected routes check custom claims. Real-time `onSnapshot` on orders filtered by status.

## Incoming orders (Q128)

Customer calls callable `createOrder` → Function validates, prices, reserves slot, writes order → kitchen board sees new document instantly (optional sound).

## Status transitions (Q129–130)

Lifecycle example:

```text
PENDING → CONFIRMED → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED
```

Only staff roles change status (callable or restricted write + validation). Customer app listens to own order document. Status change triggers notifications.

## Menu and slots (Q131–133)

Admin writes products/slots directly (rules allow staff). Reservation logic only in `createOrder` (atomic).

## Cancel / reject (Q134)

Staff set CANCELLED/REJECTED; Function releases slot and notifies customer. History retained.

## Restaurant offline (Q135)

Orders queue in Firestore; board catches up when connectivity returns. Offline persistence on admin web helps.

## Backend Functions (Q93–103)

**Principle:** Money, inventory, and order integrity run only in Cloud Functions / Admin SDK.

| Logic | Location |
|-------|----------|
| Final price & total | `createOrder` callable |
| Delivery fee | same |
| Slot reservation | same + transaction |
| Status validation | callable or trigger |
| Notifications | trigger on status change |
| Future payment webhooks | HTTP Function |

Start with: `createOrder`, `updateOrderStatus`, `onOrderStatusChange`, slot release on cancel.

- **Callable:** app-initiated, auth context automatic.
- **HTTP:** external webhooks.
- **Firestore trigger:** side effects after writes.

Functions require Blaze in production; fully testable on the emulator at $0.

## Security

Clients cannot write totals, unit prices, status, or reservedCount. Staff roles enforced via claims + Functions.

## Decision summary

| Topic | Decision |
|-------|----------|
| Admin + Kitchen | Single web app, role views |
| Order board | Real-time snapshots |
| Prices / slots | Server-only in Functions |
| Functions deploy | After billing available |
| Dev | Full emulator support |
