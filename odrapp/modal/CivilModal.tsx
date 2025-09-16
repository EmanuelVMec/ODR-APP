import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CivilModalProps {
  visible: boolean;
  onClose: () => void;
}

const CivilModal: React.FC<CivilModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        {/* <Image source={require('../assets/civil.jpg')} style={{ width: 120, height: 120, marginBottom: 16 }} /> */}
        <Text style={styles.title}>Civil</Text>
        <Text style={styles.text}>
Nuestro servicio de mediación en materia civil abarca un espectro amplio y crucial de disputas legales. Desde la precisa demarcación de linderos hasta la delicada partición de bienes sucesorios y la disolución ordenada de la sociedad conyugal extinta, brindamos un enfoque profesional y centrado en la resolución. Abordamos enérgicamente asuntos como el cobro de deudas y el incumplimiento de contratos, buscando restaurar la equidad y la confianza en cada caso. Además, proporcionamos orientación en situaciones de indemnización por daños y perjuicios, aportando soluciones que reparan y compensan de manera justa.{"\n\n"}
La prescripción adquisitiva de dominio, el amparo posesorio, la acción reivindicatoria y la liquidación de la sociedad conyugal encuentran en nuestra mediación un camino hacia acuerdos sólidos. Incluso en los casos emocionalmente complejos de daño moral y cuestiones de servidumbre, trabajamos incansablemente para alcanzar resoluciones que reflejen tanto la legalidad como la equidad, promoviendo el entendimiento y el consenso entre todas las partes involucradas.
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

export default CivilModal;
