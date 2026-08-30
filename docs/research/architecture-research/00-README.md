# Fire & Stone — Technical Architecture Research Document

Compiled research packets answering the architecture checklist before freezing technical decisions.

## Packets

| # | Packet | Focus |
|---|--------|--------|
| 1 | GitHub + repository architecture | Repo structure, branching, Actions, free limits |
| 2 | React Native + Expo + Android/iOS | Why RN/Expo, builds, EAS, environments |
| 3 | Firebase + pricing / free limits | Spark vs Blaze, quotas, ownership |
| 4 | Firestore data architecture | Collections, carts, prices, slots, rules |
| 5 | Firebase Auth + security | Login methods, roles, guest checkout |
| 6 | Emulator Suite + $0 development | Local emulators, CI, production protection |
| 7 | Admin / Kitchen + backend | Staff web app, Cloud Functions, order flow |
| 8 | Notifications + delivery | FCM, slots, drivers, zones |
| 9 | Future payments architecture | Cash / MoMo / Card, Rwanda providers, webhooks |
| 10 | Deployment + QA + client handoff | Environments, EAS, testing, transfer to Fire & Stone |

## How to use

Each packet follows the pattern:

> What it is → Why Fire & Stone needs it → How it connects → What data moves → Security → Free limits → Production cost → Alternatives → Decision

Freeze decisions packet-by-packet, then produce the final connection diagram from the checklist.

## $0 development principle

- Local work: Firebase Emulator Suite + `demo-` projects
- CI: GitHub Actions (Linux) + emulators
- Production billing and store accounts: owned by Fire & Stone at hand-over
