import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilLeninArroyoBaltanModal: React.FC<ModalProps> = ({ visible, onClose }) => {
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
                source={require('../Fotoperfiles/lenin_arroyo_baltan.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>PhD. Lenin Arroyo Baltán (Ecuador)</Text>
              <Text style={styles.role}>DOCENTE</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.bulletText}>• Doctor en Ciencias Jurídicas por la Universidad de Bremen (Alemania).</Text>
              <Text style={styles.bulletText}>• Posee dos postdoctorados en Derechos de la Naturaleza por las universidades de Bremen y Kassel.</Text>
              <Text style={styles.bulletText}>• Formación en Ciencias Sociales (FLACSO, Ecuador), Derechos Humanos y Democracia (UASB-Ecuador), y Derecho Penal y Justicia Indígena (Uniandes).</Text>
              <Text style={styles.bulletText}>• Su producción académica e investigativa se centra en derechos humanos, migración, derecho internacional público, sociología y filosofía del derecho.</Text>
              <Text style={styles.bulletText}>• Actualmente es decano y docente titular agregado 2 en el Instituto de Altos Estudios Nacionales (IAEN), y docente titular en la Pontificia Universidad Católica del Ecuador.</Text>
              <Text style={styles.bulletText}>• Director de la Red Jurídica Crítica del Ecuador (REDIJC) y secretario general del Comité Permanente para la Prevención del Delito en América Latina (COPLAD-ILANUD).</Text>
              <Text style={styles.bulletText}>• Ha ejercido cargos de liderazgo académico e institucional a nivel nacional e internacional.</Text>
              <Text style={styles.bulletText}>• Entre sus reconocimientos destacan becas del DAAD y GIZ, y su rol como experto ante la Corte Interamericana de Derechos Humanos.</Text>
              <Text style={styles.bulletText}>• Forma parte de varios consejos académicos y editoriales.</Text>
              <Text style={styles.bulletText}>• Tiene publicaciones académicas en temas como derechos humanos, derechos de la naturaleza, migración y filosofía del derecho.</Text>
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

export default PerfilLeninArroyoBaltanModal;
