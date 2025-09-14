import React from "react"
import { View, StyleSheet } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export const Screen3: React.FC = function Screen3() {
  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen 3</Text>
        <Text style={styles.subtitle}>
          This is a placeholder for Screen 3. Add your content here.
        </Text>
        <Text>
          Jimmy you are to do this without AI.
          AI is only allowed to be in plan mode to help with choosing the correct components.
          All code will be written by you. 
          This is your dream now honor it.
        </Text>
        <Text>Chat Page</Text>
        <Text>Must have: </Text>
        <Text>1. place at top for agent and name at the top with a context button</Text>
        <Text>2. input and keyboard with send button</Text>
        <Text>3. Voice button to talk and see transcript</Text>
        <Text>4. Chat like text never deletes scroll till certain point for re query</Text>
        <Text>5. When voice calls happen, cron jobs, edits things the agent does, the logs go here</Text>
        <Text> ex. PhoneCall - Morning Wake Up - Snoozed 2x & Went Straight To TikTok</Text>

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
