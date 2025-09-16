import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ComunitarioModalProps {
  visible: boolean;
  onClose: () => void;
}

const ComunitarioModal: React.FC<ComunitarioModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        {/* <Image source={require('../assets/comunitario.jpg')} style={{ width: 120, height: 120, marginBottom: 16 }} /> */}
        <Text style={styles.title}>Comunitario</Text>
        <Text style={styles.text}>
En el ámbito comunitario, promovemos la resolución de conflictos vecinales, problemas de convivencia y disputas en comunidades de propietarios. Nuestra mediación fomenta el diálogo y la cooperación, ayudando a restablecer la armonía y el respeto mutuo entre los miembros de la comunidad.
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

export default ComunitarioModal;
