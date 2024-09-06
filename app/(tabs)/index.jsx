import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { VibrationContext } from '../contexto'; // Adjust the path as needed

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key

export default function HomeScreen() {
  const { triggerVibration } = useContext(VibrationContext);
  
  const [temperature, setTemperature] = useState(null);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request location permission (Android only)
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'dame acceso quiero saber donde estas.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermission();

    // Fetch location and weather data
    const fetchLocationAndWeather = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // Fetch weather data
          axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              lat: latitude,
              lon: longitude,
              appid: API_KEY,
              units: 'metric', // Use 'imperial' for Fahrenheit
            },
          })
          .then(response => {
            setTemperature(response.data.main.temp);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          triggerVibration([500, 500, 500]); // Vibrate if there's an error
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    fetchLocationAndWeather();

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
      {temperature !== null ? (
        <Text>Temperatura actual: {temperature}°C</Text>
      ) : (
        <Text>Cargando temperatura...</Text>
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
