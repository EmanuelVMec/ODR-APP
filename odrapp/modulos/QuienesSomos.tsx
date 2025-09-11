import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuienesSomos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Somos un equipo comprometido con la resolución de conflictos de manera eficiente y profesional. (Placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default QuienesSomos;
