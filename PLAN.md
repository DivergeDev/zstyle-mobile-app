Zstyle Agent Connection Plan

Purpose
- Track the incremental work to add a websocket agent connection with a simple chat UI (text + voice mode flag), a transcript, auto-connect at app open, and exponential backoff retry.

Phases

1) Minimal UI + Transcript + Fix Type Errors (current)
- Read
  - app/(tabs)/(zstyle)/index.tsx
  - components/ui primitives (Input, Button, Text, VStack, HStack, Card)
  - stores/useConnectionStore.ts (ensure correct action types)
- Add
  - stores/useChatStore.ts: Minimal transcript store with addMessage, clear
  - Update app/(tabs)/(zstyle)/index.tsx: Render transcript, add text input + send button, connect/disconnect button, show status; wire to stores
- Adjust
  - stores/useConnectionStore.ts: Ensure actions are functions (not strings), add safe typings, remove unused/invalid fields; optional SSR guard

2) Troubleshoot Connection + Auto-Connect on App Open
- Read
  - app/_layout.tsx for provider composition
- Add
  - providers/ConnectionProvider.tsx: useEffect to call connect() on mount; cleanup disconnect on unmount
  - Wrap ConnectionProvider into app/_layout.tsx under existing providers
- Adjust
  - stores/useConnectionStore.ts: Improve lifecycle handlers, forward onmessage to useChatStore

3) Exponential Backoff (3 Attempts)
- Add
  - In stores/useConnectionStore.ts: attempt counter, base delay, timer; guard duplicate connects during CONNECTING; exponential backoff (e.g., 500ms, 1s, 2s), final status: 'error' with lastError
- UI
  - Surfacing lastError in Zstyle screen when status === 'error' and provide Retry (connect())

Notes & Decisions
- Voice mode (isAudio) will toggle URL negotiation only; native PCM capture is out-of-scope for Phase 1–3 and will be planned later.
- Web-only ADK static example remains in lib/static for reference and future web route usage.

Deliverables Per Phase
- Phase 1: New chat store, updated Zstyle screen with transcript & input, compile-clean connection store.
- Phase 2: Auto-connect provider; message forwarding; status reflects live connection.
- Phase 3: Backoff retry implemented; error surfaced after 3 failed attempts.

