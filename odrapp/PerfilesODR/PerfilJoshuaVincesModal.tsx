import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

interface PerfilJoshuaVincesModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilJoshuaVincesModal: React.FC<PerfilJoshuaVincesModalProps> = ({ visible, onClose }) => {
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
                source={require('../Fotoperfiles/joshua_vinces.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>Ing. Joshua Emanuel Vinces Manrique</Text>
              <Text style={styles.role}>Ingeniero en Sistemas de Información</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.textCenter}>
                Entusiasta de la programación y el diseño web, con experiencia en desarrollo de aplicaciones y análisis de sistemas. Poseo una perspectiva innovadora y orientada al avance tecnológico con énfasis en uso y desarrollo de inteligencia artificial, lo que me permite abordar problemas complejos y tomar decisiones estratégicas. Estoy comprometido en contribuir al éxito de las empresas mediante la implementación de soluciones tecnológicas efectivas y creativas.
              </Text>
            </View>

            <View style={styles.rowCards}>
              <View style={styles.sectionCardSmall}>
                <MaterialIcons name="star" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
                <Text style={styles.sectionTitleSmall}>Habilidades</Text>
                {renderBar('Creación de páginas web', 95)}
                {renderBar('Diseño gráfico publicitario', 90)}
                {renderBar('Desarrollo de Software', 92)}
                {renderBar('Base de datos', 90)}
              </View>
              <View style={styles.sectionCardSmall}>
                <FontAwesome name="language" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
                <Text style={styles.sectionTitleSmall}>Idiomas</Text>
                {renderBar('Español', 100)}
                {renderBar('Inglés', 30)}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="school" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Formación Académica</Text>
              <Text style={styles.bulletText}>• Ingeniería en Sistemas de Información - Universidad Técnica de Cotopaxi (2021 - 2025)</Text>
              <Text style={styles.bulletText}>• Bachillerato Técnico - Unidad Educativa Nicolás Infante Díaz (2015 - 2020)</Text>
              <Text style={styles.bulletText}>• Escuela - Unidad Educativa Particular Cristiana Adonai (2008 - 2014)</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="workspace-premium" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
              <Text style={styles.bulletText}>• Prácticas laborales en la Policía Nacional del Ecuador (Oct 2023 - Feb 2024)</Text>
              <Text style={styles.bulletText}>• Master Coac en escuelas públicas, Progracademy (Abr 2023 - May 2023)</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="event" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Seminarios</Text>
              <Text style={styles.bulletText}>• IX Congreso Internacional de Investigación Científica UTC - Ene 2025 (40 Horas)</Text>
              <Text style={styles.bulletText}>• IX Jornadas Informáticas - Jul 2024 (40 Horas)</Text>
              <Text style={styles.bulletText}>• VIII Congreso Internacional de Investigación Científica - Ene 2024 (40 Horas)</Text>
              <Text style={styles.bulletText}>• VIII Jornadas Informáticas - Jul 2023 (40 Horas)</Text>
              <Text style={styles.bulletText}>• VII Congreso Internacional de Investigación Científica - Ene 2023 (40 Horas)</Text>
              <Text style={styles.bulletText}>• Inspiring Study Conference with Google - Dic 2023 (80 Horas)</Text>
              <Text style={styles.bulletText}>• API Rest con Angular y Node.Js - Ago 2022 (20 Horas)</Text>
              <Text style={styles.bulletText}>• VI Congreso Internacional de Investigación Científica - Ene 2022 (40 Horas)</Text>
              <Text style={styles.bulletText}>• VI Jornadas Informáticas - Jul 2021 (40 Horas)</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="workspace-premium" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Logros</Text>
              <Text style={styles.bulletText}>• Desarrollo del artículo científico titulado: "Predicción del crecimiento de plantas de café mediante machine learning basado en variables climáticas y agronómicas", publicado en Revista Ciencia y Tecnología UTEQ.</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="contact-phone" size={22} color="#6046FF" style={{ marginBottom: 2 }} />
              <Text style={styles.sectionTitle}>Contacto</Text>
              <Text style={styles.text}><FontAwesome name="phone" size={16} color="#1a2c6c" />  0968098097</Text>
              <Text style={styles.text}><MaterialIcons name="email" size={16} color="#1a2c6c" />  joshuaemanuelvincesmanrique@gmail.com</Text>
              <Text style={styles.text}><FontAwesome name="map-marker" size={16} color="#1a2c6c" />  Quevedo, Ecuador</Text>
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

export default PerfilJoshuaVincesModal;