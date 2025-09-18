import React from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function ExploreTab() {
  return (
    <Center className="flex-1">
      <Heading className="font-bold text-2xl">Explore</Heading>
      <Divider className="my-[30px] w-[80%]" />
      <Text className="p-4">Example below to use gluestack-ui components.</Text>
      <EditScreenInfo path="app/(tabs)/explore.tsx" />
      <Text>Screen 2</Text>
        <Text>
          This is a placeholder for Screen 2. Add your content here.
      </Text>
      <Text>Buy Agents Choose sub agent to talk to this is the team of smaller sub agents</Text>
    </Center>
  );
}