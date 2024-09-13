import React, { useEffect, useState, useContext } from 'react';
import { Platform, Text, View, StyleSheet, ToastAndroid } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { VibrationContext } from '../contexto'; // Adjust the path as needed

const API_KEY = '9125d03f7bcdefb949b35cc42547abc5'; // Replace with your actual API key

export default function HomeScreen() {
  const { triggerVibration } = useContext(VibrationContext);
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Fetch the current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Fetch weather data using OpenWeatherMap API
      if (location) {
        try {
          const { latitude, longitude } = location.coords;
          const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              lat: latitude,
              lon: longitude,
              appid: API_KEY,
              units: 'metric', // 'imperial' for Fahrenheit
            },
          });
          setTemperature(response.data.main.temp);
        } catch (error) {
          ToastAndroid.show('Error fetching weather data:'+ error,ToastAndroid.SHORT);
          triggerVibration([500, 500, 500]); // Vibrate if there's an error
        }
      }
    })();

    // Update date and time every second
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const formatDate = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      <Text>Hola, bienvenidos HOLA</Text>
      <Text>Podéis usar las tabs debajo para navegar por la aplicación</Text>
      <Text>Fecha y Hora: {formatDate(date)}</Text>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <>
          {location ? (
            <>
          <Text>Ubicación actual:</Text>
          <Text>Latitud: { JSON.stringify(location.coords.latitude) }</Text>
          <Text>Longitud: { JSON.stringify(location.coords.longitude)}</Text>
          </>
          ) : (<Text>'Cargando ubicación...'</Text>) } 
          {temperature !== null ? (
            <Text>Temperatura actual: {temperature}°C</Text>
          ) : (
            <Text>Cargando temperatura...</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
