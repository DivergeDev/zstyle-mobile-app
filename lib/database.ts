// Types mapping to public.profiles table
// Keep DB field names to reflect raw JSON returned by Supabase
export type ProfileGoalsJson = { goals: unknown[] };
export type ProfileHiredAgentsJson = { hired_agents: unknown[] };
export type ProfileIntegrationsJson = { integrations: unknown[] };

export type ProfileRow = {
  id: string;
  created_at: string; // ISO timestamp from Supabase
  premium_user: boolean | null;
  goals: ProfileGoalsJson | null;
  hired_agents: ProfileHiredAgentsJson | null;
  integrations: ProfileIntegrationsJson | null;
};
