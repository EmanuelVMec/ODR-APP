import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LaboralModalProps {
  visible: boolean;
  onClose: () => void;
}

const LaboralModal: React.FC<LaboralModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        {/* <Image source={require('../assets/laboral.jpg')} style={{ width: 120, height: 120, marginBottom: 16 }} /> */}
        <Text style={styles.title}>Laboral</Text>
        <Text style={styles.text}>
En el ámbito laboral, mediamos en conflictos entre empleadores y trabajadores, tales como despidos, liquidaciones, reclamaciones salariales y condiciones de trabajo. Buscamos soluciones equitativas que respeten los derechos de ambas partes y fomenten relaciones laborales armoniosas y productivas.
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

export default LaboralModal;
