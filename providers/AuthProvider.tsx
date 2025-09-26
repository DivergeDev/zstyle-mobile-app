import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AppState } from 'react-native';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useAuthStore((s) => s.setSession);
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const authUser = useAuthStore((s) => s.user);

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [setSession, setUser, setLoading]);

  // Keep the profile store in sync with auth user
  useEffect(() => {
    const userId = authUser?.id;
    if (userId) {
      // Fetch the profile for the logged-in user
      useUserStore.getState().fetchMe(userId);
    } else {
      // Reset profile when signed out
      useUserStore.getState().reset();
    }
  }, [authUser?.id]);

  useEffect(() => {
    // Keep auth token fresh while app is active
    supabase.auth.startAutoRefresh();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
    return () => {
      sub.remove();
      supabase.auth.stopAutoRefresh();
    };
  }, []);

  return <>{children}</>;
}
