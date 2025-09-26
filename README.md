# Zstyle Mobile App (Expo + Router + NativeWind)

Expo app using Expo Router, Gluestack UI primitives, Tailwind via NativeWind, Zustand stores, and Supabase (auth + db). TypeScript in strict mode with 2-space indentation.

## Overview
- Tech: Expo, Expo Router, NativeWind (Tailwind), Gluestack UI, Zustand, Supabase (auth + database), Jest (jest-expo).
- Structure:
  - `app/` Expo Router routes, layouts, tabs, modals, not-found
  - `components/` shared UI and hooks; `components/ui/` Gluestack primitives
  - `stores/` Zustand stores (e.g., `useAuthStore.ts`, `useUserStore.ts`). See `stores/README.md`.
  - `lib/` app integrations and services: `supabase.ts`, `database.ts` types, `users.ts` profile service. See `lib/README.md`.
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
 - Create a Supabase project and set environment variables (Expo public env):
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_KEY` (Anon key)
 - Create the profiles table (example schema) and enable RLS:
   - Table: `public.profiles(id uuid primary key references auth.users(id), created_at timestamptz default now(), premium_user boolean default false, goals json default '{"goals": []}', hired_agents json default '{"hired_agents": []}', integrations json default '{"integrations": []}')`
   - Enable RLS: `alter table public.profiles enable row level security;`
   - Policy (select own row): `create policy "Allow select own profile" on public.profiles for select using (auth.uid() = id);`
 - Optionally add insert/update policies for future writes.

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

## Data Flow (Supabase + Zustand)
- Auth
  - `providers/AuthProvider.tsx` initializes Supabase auth session and listens to auth state.
  - Auth `user` and `session` live in `stores/useAuthStore.ts`.
- Profile (public.profiles)
  - On login, `AuthProvider` triggers `useUserStore.fetchMe(user.id)` to load the profile row.
  - `useUserStore.ts` caches the row (`ProfileRow`) and tracks `status`/`error`.
  - `app/(tabs)/(profile)/index.tsx` renders the raw JSON via `JSON.stringify(profile, null, 2)`.
- Services and Types
  - `lib/users.ts` reads from Supabase with `.maybeSingle()` and returns `ProfileRow | null`.
  - `lib/database.ts` mirrors DB rows and JSON shapes 1:1 to keep raw output predictable.

## Adding Columns To profiles
1) Write SQL to alter the table (via Supabase SQL editor or migrations).
2) Ensure RLS policies support your read/write needs.
3) Update `lib/database.ts` to include the new columns with correct types (including JSON shapes).
4) If you filter columns in services, include the new fields; otherwise `select('*')` will return them automatically.
5) Update stores/UI if you need to render or transform the new fields.
6) Add/adjust tests for services/stores as needed.


## Troubleshooting
- Xcode Simulator issues: open Xcode once, accept licenses, ensure a Simulator is installed.
- Metro cache after Tailwind/Babel changes: `npm start -c`.
- EAS credentials: `eas credentials` to inspect/manage Apple certs and provisioning profiles.
