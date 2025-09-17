import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilRoberHidalgoProanoModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={28} color="#1a2c6c" />
            </TouchableOpacity>
            <View style={styles.headerCard}>
              <Image
                source={require('../Fotoperfiles/rober_hidalgo_proano.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>Dr. Rober Hidalgo Proaño (Ecuador)</Text>
              <Text style={styles.role}>Abogado Jr. LAW FIRM</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.bulletText}>• Abogado de los Tribunales del Ecuador.</Text>
              <Text style={styles.bulletText}>• Licenciado en Ciencias Sociales y Políticas.</Text>
              <Text style={styles.bulletText}>• Licenciado en Ciencias de la Educación.</Text>
              <Text style={styles.bulletText}>• Máster en Mediación y Resolución de Conflictos; en Mediación Laboral; y en Relaciones Laborales, Esneca Business School - España.</Text>
              <Text style={styles.bulletText}>• Máster Técnico Orientación y Animación Laboral, Universidad Personal Sevilla - España.</Text>
              <Text style={styles.bulletText}>• Máster Técnico en Prevención Riesgos Laborales, Estudios Superiores Abiertos (SEAS) - España.</Text>
              <Text style={styles.bulletText}>• Árbitro en Derecho, Centro de Arbitraje ODR Ecuador.</Text>
              <Text style={styles.bulletText}>• Diplomado en Justicia Constitucional y Constitucionalismo Latinoamericano, ULEAM.</Text>
              <Text style={styles.bulletText}>• Formador de Formadores acreditado por el ministerio del Trabajo.</Text>
              <Text style={styles.bulletText}>• Facilitador ODR Ecuador.</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '92%',
    maxHeight: '92%',
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 16,
    marginTop: 4,
    marginRight: 4,
    zIndex: 2,
  },
  headerCard: {
    alignItems: 'center',
    backgroundColor: '#1a2c6c',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 18,
    width: '100%',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#6046FF22',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
  },
  role: {
    fontSize: 15,
    color: '#b3c6ff',
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 7,
    width: '92%',
    shadowColor: '#1a2c6c11',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2c6c',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  bulletText: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
});

export default PerfilRoberHidalgoProanoModal;
