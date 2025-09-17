import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

interface PerfilKatherineConformeModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilKatherineConformeModal: React.FC<PerfilKatherineConformeModalProps> = ({ visible, onClose }) => {
  // Barras horizontales para porcentajes
  const renderBar = (label: string, percent: number) => (
    <View style={styles.barContainer} key={label}>
      <Text style={styles.barLabel}>• {label}</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
        <Text style={styles.barPercent}>{percent}%</Text>
      </View>
    </View>
  );

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
                source={require('../Fotoperfiles/jordan_olmedo_vera_cedeno.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>Jordan Olmedo Vera Cedeño</Text>
              <Text style={styles.role}>Planificador de Medios Digitales</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.textCenter}>
                Soy un profesional en planificación de redes sociales, he formado mi educación y experiencia desde mis 15 años fomentando y construyendo marcas que de una forma o otra se han convertido en marcas importantes, me esfuerzo por mi educación, tanto así, que tengo la certificación máxima de Facebook y de Google Movile, cuento con conocimientos de herramientas tecnológicas para el marketing digital que se usan más en el extranjero, actualmente soy COACH y profesor de marketing digital de un instituto de educación, donde fomento continuamente una educación de calidad en el marketing digital internacional.
              </Text>
            </View>

            <View style={styles.rowCards}>
              <View style={styles.sectionCardSmall}>
                <MaterialIcons name="star" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
                <Text style={styles.sectionTitleSmall}>Habilidades</Text>
                {renderBar('Capacidad de comunicación', 98)}
                {renderBar('Estrategias de Venta', 95)}
                {renderBar('Resolución de conflictos', 90)}
                {renderBar('Dominio de las nuevas tecnologías', 99)}
                {renderBar('Mediación', 100)}
                {renderBar('Trabajo en equipo', 99)}
              </View>
              <View style={styles.sectionCardSmall}>
                <FontAwesome name="language" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
                <Text style={styles.sectionTitleSmall}>Idiomas</Text>
                {renderBar('Español', 99)}
                {renderBar('Inglés', 65)}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="school" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Formación Académica</Text>
              <Text style={styles.bulletText}>• LICENCIADO EN ADMINISTRACIÓN TURÍSTICAS HOTELERAS - Universidad de Babahoyo</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="workspace-premium" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Formación Complementaria</Text>
              <Text style={styles.bulletText}>• Planificador de Medios Digitales - Pearson</Text>
              <Text style={styles.bulletText}>• Mediación General</Text>
              <Text style={styles.bulletText}>• 17 Cursos de marketing digital - Facebook, 2019</Text>
              <Text style={styles.bulletText}>• Community Manager - SETEC, 2018</Text>
              <Text style={styles.bulletText}>• Google Mobile - Google Academic, 2018</Text>
              <Text style={styles.bulletText}>• Certificaciones Administrativas MNG - Google Academic, 2018</Text>
              <Text style={styles.bulletText}>• ZAP Contable</Text>
              <Text style={styles.bulletText}>• Analytica Web y Administración de Datos</Text>
              <Text style={styles.bulletText}>• Wordpress para empresas</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="gavel" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Áreas de Práctica</Text>
              {renderBar('Diseño de páginas', 90)}
              {renderBar('Administrador de Marcas Digitales', 90)}
              {renderBar('Marketing digital', 96)}
              {renderBar('Community Manager', 93)}
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="contact-phone" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Contacto</Text>
              <Text style={styles.text}><FontAwesome name="phone" size={16} color="#1a2c6c" />  0991071187</Text>
              <Text style={styles.text}><MaterialIcons name="email" size={16} color="#1a2c6c" />  jordver1997@gmail.com</Text>
              <Text style={styles.text}><FontAwesome name="map-marker" size={16} color="#1a2c6c" />  Buena Fe, Av. 7 de Agosto, diagonal tanque de agua potable</Text>
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
  role2: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: '400',
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
  sectionCardSmall: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginVertical: 7,
    width: '46%',
    shadowColor: '#1a2c6c11',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    marginVertical: 7,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2c6c',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  sectionTitleSmall: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6046FF',
    marginBottom: 4,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  textCenter: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'center',
    alignSelf: 'center',
  },
  textSmall: {
    fontSize: 13,
    color: '#2C3E50',
    marginBottom: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
  bulletText: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  barContainer: {
    width: '100%',
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 13,
    color: '#1a2c6c',
    marginBottom: 2,
    fontWeight: '500',
  },
  barBg: {
    width: '100%',
    height: 16,
    backgroundColor: '#e6e9f5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 2,
  },
  barFill: {
    height: 16,
    backgroundColor: '#6046FF',
    borderRadius: 8,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  barPercent: {
    fontSize: 12,
    color: '#1a2c6c',
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 8,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
});

export default PerfilKatherineConformeModal;
