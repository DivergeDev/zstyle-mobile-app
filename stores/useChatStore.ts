import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'model';
  mime_type: 'text/plain' | 'audio/pcm';
  data: string; // text or base64 for audio
  createdAt: number;
};

type ChatStore = {
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'> & { id?: string; createdAt?: number }) => void;
  clear: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: msg.id ?? Math.random().toString(36).slice(2),
          createdAt: msg.createdAt ?? Date.now(),
          role: msg.role,
          mime_type: msg.mime_type,
          data: msg.data,
        },
      ],
    })),
  clear: () => set({ messages: [] }),
}));

