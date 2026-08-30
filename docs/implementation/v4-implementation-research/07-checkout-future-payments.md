# V4 Packet 07 — Checkout & Future Payments

## Checkout state machine

```text
CART → CHECKOUT_DETAILS → SUBMITTING → ORDER_CREATED
  → CASH: AWAITING_FULFILLMENT (PENDING_CASH)
  → DIGITAL (future): AWAITING_PAYMENT → PAID | FAILED | EXPIRED
→ TRACKING
```

## V4 live method: Cash only

createOrder with paymentMethod CASH → paymentStatus PENDING_CASH → staff marks PAID when collected.

## Digital (future)

Abstract `PaymentProvider` interface: initiate + parseWebhook.
Candidates: **Flutterwave**, **Paypack** (Rwanda MoMo).
PAID only from verified webhook (signature + amount match). Client cannot set PAID for digital.

## paymentStatus values

PENDING | PENDING_CASH | PAID | FAILED | EXPIRED | REFUNDED

## Fields on order

paymentMethod, paymentStatus, paymentProvider?, providerReference?, amountPaidMinor?, paidAt?, paymentAttempts[]?

## Provider swap

Checkout depends on method + PaymentService; config selects provider implementation. COD always available in V4.

## Secrets

API keys and webhook secrets only in Functions / EAS secrets — never in the client app.

## Decision summary

| Topic | Decision |
|-------|----------|
| V4 payment | COD |
| Digital | Interface + webhook authority |
| Fake paid | Impossible from client |
| Idempotency | clientRequestId + provider ref |

**Decision produced:** Payment abstraction ready for future integration.
