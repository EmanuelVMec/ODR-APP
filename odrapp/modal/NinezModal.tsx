import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NinezModalProps {
  visible: boolean;
  onClose: () => void;
}

const NinezModal: React.FC<NinezModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        {/* <Image source={require('../assets/ninez.jpg')} style={{ width: 120, height: 120, marginBottom: 16 }} /> */}
        <Text style={styles.title}>Niñez y Adolescencia</Text>
        <Text style={styles.text}>
En materia de niñez y adolescencia, ofrecemos mediación en temas sensibles como tenencia, régimen de visitas, pensión alimenticia y patria potestad. Nuestro enfoque prioriza el bienestar de los menores, buscando acuerdos que garanticen sus derechos y necesidades. Trabajamos para que las familias encuentren soluciones consensuadas que favorezcan el desarrollo integral de los niños y adolescentes involucrados.
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

export default NinezModal;
