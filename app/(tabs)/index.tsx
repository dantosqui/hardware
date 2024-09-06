import { Image, StyleSheet, Platform,Text,View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View>
      <Text>hola ibenvenidos HOLA</Text>
      <Text>PODEIS USAR LAS TABS DEBAJO PARA NAVEGAR POR LA application</Text>
    </View>
  );
}
