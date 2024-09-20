import { View } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from "react";
import { Text, Button, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import  QRCode  from 'react-native-qrcode-svg';

export default function About() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [dataBeenScanned, setDataBeenScanned] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>necesito permiso para la camara quiero ver tu cara</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    setDataBeenScanned(true);
    setCameraOpen(false);
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  return (
    <View style={styles.container}>
      <QRCode
      value="HECHO POR DANTE GITHUB.COM/DANTOSQUI gracias especiales a: topo y zarek y tiago"></QRCode>
      <Button onPress={handleOpenCamera} title="Abrir scanner" />

      {cameraOpen && (
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      {dataBeenScanned && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={dataBeenScanned}
          onRequestClose={() => {
            setDataBeenScanned(null);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Scanned: {scannedData}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setDataBeenScanned(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Adds a dim background effect
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:300,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
