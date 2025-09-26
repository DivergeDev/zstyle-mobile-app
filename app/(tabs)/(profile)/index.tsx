import React, { useEffect } from "react"
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Center } from "@/components/ui/center"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import { Card } from "@/components/ui/card"
import { router } from "expo-router"
import { supabase } from "@/lib/supabase"
import { ScrollView } from "@/components/ui/scroll-view"
import { useAuthStore } from "@/stores/useAuthStore"
import { useUserStore } from "@/stores/useUserStore"

export default function ProfileScreen() {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const profile = useUserStore((s) => s.profile)
  const status = useUserStore((s) => s.status)
  const error = useUserStore((s) => s.error)
  const fetchMe = useUserStore((s) => s.fetchMe)

  useEffect(() => {
    if (userId && status === 'idle' && !profile) {
      fetchMe(userId)
    }
  }, [userId, status, profile, fetchMe])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/(auth)/sign-in')
  }

  return (
    <Center className="flex-1 px-6">
      <VStack space="lg" className="w-full max-w-[800px]">
        <Heading className="text-2xl text-center">Profile</Heading>
        <Card>
          <VStack space="md">
            <Text className="text-typography-600">
              Settings, subscriptions, and integrations coming soon.
            </Text>
            <Button onPress={handleLogout}>
              <ButtonText>Log Out</ButtonText>
            </Button>
          </VStack>
        </Card>
        <Card>
          <VStack space="md" className="max-h-[360px]">
            <Heading size="sm">Raw Profile JSON</Heading>
            {/*<Text className="text-typography-500">Auth user id: {userId ?? '(none)'}</Text>*/}
            {status === 'loading' && (
              <Text className="text-typography-500">Loading…</Text>
            )}
            {status === 'error' && (
              <Text className="text-red-600">{error ?? 'Failed to load profile'}</Text>
            )}
            {status !== 'loading' && status !== 'error' && (
              <ScrollView className="max-h-[300px]">
                <Text className="font-mono text-xs">
                  {profile ? JSON.stringify(profile, null, 2) : 'No profile found for current user.'}
                </Text>
              </ScrollView>
            )}
          </VStack>
        </Card>
      </VStack>
    </Center>
  )
}
