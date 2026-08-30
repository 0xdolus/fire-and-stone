# V4 Packet 09 — Notifications & Order Communication

## Channel

**V4 primary:** FCM push (free). SMS/email deferred except Auth OTP.

## Customer events (default)

| Status | Notify |
|--------|--------|
| Order placed / CONFIRMED | Yes |
| PREPARING | Optional / quiet |
| READY | Yes |
| OUT_FOR_DELIVERY | Yes |
| DELIVERED | Yes |
| CANCELLED / REJECTED | Yes |

Kitchen: alert on new active order.

## Tokens

- Multi-device: `fcmTokens[{ token, platform, updatedAt }]` on user
- Prune on invalid/not-registered FCM errors
- Remove device token on logout

## Pipeline

After successful status write → if shouldNotify and lastNotifiedStatus !== status → multicast → prune invalid → set lastNotifiedStatus.

Push failure must **not** roll back order status.

## Deep links

Payload includes orderId → Expo Router `/order/[orderId]`.

## Preferences

V4: system order updates if OS permission granted. Optional notificationPrefs for later marketing split.

## Decision summary

| Topic | Decision |
|-------|----------|
| Channel | FCM |
| Dedupe | lastNotifiedStatus |
| Multi-device | Token array |
| Failure | Log + prune; continue fulfillment |

**Decision produced:** Notification event architecture for V4.
