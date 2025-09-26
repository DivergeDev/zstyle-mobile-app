import { create } from 'zustand'
import { buildWsUrl, createSessionId } from '@/lib/ws/agentClient'
import { useChatStore } from '@/stores/useChatStore'

type Status = 'disconnected' | 'connecting' | 'connected' | 'error'

type ConnectionStore = {
  status: Status;
  lastError: string | null;
  socket: WebSocket | null;
  sessionId: string | null;
  isAudio: boolean;
  connect: (opts?: { sessionId?: string; isAudio?: boolean }) => void;
  disconnect: () => void;
  send: (message: unknown) => void;
  setAudio: (enabled: boolean) => void;
};

export const useConnectionStore = create<ConnectionStore>((set, get) => ({
  status: 'disconnected',
  lastError: null,
  socket: null,
  sessionId: null,
  isAudio: false,

  connect: (opts) => {
    const state = get();
    // SSR/Node guard and duplicate connecting guard
    if (typeof window === 'undefined') return;
    if (
      state.status === 'connecting' ||
      (state.socket && (state.socket.readyState === WebSocket.CONNECTING || state.status === 'connected'))
    ) {
      return;
    }

    const sessionId = opts?.sessionId || state.sessionId || createSessionId();
    const isAudio = opts?.isAudio ?? state.isAudio;

    let url: string;
    try {
      url = buildWsUrl({ sessionId, isAudio });
    } catch (e: any) {
      set({ status: 'error', lastError: e?.message || 'Invalid agent URL' });
      return;
    }

    set({ status: 'connecting', lastError: null, sessionId, isAudio });

    const ws = new WebSocket(url);
    ws.onopen = () => {
      set({ status: 'connected', socket: ws, lastError: null });
    };
    ws.onmessage = (ev: any) => {
      try {
        const payload = JSON.parse(String(ev?.data));
        const role = (payload?.role as 'user' | 'model') ?? 'model';
        const mime = (payload?.mime_type as 'text/plain' | 'audio/pcm') ?? 'text/plain';
        const data = String(payload?.data ?? '');
        useChatStore.getState().addMessage({ role, mime_type: mime, data });
      } catch {
        // ignore non-JSON payloads
      }
    };
    ws.onerror = (ev: Event) => {
      set({ status: 'error', lastError: 'Connection error' });
    };
    ws.onclose = () => {
      // Reset socket but preserve sessionId for potential reconnects
      set({ socket: null, status: 'disconnected' });
    };

    // Save the socket immediately to allow send/close during connecting
    set({ socket: ws });
  },

  disconnect: () => {
    const { socket } = get();
    try {
      socket?.close();
    } finally {
      set({ socket: null, status: 'disconnected' });
    }
  },

  send: (message: unknown) => {
    const { socket } = get();
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const payload = typeof message === 'string' ? message : JSON.stringify(message);
    socket.send(payload);
  },

  setAudio: (enabled: boolean) => {
    const { status, sessionId } = get();
    set({ isAudio: enabled });
    // Reconnect with new mode if currently connected
    if (status === 'connected') {
      get().disconnect();
      get().connect({ sessionId: sessionId ?? createSessionId(), isAudio: enabled });
    }
  },
}));
