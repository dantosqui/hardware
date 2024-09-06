import React, { createContext, useState } from 'react';
import { Vibration,ToastAndroid } from 'react-native';

// Create a Context with default values
export const VibrationContext = createContext();

export function VibrationProvider({ children }) {
  // Function to trigger vibration
  const triggerVibration = () => {
    Vibration.vibrate([100, 200, 500]);
    ToastAndroid.show('Hubo un error. Verifica los datos', ToastAndroid.SHORT);
  };

  // Function to cancel vibration
  const cancelVibration = () => {
    Vibration.cancel();
  };

  return (
    <VibrationContext.Provider value={{ triggerVibration, cancelVibration }}>
      {children}
    </VibrationContext.Provider>
  );
}
