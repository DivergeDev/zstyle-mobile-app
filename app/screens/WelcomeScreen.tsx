import React from "react"
import { View, StyleSheet } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAuth } from "@/context/AuthContext"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useHeader } from "@/utils/useHeader"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    theme: { colors },
  } = useAppTheme()
  const { logout } = useAuth()

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const handleContinue = () => {
    navigation.navigate("Demo", { screen: "Screen1" })
  }

  return (
    <Screen preset="fixed" contentContainerStyle={[$styles.flex1, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Welcome to the app! This is a bare bones welcome screen.
          </Text>
          <Text style={[styles.instruction, { color: colors.tint }]} onPress={handleContinue}>
            Tap to continue to the main app
          </Text>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    marginBottom: 24,
  },
  instruction: {
    fontSize: 16,
    color: "#4F46E5",
    textDecorationLine: "underline",
  },
})
