import React from "react"
import { View, StyleSheet } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export const Screen1: React.FC = function Screen1() {
  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen 1</Text>
        <Text style={styles.subtitle}>
          This is a placeholder for Screen 1. Add your content here.
        </Text>
        <Text>Life DashBoard - switch between day and total view</Text>
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
