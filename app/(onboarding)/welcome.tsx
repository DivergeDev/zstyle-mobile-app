import React from "react"
import { SafeAreaView } from "@/components/ui/safe-area-view"
import { Text } from "@/components/ui/text"
import { ButtonGroup, Button, ButtonText } from "@/components/ui/button"
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"
import { router } from "expo-router"
import { Center } from "@/components/ui/center"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/stores/useAuthStore"

export default function Welcome() {
  const [agreed, setAgreed] = React.useState(false)
  const setOnboardingDone = useAuthStore((s) => s.setOnboardingDone)

  const handleContinue = () => {
    setOnboardingDone(true)
    router.replace('/(tabs)')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center className="flex-1 px-6">
        <Card className="w-full max-w-[600px]">
          <VStack space="lg">
            <VStack space="xs">
              <Heading className="text-2xl">Welcome</Heading>
              <Text className="text-typography-500">
                A minimal starter to get you set up.
              </Text>
            </VStack>

            <Text className="text-primary-700">
              Soon: a quick guided setup for integrations and agents.
            </Text>

            <Checkbox
              isChecked={agreed}
              onChange={(checked: boolean) => setAgreed(checked)}
              className="mt-2"
              value="tos"
            >
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel className="text-typography-600">
                I agree to the Terms of Service and Privacy Policy
              </CheckboxLabel>
            </Checkbox>

            <ButtonGroup isDisabled={!agreed}>
              <Button onPress={handleContinue}>
                <ButtonText>Get Started</ButtonText>
              </Button>
            </ButtonGroup>
          </VStack>
        </Card>
      </Center>
    </SafeAreaView>
  )
}

