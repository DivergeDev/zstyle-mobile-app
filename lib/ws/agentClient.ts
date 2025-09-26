// For handling the websocket connection for the agent.
// Builds the URL using an environment-provided base and options.

export type BuildUrlOptions = {
  sessionId: string;
  isAudio?: boolean;
  baseUrl?: string;
};

export const createSessionId = (): string =>
  Math.random().toString(36).slice(2);

export const getAgentBaseUrl = (): string => {
  const base = process.env.EXPO_PUBLIC_AGENT_WS_URL || '';
  return base.replace(/\/$/, '');
};

export const buildWsUrl = (opts: BuildUrlOptions): string => {
  const base = (opts.baseUrl ?? getAgentBaseUrl()).replace(/\/$/, '');
  if (!base) throw new Error('Missing EXPO_PUBLIC_AGENT_WS_URL');
  const isAudio = opts.isAudio ? 'true' : 'false';
  return `${base}/ws/${opts.sessionId}?is_audio=${isAudio}`;
};

