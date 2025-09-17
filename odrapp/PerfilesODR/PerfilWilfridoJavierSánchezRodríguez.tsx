import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilWilfridoJavierSanchezModal: React.FC<ModalProps> = ({ visible, onClose }) => {
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
                source={require('../Fotoperfiles/wilfridojaviersanchezrodriguez.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>Wilfrido Javier Sánchez Rodríguez</Text>
              <Text style={styles.role}>Comercial Senior - Especialista en Ventas</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil Profesional</Text>
              <Text style={styles.bulletText}>• Comercial de amplia experiencia orientado a la consecución de resultados, que no solo se reducen a las ganancias económicas inmediatas sino también a establecer relaciones de larga duración con los clientes.</Text>
              <Text style={styles.bulletText}>• Apasionado con el trabajo porque considera que vender no deja de ser un arte.</Text>
              <Text style={styles.bulletText}>• Especialista en ventas con más de 14 años de experiencia en diferentes sectores empresariales.</Text>
              <Text style={styles.bulletText}>• Experto en gestión comercial, desarrollo de equipos de ventas y estrategias de mercado.</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Competencias Profesionales</Text>
              <Text style={styles.bulletText}>• Altas capacidades de negociación</Text>
              <Text style={styles.bulletText}>• Trabajo en equipo y habilidades sociales</Text>
              <Text style={styles.bulletText}>• Flexibilidad horaria</Text>
              <Text style={styles.bulletText}>• Gestión de cartera de clientes y potenciales clientes</Text>
              <Text style={styles.bulletText}>• Experiencia en ventas en segmento de tangibles y no tangibles</Text>
              <Text style={styles.bulletText}>• Trabajo por objetivos</Text>
              <Text style={styles.bulletText}>• Dotes organizativos</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Experiencia Laboral Destacada</Text>
              <Text style={styles.bulletText}>• Jefe de ventas Sr. SETEL XTRIM (2023 - Actualidad)</Text>
              <Text style={styles.bulletText}>• Asesor Comercial Corporativo MULTIPARTES (2023)</Text>
              <Text style={styles.bulletText}>• Supervisor De Distribuidores Segmento Fijo CONECEL SA (2022-2023)</Text>
              <Text style={styles.bulletText}>• Asesor Corporativo Comercial LLANTICENTRO L&M (2019-2021)</Text>
              <Text style={styles.bulletText}>• Channel Development Cervecería Nacional (2012-2016)</Text>
              <Text style={styles.bulletText}>• Supervisor de Ventas Quevedo Bottling Company (2009-2012)</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Formación Académica</Text>
              <Text style={styles.bulletText}>• Universidad Técnica Estatal De Quevedo - Ingeniería Zootécnica</Text>
              <Text style={styles.bulletText}>• Colegio Fiscal Nicolás Infante Díaz - Bachiller Químico Biológico</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Capacitación Complementaria</Text>
              <Text style={styles.bulletText}>• Universidad Técnica Estatal De Quevedo: Módulo de Inglés</Text>
              <Text style={styles.bulletText}>• Universidad Técnica Estatal De Quevedo: Computación Básica (Windows, Word y Excel)</Text>
              <Text style={styles.bulletText}>• Asociación de Ganaderos de la Sierra y Oriente: Seminario de inseminación artificial en Bovinos</Text>
              <Text style={styles.bulletText}>• Cervecería Nacional: Seminario de ley antimonopolio y sobornos</Text>
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

export default PerfilWilfridoJavierSanchezModal;
