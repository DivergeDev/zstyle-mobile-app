import React from "react"
import { View, StyleSheet } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export const Screen2: React.FC = function Screen2() {
  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen 2</Text>
        <Text style={styles.subtitle}>
          This is a placeholder for Screen 2. Add your content here.
        </Text>
        <Text>Buy Agents Choose sub agent to talk to this is the team of smaller sub agents</Text>
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
  },
})
