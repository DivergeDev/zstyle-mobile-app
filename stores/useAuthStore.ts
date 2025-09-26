import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';

type AuthState = {
  session: Session | null;
  user: User | null;
  onboardingDone: boolean;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setOnboardingDone: (done: boolean) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  onboardingDone: false,
  isLoading: true,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setOnboardingDone: (done) => set({ onboardingDone: done }),
  setLoading: (loading) => set({ isLoading: loading }),
  reset: () => set({ session: null, user: null, onboardingDone: false }),
}));
