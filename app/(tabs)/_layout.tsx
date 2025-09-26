import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -1 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="(home)" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <TabBarIcon name="star-o" color={color} />,
      }} />
      <Tabs.Screen name="(circles)" options={{
        title: 'Circles',
        tabBarIcon: ({ color }) => <TabBarIcon name="star-o" color={color} />,
      }} />
      {/* In upgraded UI this will be a FAB (ex. Cosmo app by codesignal) */}
      <Tabs.Screen name="(zstyle)" options={{
        title: 'ZStyle',
        tabBarIcon: ({ color }) => <TabBarIcon name="star-o" color={color} />,
      }} />
      <Tabs.Screen name="(explore)" options={{
        title: 'Explore',
        tabBarIcon: ({ color }) => <TabBarIcon name="star-o" color={color} />,
      }} />
      <Tabs.Screen name="(profile)" options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <TabBarIcon name="star-o" color={color} />,
      }} />
    </Tabs>
  );
}
