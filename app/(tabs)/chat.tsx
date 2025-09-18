import React from "react"
import { Center } from "@/components/ui/center"
import { VStack } from "@/components/ui/vstack"
import { HStack } from "@/components/ui/hstack"
import { Heading } from "@/components/ui/heading"
import { Divider } from "@/components/ui/divider"
import { Text } from "@/components/ui/text"
import { Card } from "@/components/ui/card"
import { Box } from "@/components/ui/box"
import { Input, InputField } from "@/components/ui/input"
import { Button, ButtonText } from "@/components/ui/button"

export default function ChatScreen() {
  const [message, setMessage] = React.useState("")

  return (
    <Center className="flex-1 px-6">
      <VStack space="lg" className="w-full max-w-[900px]">
        <Heading className="text-2xl">Chat</Heading>
        <Divider />

        <Card>
          <VStack space="md">
            <Box className="h-[340px] rounded-md border border-outline-200 bg-background-50 p-4">
              <Text className="text-typography-500">No messages yet.</Text>
            </Box>

            <HStack space="md" className="items-center">
              <Input className="flex-1">
                <InputField
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type a message..."
                  returnKeyType="send"
                />
              </Input>
              <Button onPress={() => setMessage("")}> 
                <ButtonText>Send</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </Center>
  )
}
