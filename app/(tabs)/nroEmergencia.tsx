import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, TextInput,Text,Button} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default function TabTwoScreen() {

  const [nroEmergencia,setNroEmergencia] = useState('')
  useEffect(()=>{
    const nro=localStorage.getItem("nro")
    if (nro){
    setNroEmergencia(nro)}


  },[])
  const actualizarNroEmergencia = () => {
    localStorage.setItem("nro",nroEmergencia)
  }
  return (
    <View style={styles.container}>
      <Text>Numero de emergencia</Text>
      <TextInput
        keyboardType='nu  meric'
        style={styles.input}
        placeholder="911"
        placeholderTextColor="#888"
        value={nroEmergencia}
        onChangeText={setNroEmergencia}
      />
      <Button
      title='actualizar'
      onPress={actualizarNroEmergencia}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // light background color
  },
  input: {
    height: 40,
    width: '80%', // adjust width as needed
    borderColor: '#888',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // white background
    color: '#333', // text color
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
