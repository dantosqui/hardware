import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Text, Button, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VibrationContext } from '../contexto'; // Adjust the path as needed

export default function TabTwoScreen() {
  const [nroEmergencia, setNroEmergencia] = useState('');
  const { triggerVibration } = useContext(VibrationContext); // Use context for vibration

  useEffect(() => {
    const fetchNumber = async () => {
      const nro = await AsyncStorage.getItem('nro');
      if (nro) {
        setNroEmergencia(nro);
      }
    };
    fetchNumber();
  }, []);

  const formatNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    const match = cleanNumber.match(/^(\d{2})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return `${match[1]}-${match[2]}${match[3] ? '-' + match[3] : ''}`;
    }
    return number;
  };

  const handleChangeText = (text) => {
    const formattedText = formatNumber(text);
    setNroEmergencia(formattedText);
  };

  const validarNumero = (numero) => {
    const regex = /^\d{2}-\d{4}-\d{4}$/;
    return regex.test(numero);
  };

  const actualizarNroEmergencia = async () => {
    if (validarNumero(nroEmergencia)) {
      await AsyncStorage.setItem('nro', nroEmergencia);
      ToastAndroid.show('Número de emergencia actualizado', ToastAndroid.SHORT);
    } else {
      triggerVibration([500, 500, 500]); // Vibrate if the number is invalid

    }
  };

  return (
    <View style={styles.container}>
      <Text>Numero de emergencia</Text>
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        placeholder="xx-xxxx-xxxx"
        placeholderTextColor="#888"
        value={nroEmergencia}
        onChangeText={handleChangeText}
      />
      <Button
        title='Actualizar'
        onPress={actualizarNroEmergencia}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#888',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
  },
});
