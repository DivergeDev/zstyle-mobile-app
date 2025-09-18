import React from "react"
import { View, StyleSheet } from "react-native"

import { SafeAreaView } from "@/components/ui/safe-area-view"
import { Text } from "@/components/ui/text"
import { Center } from "@/components/ui/center"

export default function ChatScreen() {
  return (
    <Center className="flex-1">
      <View>
        <Text>Chat</Text>
        <Text>
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
    </Center>
  )
}