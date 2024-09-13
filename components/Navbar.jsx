import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export function Navbar() {
  return (
    <View style={styles.navbar}>
      <Link href="/" style={styles.link}>
        <Text>Home</Text>
      </Link>
      <Link href="/nroEmergencia" style={styles.link}>
        <Text>Nro. Emergencia</Text>
      </Link>
      <Link href="/contactos" style={styles.link}>
        <Text>Contactos</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ccc',
  },
  link: {
    fontSize: 16,
    color: '#000',
  },
});
