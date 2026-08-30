# V4 Packet 02 — State Management & Data Fetching

## Key decisions

### State classification

| Kind | Tool |
|------|------|
| Local UI | React `useState` / component state |
| Client global (cart, UI flags) | **Zustand** |
| Server/async | **TanStack Query** + Firestore |
| Live order / kitchen | Firestore **`onSnapshot`** (narrow scope) |

### Cart

**Decision:** Zustand store + persist middleware (AsyncStorage or MMKV).
Guest cart stays on device; after login, keep local cart (no server cart doc in V4).
Do not store cart as source of truth in Firestore.

### Catalog & orders list

**Decision:** TanStack Query with Firestore `getDocs`/`getDoc`.
`staleTime` for menu (minutes). Invalidate on pull-to-refresh or after known admin changes if needed.

### Live tracking

**Decision:** Single `onSnapshot` on `orders/{orderId}` while tracking screen is focused.
Kitchen board: one snapshot query for active statuses. Unsubscribe on unmount.

### Optimistic UI

**Decision:** Cart mutations optimistic.
Order status on kitchen: prefer server confirmation to avoid conflicts; optional light optimistic with rollback on `failed-precondition`.

### Online manager

**Decision:** Wire TanStack Query `onlineManager` to React Native AppState / NetInfo so refetch behaves correctly in background/foreground.

## Decision summary

| Topic | Decision |
|-------|----------|
| Global client | Zustand + persist for cart |
| Server data | TanStack Query |
| Realtime | Selective onSnapshot only |
| Cart in Firestore | No (V4) |

**Decision produced:** Hybrid state/data-fetching architecture for V4.
