# apps/mobile — Customer app (Expo)

**Status:** Concept shell v2.1 integrated on `feat/mobile-concept-v2`.

Interactive Expo customer ordering experience (mock data only). No Firebase Auth, payments, or live backend wiring yet — those land via approved task packets per monorepo rules.

## Stack (aligned with Implementation-V4)

| Layer | Technology |
|-------|------------|
| Framework | Expo SDK 57 |
| Navigation | Expo Router (`src/app/`) |
| Language | TypeScript (strict) |
| Client state | Zustand + AsyncStorage persist |
| Images | expo-image |
| Icons | Lucide React Native |
| Gradients | expo-linear-gradient |

## What's included

- Splash → Onboarding → Tabs (Menu / Cart / Orders / Account)
- Product detail, checkout, success, order tracking timeline
- Design System V4 tokens (`src/theme/`)
- Local mock catalog + promotions (`src/data/products.ts`)
- Persistent cart, favorites, orders, settings stores
- Photography under `assets/images/` (Unsplash stand-ins until official assets)

## Run (from this package)

```bash
cd apps/mobile
npm install
npx expo start
```

Or from monorepo root after workspaces resolve dependencies.

## Monorepo notes

- Package name: `@fire-and-stone/mobile` (do not rename)
- Extends `../../tsconfig.base.json`
- Path alias: `@/*` → `src/*`
- Do not add Firebase/Auth/privileged writes without an approved task packet

## Migration path

Later task packets can introduce:

1. TanStack Query + Firestore
2. Phone OTP auth
3. Server-authoritative pricing / order placement
4. Feature folders under `src/features/{menu,cart,orders,auth,...}` as needed

The current `src/app/` + `src/stores/` + `src/components/` layout is compatible with that evolution.
