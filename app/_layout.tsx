import 'react-native-gesture-handler'
// must be at top - moves down if this space not here ????
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Stack screenOptions={{ headerShown: false }} />
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}