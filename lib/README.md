Lib Folder Documentation

- Purpose
  - Centralizes app integrations and domain-level helpers used across the app.
  - Key modules: `supabase.ts` (client + secure session storage), `database.ts` (typed DB rows), `users.ts` (profiles read service).

- supabase.ts
  - Creates a single Supabase client using `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY`.
  - Uses a LargeSecureStore strategy for Expo: values are AES-CTR encrypted and stored in AsyncStorage; the per-key encryption secret is saved in SecureStore.
    - SecureStore has a ~2048 byte limit; this approach enables persisted sessions without truncation.
  - Auth settings: `persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: false` (mobile).
  - Import path: `import { supabase } from '@/lib/supabase'`.

- database.ts
  - Houses TypeScript types that mirror the database rows exactly (snake_case), so JSON printed in the UI appears as returned by Supabase.
  - Profiles table types (public.profiles):
    - `ProfileRow` matches your schema: `id`, `created_at`, `premium_user`, and three JSON columns.
    - JSON columns are typed to reflect their internal shapes:
      - `goals: { goals: unknown[] } | null`
      - `hired_agents: { hired_agents: unknown[] } | null`
      - `integrations: { integrations: unknown[] } | null`
  - If you change the schema, update these types to keep compile-time safety and predictable JSON rendering.

- users.ts
  - Service boundary for reading profiles from Supabase.
  - Exposed functions:
    - `getById(userId: string): Promise<ProfileRow | null>`
    - `getMe(userId: string): Promise<ProfileRow | null>`
  - Uses `.maybeSingle()` to return `null` when a row is not found (avoids PostgREST “single JSON object” errors).
  - Throws on Supabase errors so callers can set error state.

How To Add Columns To public.profiles (Example-Driven)

- Example 1: Add a scalar column `display_name text` (nullable)
  1) SQL (in Supabase SQL editor or a migration):
     - `alter table public.profiles add column display_name text null;`
  2) RLS policy: select/update will continue to work if your policy is `auth.uid() = id` over all columns. No change required unless you lock columns individually.
  3) Types: add `display_name: string | null` to `ProfileRow` in `lib/database.ts`.
  4) Service: no change required for reads that select `*`. For writes, include the new field in insert/update payloads.
  5) UI: you can render the raw JSON and see the new field; normalize or format in components if needed.

- Example 2: Add a JSON column `preferences jsonb` with default `{}`
  1) SQL:
     - `alter table public.profiles add column preferences jsonb not null default '{}'::jsonb;`
  2) Types: add `preferences: Record<string, unknown>` (or a stricter interface) to `ProfileRow`.
  3) Service: no change for reads using `*`. For writes, send objects; Supabase handles JSON serialization.
  4) RLS: existing row-level predicate `auth.uid() = id` is sufficient.

Checklist When You Change Schema

- Schema: write SQL migration (or run in SQL editor) and verify results.
- Policies: confirm RLS is enabled and policies allow your use cases (select, insert, update).
- Types: update `lib/database.ts` to match the new columns (including JSON shapes).
- Services: ensure selectors (`select('*')` vs specific columns) include new fields if you filter.
- Stores/UI: render or transform new fields as needed.
- Tests: add/adjust tests for services/stores that read those fields.

Troubleshooting

- Seeing `null` instead of data? Likely RLS is blocking select; add a policy `using (auth.uid() = id)`.
- Seeing “Cannot coerce the result to a single JSON object”? Use `.maybeSingle()` for queries that may return zero rows.
- Wrong project? Verify `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY` match the Supabase project containing your data.

