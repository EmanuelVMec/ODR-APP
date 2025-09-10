import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignOutButton from '../auth/SignOutButton';

const Inicio: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la pantalla de inicio!</Text>
      <SignOutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default Inicio;
