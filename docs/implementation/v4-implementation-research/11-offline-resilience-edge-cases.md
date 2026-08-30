# V4 Packet 11 — Offline, Resilience & Edge Cases

## Offline matrix

| Feature | Offline |
|---------|---------|
| Cached menu | Yes |
| Cart | Yes (local) |
| createOrder | **No** — require online |
| Live status | Last known + banner |
| Kitchen board | Online required |

## Cart conflicts

Local-only cart → no server merge. On reconnect, refresh catalog; createOrder still uses server availability/prices.

## Double submit / retry

clientRequestId idempotency; disable button while pending; same id on retry.

## App kill / background

Auth + cart persist. Server may complete in-flight createOrder; list reconciles on resume. FCM for background alerts.

## Races

Last slot / availability: Function transaction + failed-precondition → refresh UI.

## Time

Server timestamps only. Business TZ: **Africa/Kigali**. Do not trust device clock for slots.

## Partial failure

Critical path = single transaction (slot + order). FCM best-effort after commit.

## Outage

Visible error; preserve cart; kitchen falls back to non-app process if Firebase down.

## Decision summary

| Topic | Decision |
|-------|----------|
| Offline checkout | Blocked |
| Idempotency | clientRequestId |
| Timezone | Africa/Kigali |
| Notify fail | Non-blocking |

**Decision produced:** Offline and edge-case policy for V4.
