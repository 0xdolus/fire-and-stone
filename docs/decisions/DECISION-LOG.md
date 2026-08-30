# Fire & Stone — Decision Log

## Approved project decisions for Claude bootstrap

| ID | Decision | Status |
|---|---|---|
| DEC-001 | Use React Native + Expo + TypeScript for customer mobile | Accepted |
| DEC-002 | Use Firebase as initial backend platform | Accepted |
| DEC-003 | Use Firestore as the primary application database | Accepted |
| DEC-004 | Use Firebase Emulator Suite for $0 local development | Accepted |
| DEC-005 | Use GitHub as source-control and engineering source of truth | Accepted |
| DEC-006 | Use a private monorepo | Accepted |
| DEC-007 | Use Expo Router for mobile navigation | Accepted |
| DEC-008 | Use Zustand for client state and TanStack Query for server state | Accepted |
| DEC-009 | Keep the customer cart local for the initial implementation | Accepted |
| DEC-010 | Server/backend remains authoritative for price, availability, totals, slots and order state | Accepted |
| DEC-011 | Use idempotent order creation with a client request identifier | Accepted |
| DEC-012 | Support guest/anonymous browsing and account linking | Accepted |
| DEC-013 | Phone OTP is the primary customer authentication direction | Accepted |
| DEC-014 | Use role-based staff access for ADMIN and KITCHEN; DRIVER remains future | Accepted |
| DEC-015 | Use FCM for push notifications | Accepted |
| DEC-016 | Live payments are deferred; architecture supports Cash, Mobile Money and Card | Accepted |
| DEC-017 | Rewards/loyalty is removed from product scope | Accepted |
| DEC-018 | Human merge is mandatory during AI Development Workflow V1 | Accepted |
| DEC-019 | AI agents never receive production credentials or live PII | Accepted |
| DEC-020 | Architecture changes require ADR/decision and human approval | Accepted |

This document is a concise decision reference. Detailed reasoning lives in the research packets and architecture/implementation documents.
