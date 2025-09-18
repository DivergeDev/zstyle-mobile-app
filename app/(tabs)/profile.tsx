import React from "react"
import { View, StyleSheet } from "react-native"

import { Button, ButtonText } from "@/components/ui/button"
import { SafeAreaView } from "@/components/ui/safe-area-view"
import { Text } from "@/components/ui/text"
import { useAuthStore } from "@/stores/useAuthStore"
import { Center } from "@/components/ui/center"
import { Link } from "expo-router"

export default function ProfileScreen() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <Center className="p-4 justify-center flex-1">
      <View>
        <Text className="text-center">Profile</Text>
        <Text>
          This is a placeholder for Profile. Add your content here.
        </Text>
        <Text>settings, customize lifestyle times, agents subscriptions, integrations, etc</Text>
        <Link href="/">
          <Button>
            <ButtonText>Log Out</ButtonText>
          </Button>
        </Link>  
      </View>
    </Center>
  )
}