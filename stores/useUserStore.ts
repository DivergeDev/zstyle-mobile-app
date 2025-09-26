import { create } from 'zustand';
import type { ProfileRow } from '@/lib/database';
import * as usersService from '@/lib/users';

type Status = 'idle' | 'loading' | 'success' | 'error';

type UserStoreState = {
  profile: ProfileRow | null;
  status: Status;
  error: string | null;
  fetchMe: (userId: string) => Promise<void>;
  reset: () => void;
};

export const useUserStore = create<UserStoreState>((set, get) => ({
  profile: null,
  status: 'idle',
  error: null,
  fetchMe: async (userId: string) => {
    if (!userId) return;
    set({ status: 'loading', error: null });
    try {
      const data = await usersService.getMe(userId);
      set({ profile: data ?? null, status: 'success', error: null });
    } catch (e: any) {
      set({ status: 'error', error: e?.message ?? 'Failed to load profile' });
    }
  },
  reset: () => set({ profile: null, status: 'idle', error: null }),
}));
