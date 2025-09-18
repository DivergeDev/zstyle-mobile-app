import React from 'react';
import { useThemeStore } from '@/stores/useThemeStore';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Card } from '@/components/ui/card';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Link } from 'expo-router';

export default function Home() {
  const colorMode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center className="flex-1 px-6">
        <Card className="w-full max-w-[500px]">
          <VStack space="lg">
            <VStack space="xs" className="items-start">
              <Heading className="text-2xl">Welcome back</Heading>
              <Text className="text-typography-500">Sign in to continue</Text>
            </VStack>

            <VStack space="xs">
              <Text className="text-typography-600">Email</Text>
              <Input>
                <InputField
                  type="text"
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="username"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text className="text-typography-600">Password</Text>
              <Input>
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  textContentType="password"
                  secureTextEntry={!showPassword}
                />
                <InputSlot className="pr-3" onPress={handleState} accessibilityRole="button">
                  <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
                </InputSlot>
              </Input>
            </VStack>

            <Link href="/welcome" asChild>
              <Button>
                <ButtonText>Login</ButtonText>
              </Button>
            </Link>
          </VStack>
        </Card>
      </Center>

      <Fab onPress={toggleTheme} className="m-6" size="lg">
        <FabIcon as={colorMode === 'dark' ? SunIcon : MoonIcon} />
      </Fab>
    </SafeAreaView>
  );
}

