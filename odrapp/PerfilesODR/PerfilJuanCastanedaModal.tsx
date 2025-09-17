import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilJuanCastanedaModal: React.FC<ModalProps> = ({ visible, onClose }) => {
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
                source={require('../Fotoperfiles/juan_castaneda.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>DR. Juan Castañeda (Perú)</Text>
              <Text style={styles.role}>DOCENTE</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.bulletText}>• Abogado litigante, investigador Renacyt, docente universitario, conciliador extrajudicial y árbitro en contrataciones del Estado.</Text>
              <Text style={styles.bulletText}>• Egresado del Doctorado del Derecho y Ciencia Política en la Universidad Nacional Mayor de San Marcos.</Text>
              <Text style={styles.bulletText}>• Especialista en Constitucionalismo Latinoamericano y Derechos Fundamentales por la Pontificia Universidad Católica del Perú (PUCP- Perú).</Text>
              <Text style={styles.bulletText}>• Maestro en Derechos Fundamentales por la Universidad Carlos III de Madrid -España. Especialista en Derecho Parlamentario y técnicas legislativas por la Universidad Castilla de La Mancha.</Text>
              <Text style={styles.bulletText}>• Egresado del Curso de Metodología de la Investigación Socio Jurídica por la Pontificia Universidad Católica del Perú.</Text>
              <Text style={styles.bulletText}>• Especialista en interpretación Jurídica y tutela jurisdiccional de los derechos por la Universidad de Pisa - Italia.</Text>
              <Text style={styles.bulletText}>• Especialista en Justicia Constitucional e interpretación por la Universidad Castilla de La Mancha de España (UCLM). Asociado de la Academia Peruana de Derecho Constitucional.</Text>
              <Text style={styles.bulletText}>• Miembro senior de la Asociación Colombiana de Derecho Procesal Constitucional.</Text>
              <Text style={styles.bulletText}>• Ejerció la labor de Abogado Constitucionalista en la Procuraduría Nacional del Poder Judicial - Procesos Constitucionales en el Perú y fue Asesor Parlamentario en el Congreso de la República del Perú.</Text>
              <Text style={styles.bulletText}>• Miembro distinguido por el Tribunal Plurinacional Constitucional de Bolivia.</Text>
              <Text style={styles.bulletText}>• Ex Director Académico y promoción cultural del Colegio de Abogados de La Libertad (2021 – 2023).</Text>
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

export default PerfilJuanCastanedaModal;
