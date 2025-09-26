import React from "react"
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Center } from "@/components/ui/center"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import { Card } from "@/components/ui/card"
import { router } from "expo-router"  

export default function ZstyleScreen() {
  

  return (
    <Center className="flex-1 px-6">
      <VStack space="lg" className="w-full max-w-[800px]">
        <Heading className="text-2xl text-center">Zstyle</Heading>
        <Card>
          <VStack space="md">
            <Text className="text-typography-600">
              Dashboards, Agent Teams, Chat/Talk with Zstyle agent, Chat with hired agents from explore page
            </Text>
          </VStack>
        </Card>
        <Card>
          <VStack space="md">
            <Card>
              <Text className="text-typography-500">
                Chats will appear here. Soon to be list.
              </Text>
              <Text>
                {/* Input Box with Send Button for chats using horizontal stack */}
                Input box and send button here.
              </Text>
              <Button>
                <ButtonText>Voice Chat with Agent</ButtonText>
              </Button>
            </Card>
          </VStack>
        </Card>
      </VStack>
    </Center>
  )
}

