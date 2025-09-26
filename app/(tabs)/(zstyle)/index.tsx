import React, { useMemo, useRef, useState } from "react"
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Center } from "@/components/ui/center"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import { Card } from "@/components/ui/card"
import { HStack } from "@/components/ui/hstack"
import { Badge, BadgeText } from "@/components/ui/badge"
import { useConnectionStore } from "@/stores/useConnectionStore"
import { Input, InputField } from "@/components/ui/input"
import { useChatStore } from "@/stores/useChatStore"
import { ScrollView } from "@/components/ui/scroll-view"

export default function ZstyleScreen() {
  const { status, connect, disconnect, send, isAudio, setAudio } = useConnectionStore()
  const messages = useChatStore((s) => s.messages)
  const [text, setText] = useState("")
  const canSend = status === 'connected' && text.trim().length > 0

  return (
    <Center className="flex-1 px-6">
      <VStack space="lg" className="w-full max-w-[800px]">
        <Heading className="text-2xl text-center">Zstyle</Heading>
        <HStack>
          <Badge>
            <BadgeText>{status}</BadgeText>
          </Badge>
          {isAudio ? (
            <Badge className="ml-2 bg-green-600"><BadgeText>Voice</BadgeText></Badge>
          ) : null}
        </HStack>
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
              {/* Transcript (scrollable) */}
              <ScrollableTranscript messages={messages} />

              {/* Compose */}
              <HStack className="mt-3 items-center gap-2">
                <Input className="flex-1">
                  <InputField
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message"
                    editable={status === 'connected'}
                  />
                </Input>
                <Button
                  disabled={!canSend}
                  onPress={() => {
                    const msg = text.trim();
                    if (!msg) return;
                    // Optimistically add to transcript, then send
                    useChatStore.getState().addMessage({ role: 'user', mime_type: 'text/plain', data: msg });
                    send({ mime_type: 'text/plain', data: msg, role: 'user' });
                    setText("");
                  }}
                >
                  <ButtonText>Send</ButtonText>
                </Button>
              </HStack>

              {/* Connection Controls */}
              <HStack className="mt-3 gap-2">
                {status !== 'connected' ? (
                  <Button onPress={() => connect()} disabled={status === 'connecting'}>
                    <ButtonText>{status === 'connecting' ? 'Connecting…' : 'Connect'}</ButtonText>
                  </Button>
                ) : (
                  <Button onPress={() => disconnect()}>
                    <ButtonText>Disconnect</ButtonText>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onPress={() => setAudio(!isAudio)}
                  disabled={status === 'connecting'}
                >
                  <ButtonText>{isAudio ? 'Stop Voice' : 'Enable Voice'}</ButtonText>
                </Button>
              </HStack>
            </Card>
          </VStack>
        </Card>
      </VStack>
    </Center>
  )
}

function ScrollableTranscript({ messages }: { messages: ReturnType<typeof useChatStore>['messages'] }) {
  const ref = useRef<any>(null)
  return (
    <ScrollView
      ref={ref}
      className="h-[300px]"
      onContentSizeChange={() => ref.current?.scrollToEnd({ animated: true })}
    >
      <VStack className="gap-2 py-2">
        {messages.map((m) => (
          <Text key={m.id} className={m.role === 'user' ? 'self-end bg-primary-600 text-white rounded px-3 py-2' : 'self-start bg-background-100 rounded px-3 py-2'}>
            {m.data}
          </Text>
        ))}
      </VStack>
    </ScrollView>
  )
}
