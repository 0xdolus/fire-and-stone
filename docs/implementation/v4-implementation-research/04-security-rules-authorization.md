# V4 Packet 04 — Firebase Security Rules & Authorization

## Roles (custom claims)

`CUSTOMER` (default) | `KITCHEN` | `ADMIN` | `DRIVER` (future)

Set only via Admin SDK. Prefer claims over document `get()` for role checks in rules.

## Access matrix

| Resource | Unauth | Customer | Kitchen | Admin |
|----------|--------|----------|---------|-------|
| Catalog read | ✓ | ✓ | ✓ | ✓ |
| Catalog write | ✗ | ✗ | limited | ✓ |
| Own user | — | limited | — | ✓ |
| Own orders read | ✗ | ✓ | ✓ | ✓ |
| Orders create | ✗ | **Function only** | Function only | Function only |
| Order status | ✗ | ✗ | ✓ | ✓ |
| Payment fields | ✗ | ✗ | cash confirm via Function | Function/webhook |
| Slots write | ✗ | ✗ | ✗ | ✓ (reservedCount via Admin SDK) |

## Rules principles

- `allow create: if false` on `orders` for clients
- Owner checks: `request.auth.uid == resource.data.userId`
- Staff: `request.auth.token.role in ['KITCHEN','ADMIN']`
- Deny by default

## Storage

Product images: public read; Admin write; validate image contentType and size.

## Testing

`@firebase/rules-unit-testing` + emulators in CI (`assertSucceeds` / `assertFails`).

## Abuse

App Check in production; rate-limit sensitive callables in Function code.

## Decision summary

| Topic | Decision |
|-------|----------|
| Order create | Functions only |
| Roles | Custom claims |
| Isolation | Strict uid match for customers |
| Testing | Emulator unit tests |

**Decision produced:** Authorization matrix + rules approach for V4.
