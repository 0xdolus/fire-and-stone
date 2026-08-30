# Research Packet 9: Future Payments Architecture

Covers checklist questions 104–116. **No live provider is connected in the current build.**

## Principle

```text
PaymentService
     │
┌────┼────┐
▼    ▼    ▼
Cash  Mobile Money  Card
 │         │         │
 │      FUTURE       │
 │     PROVIDER      │
 └────────┬──────────┘
          ▼
        Order
```

Clients never set `paymentStatus`. Only webhook Functions or staff actions mark paid.

## Methods (Q104–107)

| Method | In architecture? | Notes |
|--------|------------------|-------|
| Cash | Yes | Pay on delivery; staff confirm |
| Mobile Money | Yes | Dominant in Rwanda (MTN MoMo + Airtel Money) |
| Card | Yes | Via gateway (Visa/Mastercard) |

## Rwanda providers (Q108–110) — research snapshot

**Mobile Money aggregators / APIs:** Paypack, RwandaPay, Intouch, Flutterwave, others.
**Cards:** Flutterwave (Rwanda support), other African gateways.

Expect REST initiate APIs + webhooks for final status. Sandbox credentials available from providers. **None selected or integrated now.**

## Verification (Q111)

1. Create order with payment method and PENDING status.
2. Digital: backend initiates provider payment; webhook verifies signature, amount, order ID → sets PAID.
3. Cash: PENDING_CASH until staff confirms receipt.

## Failures, cancels, refunds (Q112–114)

- Fail: keep non-confirmed or timeout-cancel; release slot; notify.
- Cancel before pay: cancel order, release slot.
- Refund: record event; money movement via provider API or manual staff process.

## False paid claims (Q115)

Security rules block client writes to `paymentStatus` and settlement fields. Only webhook Function or staff callable may set PAID. Amount checked against order total.

## Swappability (Q116)

Thin `PaymentProvider` interface in Cloud Functions (`initiatePayment`, `handleWebhook`). Concrete classes per provider; select by config. Order/notification code depends only on the interface.

## Data fields (for later)

```text
paymentMethod, paymentStatus, paymentProvider, providerReference, amountPaid, paidAt
```

Optional payments history/events for audit.

## Now vs later

| Now | Later |
|-----|--------|
| Payment fields + rules | Live credentials |
| Cash confirmation path | MoMo + Card integrations |
| PaymentService stub | Concrete providers |
| No cloud payment calls | Production traffic |

## Decision summary

| Topic | Decision |
|-------|----------|
| Methods | Cash + MoMo + Card |
| Live provider now | None |
| Paid signal | Webhook or staff only |
| Abstraction | PaymentService interface |
| Rwanda rails | MTN + Airtel via aggregator when ready |
