# V4 Packet 06 — Cart, Pricing & Order Integrity

## Price authority

**Decision:** Server only inside `createOrder`. Client prices are display-only.

## Sizes & extras

- Line unit = basePriceMinor + size.priceDeltaMinor
- Extras add priceMinor (snapshotted on line)

## Quantity

Integer 1…MAX_QTY (recommend **20** per line, configurable in settings). Enforced client + server.

## Unavailable / price change at checkout

- Unavailable → fail createOrder; keep cart; prompt refresh
- Price change → order at **server** total; response returns final totals

## Delivery fee

Computed in Function from settings (and later zones). Client cannot set fee.

## Currency

**RWF**, integer francs (centimes unused in practice). Shared money helpers in `packages/shared`.

## Order snapshot (required fields)

items with name/prices, subtotalMinor, deliveryFeeMinor, totalMinor, currency, addressSnapshot, customerSnapshot, payment fields, statusHistory, clientRequestId

## Post-submit

- No customer edit of lines
- Cancel only under policy (e.g. before PREPARING)
- Cancel releases slot via Function
- Totals remain for audit

## Duplicates

Same clientRequestId → same order; UI disables double submit.

## Decision summary

| Topic | Decision |
|-------|----------|
| Price authority | Server |
| Max qty | 20/line (configurable) |
| Historical prices | Snapshots |
| Edits | Cancel only |

**Decision produced:** Pricing + cart + order integrity rules for V4.
