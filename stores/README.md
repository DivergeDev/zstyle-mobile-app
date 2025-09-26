Stores Folder Documentation (Zustand)

- Philosophy
  - Keep stores small and focused by domain (auth vs user profile vs theme).
  - Store responsibilities: client-side cache, loading/error states, and actions that orchestrate API calls.
  - Supabase remains the source of truth; stores mirror the data for UI use and stateful UX.

- Stores In This Repo
  - `useAuthStore.ts`
    - Holds `session`, `user` (from Supabase auth), `onboardingDone`, `isLoading`.
    - Does not contain domain data (like profile fields).
  - `useUserStore.ts`
    - Holds `profile` (a `ProfileRow | null`), `status` (`idle|loading|success|error`), and `error`.
    - Actions:
      - `fetchMe(userId: string)`: loads the current user’s profile from Supabase via `lib/users.ts`.
      - `reset()`: clears state on logout.
    - Read-only for now; add update/create/delete as needed.

- Wiring To Auth
  - `providers/AuthProvider.tsx` subscribes to auth changes and:
    - On login, calls `useUserStore.getState().fetchMe(user.id)` to load the profile.
    - On logout, calls `useUserStore.getState().reset()`.

- Usage Pattern In Screens
  - Select only the pieces a screen needs to avoid re-renders:
    - `const profile = useUserStore((s) => s.profile)`
    - `const status = useUserStore((s) => s.status)`
    - `const error = useUserStore((s) => s.error)`
  - Render loading, error, or data based on `status`.

- Adding New Store Fields or Actions
  - Extend the store’s state and actions in-place, keeping types updated.
  - For write actions, prefer optimistic updates with error reverts:
    - Save prior state.
    - Apply optimistic change.
    - Call the service.
    - On error, revert and set `error`.

- Testing Guidance
  - Mock service calls (e.g., `lib/users.ts`) and assert state transitions:
    - `idle → loading → success` with expected data.
    - `idle → loading → error` with `error` set.
    - `reset()` clears `profile`, `status`, and `error`.

- Anti-Patterns
  - Don’t put Supabase client calls directly in UI components; call store actions or services.
  - Don’t duplicate auth `user` in the profile store; keep separation of concerns.
  - Don’t persist sensitive data from stores; prefer short-lived in-memory state.

