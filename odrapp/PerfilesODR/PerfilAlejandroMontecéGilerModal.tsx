import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilAlejandroMontecéGilerModal: React.FC<ModalProps> = ({ visible, onClose }) => {
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
                source={require('../Fotoperfiles/alejandro_montecé_giler.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>PhD. Alejandro Montecé Giler (Ecuador)</Text>
              <Text style={styles.role}>DOCENTE</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.bulletText}>• Abogado de los Juzgados y Tribunales de Justicia del Ecuador, por la Universidad Central del Ecuador.</Text>
              <Text style={styles.bulletText}>• Magíster en Ciencias Internacionales, por la Universidad Central del Ecuador.</Text>
              <Text style={styles.bulletText}>• Especialista en Derecho Constitucional, por la Universidad Andina Simón Bolívar – Ecuador.</Text>
              <Text style={styles.bulletText}>• Magíster en Derecho Constitucional, por la Universidad Andina Simón Bolívar – Ecuador.</Text>
              <Text style={styles.bulletText}>• Magíster en Derecho Penal y Criminología, por la Universidad Regional Autónoma de los Andes (UNIANDES) – Ecuador.</Text>
              <Text style={styles.bulletText}>• Magíster en Derechos Humanos, por la Universidad Internacional de La Rioja (UNIR) – España.</Text>
              <Text style={styles.bulletText}>• Doctorando en Derecho Penal, por la Universidad de Buenos Aires (UBA) – Argentina.</Text>
              <Text style={styles.bulletText}>• Doctor (PhD), en Ciencias Políticas, por el Centro de Estudios Científicos y de Investigación CECIC – México.</Text>
              <Text style={styles.bulletText}>• Doctor Honoris Causa, por All Nations Keyman University – Estados Unidos.</Text>
              <Text style={styles.bulletText}>• Doctor en Filosofía (PhD), por la Honorable Academia Mundial de Educación – Perú.</Text>
              <Text style={styles.bulletText}>• Doctor Hispano Honoris Causa, por la Universidad Nacional Autónoma de México – México.</Text>
              <Text style={styles.bulletText}>• Diplomado Internacional en Litigación conforme al CCJPEJ, por la Universidad Nacional Autónoma de México (UNAM).</Text>
              <Text style={styles.bulletText}>• Diplomado en Derecho Internacional y Derecho Internacional Humanitario, por la Universidad Laica Eloy Alfaro de Manabí – Ecuador.</Text>
              <Text style={styles.bulletText}>• Diplomado en Derecho Penal, por la Universidad Laica Eloy Alfaro de Manabí – Ecuador.</Text>
              <Text style={styles.bulletText}>• Diplomado en Derecho Procesal Penal, por la Universidad Laica Eloy Alfaro de Manabí – Ecuador.</Text>
              <Text style={styles.bulletText}>• Diplomado en Derecho Procesal Penal Multicompetente, por la Universidad Laica Eloy Alfaro de Manabí – Ecuador.</Text>
              <Text style={styles.bulletText}>• Diplomado Internacional en Derechos y Relación con el Proceso Penal, por la Universidad de San Carlos de Guatemala – Guatemala.</Text>
              <Text style={styles.bulletText}>• Diplomado en Litigación Penal, por la Universidad Laica Eloy Alfaro de Manabí – Ecuador.</Text>
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

export default PerfilAlejandroMontecéGilerModal;
