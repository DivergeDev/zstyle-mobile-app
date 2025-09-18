# Zstyle Mobile App (Expo + Router + NativeWind)

Expo app using Expo Router, Gluestack UI primitives, Tailwind via NativeWind, and Zustand stores. TypeScript in strict mode with 2-space indentation.

## Overview
- Tech: Expo, Expo Router, NativeWind (Tailwind), Gluestack UI, Zustand, Jest (jest-expo).
- Structure:
  - `app/` Expo Router routes, layouts, tabs, modals, not-found
  - `components/` shared UI and hooks; `components/ui/` Gluestack primitives
  - `stores/` Zustand stores (e.g., `useAuthStore.ts`, `useUserStore.ts`)
  - `assets/` images, icons, fonts
  - Config: `tsconfig.json`, `tailwind.config.js`, `babel.config.js`, `metro.config.js`, `app.json`, `global.css`

## Requirements
- Node LTS (18+) and npm
- Expo account (for EAS)
- EAS CLI: `npm i -g eas-cli`
- iOS: macOS + Xcode (for Simulator) and Apple Developer account (for TestFlight)
- Android (optional for dev): Android Studio + SDK

## Setup
- Install dependencies: `npm install`

## Run
- Start dev server: `npm start`
- iOS Simulator: `npm run ios`
- Android Emulator: `npm run android`
- Web: `npm run web`

## Test
- Run tests (watch mode): `npm test`
- Notes: Uses `jest-expo` and `react-test-renderer`. Co-locate tests as `*.test.ts(x)` or under `__tests__/`.

## Deploy to TestFlight (iOS via EAS) - Will setup CI/CD to testflight + disable android
EAS provides a single-command path once configured.

1) One-time setup
- Login to EAS: `eas login`
- Initialize project (if not linked): `eas init`
- Ensure `app.json` includes:
  - `expo.ios.bundleIdentifier`
  - `expo.version` and `expo.ios.buildNumber` (bump for each release)
- Recommended: run `eas submit:configure` to set up App Store Connect API key (optional; CLI can also prompt during submit).

2) Build and submit (single command)
- Build and auto-submit latest build to TestFlight:
  - `eas build --platform ios --profile production --auto-submit`

Alternative (two-step)
- Build first: `eas build -p ios --profile production`
- Submit latest build: `eas submit -p ios --latest`

Tips
- Use a preview profile if defined: `--profile preview` for internal testing.
- First submission may prompt for Apple login or API key.
- Update `expo.version` and `expo.ios.buildNumber` in `app.json` before each release.
- Track builds and submission status in the EAS dashboard or App Store Connect.

Build (Web)
- Export static site to `dist/`: `npm run build`

## Troubleshooting
- Xcode Simulator issues: open Xcode once, accept licenses, ensure a Simulator is installed.
- Metro cache after Tailwind/Babel changes: `npm start -c`.
- EAS credentials: `eas credentials` to inspect/manage Apple certs and provisioning profiles.
