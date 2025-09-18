import React from "react"
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAuthStore } from "@/stores/useAuthStore"
import { Center } from "@/components/ui/center"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import { Card } from "@/components/ui/card"
import { router } from "expo-router"

export default function ProfileScreen() {
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    router.replace('/')
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
      </VStack>
    </Center>
  )
}
