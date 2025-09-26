// User/profile read helpers for public.profiles
// Keep focused on read paths only per current requirements
import { supabase } from '@/lib/supabase';
import type { ProfileRow } from '@/lib/database';

export async function getById(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select("premium_user, goals, hired_agents, integrations")
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    // Propagate error to caller; they will set error state
    throw error;
  }
  return data as ProfileRow | null;
}

export async function getMe(userId: string): Promise<ProfileRow | null> {
  return getById(userId);
}
