# Research Packet 2: React Native + Expo + Android/iOS

Covers checklist questions 23–37.

## What it is

Cross-platform mobile framework (React Native) delivered via Expo, with EAS for cloud builds and store submission workflows.

## Why React Native instead of separate Swift/Kotlin apps (Q23)

- One codebase for Android and iOS → faster delivery and lower cost for a small team.
- Shared business logic and UI patterns with the admin web app (React).
- Sufficient performance for a food-ordering app (lists, forms, real-time status).
- Native modules available via Expo modules / config plugins when needed.

## Why Expo instead of bare React Native (Q24)

- Managed workflow reduces native tooling burden (Xcode, Gradle, signing).
- EAS Build produces store-ready binaries without maintaining local native environments.
- Over-the-air updates (EAS Update) for JS/asset fixes without store review.
- Official path recommended by React Native docs for new apps.
- Can eject or use continuous native generation (CNG) later if deep native customization is required.

## Expo features actually needed (Q25)

- Expo Router (or React Navigation) for navigation.
- Expo Notifications for push.
- Secure Store / AsyncStorage for local cart and tokens.
- Image picker / image display for product photos.
- EAS Build + EAS Submit.
- Config plugins for Firebase (Auth, Firestore, Messaging, Storage) if using React Native Firebase, or Firebase JS SDK where sufficient.
- Environment configuration via `app.config.js` / EAS profiles.

## One codebase (Q26–27)

Yes — the entire customer app runs from one Expo codebase. Platform differences (permissions, status bar, file paths) are handled with `Platform.OS` and platform-specific files (`.ios.tsx` / `.android.tsx`) only where necessary.

## Navigation and deep linking (Q28–29)

- File-based routing with Expo Router is a strong default; React Navigation is fine if preferred.
- Deep links: configure scheme in `app.json` / associated domains for order tracking and future payment return URLs. Implement after core flows work.

## Configuration and environment variables (Q30–31)

- EAS Build profiles: `development`, `preview` (staging), `production`.
- Env vars via EAS secrets and `app.config.js` (`extra` field) or `expo-constants`.
- Never bake production Firebase keys into the client beyond the public Firebase web config; privileged operations stay in Cloud Functions.

## Android and iOS builds (Q32–37)

| Question | Answer |
|----------|--------|
| How generate Android builds? | EAS Build (`eas build -p android`) or local `eas build --local` / `npx expo run:android` |
| How generate iOS builds? | EAS Build (`eas build -p ios`); local requires macOS |
| Can we build locally for $0? | Yes for Android on any machine; iOS needs a Mac. Emulator/simulator work is free. |
| What does EAS provide that local does not? | Cloud Mac/Linux builders, credential management, store submission, internal distribution links, no local Xcode/Android Studio required |
| EAS free-tier limitations | Limited builds per month on Free plan (order of ~15 Android + ~15 iOS; confirm current quota). Resets monthly. Sufficient for early development. |
| Who owns signing credentials? | Ultimately Fire & Stone. During development, EAS can manage credentials; transfer ownership and secrets at hand-over. |

## Decision summary

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Framework | React Native + Expo | One team, one codebase, faster ship |
| Workflow | Managed Expo + EAS | Minimal native ops, cloud builds |
| Navigation | Expo Router or React Navigation | Standard, deep-link ready later |
| Envs | EAS profiles + secrets | Clear dev/staging/prod split |
| Builds | EAS first; local when needed | $0 path + scalable |
| Credentials | Fire & Stone owns at hand-over | Clean ownership |
