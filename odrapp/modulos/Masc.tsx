import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Masc = () => (
  <View style={styles.container}>
    <Text style={styles.title}>MASC</Text>
    <Text style={styles.text}>Aquí irá la información sobre Métodos Alternativos de Solución de Conflictos. Puedes personalizar este mensaje.</Text>
  </View>
);

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
    color: '#183A7C',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});

export default Masc;
