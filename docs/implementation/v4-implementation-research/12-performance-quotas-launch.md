# V4 Packet 12 — Performance, Quotas, Monitoring & Launch Readiness

## Data access discipline

- Catalog: TanStack Query + staleTime; avoid permanent snapshots
- Tracking: one order snapshot while focused
- Kitchen: one active-orders snapshot
- Paginate lists (limit + cursor)

## Client performance

expo-image caching; virtualize long lists if needed; **no maps required in V4**.

## Environments

Separate Firebase projects for dev/staging/prod. EAS profiles: development, preview, production.

## Monitoring

- Cloud Logging / Error Reporting for Functions
- Sentry (or equivalent) for mobile + admin
- Budget alerts on Blaze

## Analytics (light)

view_menu, add_to_cart, begin_checkout, order_placed, order_status_viewed

## Launch checklist (minimum)

- [ ] Rules + indexes deployed; rules tests green
- [ ] createOrder / status / cancel tested
- [ ] App Check (prod)
- [ ] Phone Auth on real devices
- [ ] FCM iOS + Android
- [ ] EAS production build
- [ ] Admin web + staff claims
- [ ] COD end-to-end
- [ ] Deep links
- [ ] Delete-account / privacy path
- [ ] Billing budget alerts

## Production-ready definition

Customer: browse → cart → COD checkout → track.
Kitchen: live board + status.
Admin: menu, slots, fee, roles.
Security: no client privileged order/payment writes.
Monitoring + rollback (OTA for JS; prior native build if needed).

Digital payments, drivers, SMS marketing = post-V4.

## Soft spots at scale

Hot slot docs, large kitchen snapshots, token array growth — document; shard/paginate only when measured.

## Decision summary

| Topic | Decision |
|-------|----------|
| Snapshots | Narrow and focused |
| Prod billing | Blaze when real traffic/SMS |
| Launch | COD-first checklist |
| Rollback | EAS Update + prior build |

**Decision produced:** Performance, quota, and launch-readiness bar for V4.

---

## V4 Implementation Research — complete

All 12 packets frozen. Next: Technical Build Specification tickets from Decision sections only.
