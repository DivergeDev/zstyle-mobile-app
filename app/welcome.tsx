import React from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "@/components/ui/safe-area-view"
import { Text } from "@/components/ui/text"
import { 
  ButtonGroup,
  Button,
  ButtonText,
} from "@/components/ui/button"
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"
import { router } from "expo-router"


export default function Welcome() {
  // Soon to change to zustand user state to be able to get all starter configurations from user
  const [agreed, setAgreed] = React.useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Welcome to the app! This is a bare bones welcome screen.
        </Text>
        <Text style={styles.instruction}>
          This will soon be a required step by step to setup the app for the first
          time and get started
          - each individual integration and agent has a walkthrough steps
        </Text>
        <Text style={styles.instruction}></Text>
        
        <Checkbox
          isChecked={agreed}
          onChange={(checked: boolean) => setAgreed(checked)}
          className="mb-4 mt-4"
          value="tos"
        >
          <CheckboxIndicator className="mr-2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel className="text-typography-500">
            I agree to the Terms of Service and Privacy Policy
          </CheckboxLabel>
        </Checkbox>
      

        <ButtonGroup isDisabled={!agreed}>
          <Button onPress={() => router.replace('/(tabs)')}>
            <ButtonText>Get Started</ButtonText>
          </Button>
        </ButtonGroup>
      </View>
    </SafeAreaView>
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
