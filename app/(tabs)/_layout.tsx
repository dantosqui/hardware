import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

  
  
//quiero agradecer a la aplicacion default de react por dejarme usar sus tabs
  return ( 
    <Tabs
      screenOptions={{
        
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nroEmergencia"
        options={{
          title: 'Nro. Emergencia',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name='contactos'
      options={{
        title:'contactos',
        tabBarIcon: ({color}) => (
          <TabBarIcon name={'search'} color={color} />
        ),
      }}
      />
      
      
    </Tabs>
  );
}
