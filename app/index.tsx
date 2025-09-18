import React from 'react';
import { useThemeStore } from '@/stores/useThemeStore';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Link, router } from 'expo-router';

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
    <>
    <FormControl className="p-4 border border-outline-200 flex-1 justify-center">
      <VStack className="gap-4">
        <Heading className="text-typography-900">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input className="center">
            <InputField type={showPassword ? 'text' : 'password'} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <Link href="/welcome" asChild>
          <Button className="ml-auto">
            <ButtonText>Login</ButtonText>
          </Button>
        </Link>
        
      </VStack>
    </FormControl>
    <Fab onPress={toggleTheme} className="m-6" size="lg">
        <FabIcon as={colorMode === 'dark' ? SunIcon : MoonIcon} />
    </Fab>
    </>
  );
}


