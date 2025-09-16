import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface InquilinatoModalProps {
  visible: boolean;
  onClose: () => void;
}

const InquilinatoModal: React.FC<InquilinatoModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        {/* <Image source={require('../assets/inquilinato.jpg')} style={{ width: 120, height: 120, marginBottom: 16 }} /> */}
        <Text style={styles.title}>Inquilinato</Text>
        <Text style={styles.text}>
En materia de inquilinato, facilitamos acuerdos entre arrendadores y arrendatarios en temas como pago de cánones, terminación de contratos, reparaciones y restitución de inmuebles. Nuestra mediación busca preservar la relación contractual y evitar litigios prolongados, promoviendo soluciones prácticas y satisfactorias para ambas partes.
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

export default InquilinatoModal;
