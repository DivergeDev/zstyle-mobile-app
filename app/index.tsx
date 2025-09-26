import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/useAuthStore';

export default function IndexGate() {
  const isLoading = useAuthStore((s) => s.isLoading);
  const session = useAuthStore((s) => s.session);
  const onboardingDone = useAuthStore((s) => s.onboardingDone);

  if (isLoading) return null;
  if (!session) return <Redirect href="/(auth)/sign-in" />;
  if (!onboardingDone) return <Redirect href="/(onboarding)/welcome" />;
  return <Redirect href="/(tabs)/(zstyle)" />;
}
