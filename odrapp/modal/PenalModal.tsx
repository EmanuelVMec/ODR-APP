import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PenalModalProps {
  visible: boolean;
  onClose: () => void;
}

const PenalModal: React.FC<PenalModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        {/* <Image source={require('../assets/penal.jpg')} style={{ width: 120, height: 120, marginBottom: 16 }} /> */}
        <Text style={styles.title}>Penal</Text>
        <Text style={styles.text}>
En el área penal, facilitamos la mediación en delitos de acción privada y aquellos susceptibles de conciliación. Nuestro servicio busca reparar el daño causado y restaurar las relaciones entre las partes, promoviendo la justicia restaurativa y evitando la judicialización innecesaria de los conflictos.
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'center',
  },
  closeBtn: {
    backgroundColor: '#183A7C',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PenalModal;
