import React from "react"
import { View, StyleSheet } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"

export const Screen4: React.FC = function Screen4() {
  const { logout } = useAuth()

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen 4</Text>
        <Text style={styles.subtitle}>
          This is a placeholder for Screen 4. Add your content here.
        </Text>
        <Text>settings, customize lifestyle times, agents subscriptions, integrations, etc</Text>
        <Button
          style={styles.logoutButton}
          onPress={logout}
          text="Logout"
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  logoutButton: {
    marginTop: 16,
  },
})
