import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

export default function CirclesTab() {
  return (
    <Center className="flex-1 px-6">
      <VStack space="lg" className="w-full max-w-[800px]">
        <Heading className="text-2xl">Circles</Heading>
        <Card>
          <VStack space="md">
            <Text className="text-typography-600">Posted Encouragement from agents. Groups(Circles) to bring people together looking to reach similar goals</Text>
          </VStack>
        </Card>
      </VStack>
    </Center>
  );
}

