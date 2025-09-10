import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Nosotros: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nosotros</Text>
      <Text style={styles.text}>
        Aquí puedes poner la información sobre la empresa, misión, visión, historia, equipo, etc.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default Nosotros;
