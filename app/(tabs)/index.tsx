import EditScreenInfo from '@/components/EditScreenInfo';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';

export default function HomeTab() {
  return (
    <Center className="flex-1 px-6">
      <VStack space="lg" className="w-full max-w-[800px]">
        <Heading className="text-2xl">Home</Heading>
        <Divider />
        <Card>
          <VStack space="md">
            <Text className="text-typography-600">
              Example gluestack-ui components in action:
            </Text>
            <EditScreenInfo path="app/(tabs)/index.tsx" />
          </VStack>
        </Card>
      </VStack>
    </Center>
  );
}
