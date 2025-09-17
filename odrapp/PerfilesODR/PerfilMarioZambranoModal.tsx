import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

interface PerfilmarioZambranoModalProps {
  visible: boolean;
  onClose: () => void;
}

const PerfilmarioZambranoModal: React.FC<PerfilmarioZambranoModalProps> = ({ visible, onClose }) => {
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
                source={require('../Fotoperfiles/mario_zambrano.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>Mario Felipe Zambrano Vega</Text>
              <Text style={styles.role}>Ingeniero Comercial y Tecnólogo en Computación</Text>
              <Text style={styles.role2}>Experto en Banca, Ventas y Gestión Comercial</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={[styles.sectionTitle, { alignSelf: 'center' }]}>Perfil</Text>
              <Text style={styles.textCenter}>
                Profesional con más de 20 años de experiencia en instituciones financieras, 
                sector comercial y ventas de alto impacto. Destacado por su liderazgo, 
                orientación a resultados y compromiso con la excelencia en el servicio al cliente.
                Formación académica sólida y amplia trayectoria en cargos administrativos, 
                bancarios y de coordinación comercial.
              </Text>
            </View>

            <View style={styles.rowCards}>
              <View style={styles.sectionCardSmall}>
                <MaterialIcons name="star" size={22} color="#6046FF" style={{marginBottom: 2}} />
                <Text style={styles.sectionTitleSmall}>Habilidades</Text>
                {renderBar('Liderazgo', 95)}
                {renderBar('Gestión Comercial', 92)}
                {renderBar('Atención al Cliente', 98)}
                {renderBar('Administración Bancaria', 90)}
                {renderBar('Tecnología y Sistemas', 85)}
              </View>
              <View style={styles.sectionCardSmall}>
                <FontAwesome name="language" size={22} color="#6046FF" style={{marginBottom: 2}} />
                <Text style={styles.sectionTitleSmall}>Idiomas</Text>
                {renderBar('Español', 100)}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="school" size={22} color="#6046FF" style={{marginBottom: 2}} />
              <Text style={styles.sectionTitle}>Formación Académica</Text>
              <Text style={styles.bulletText}>• Primaria: Escuela Fiscal “Manuel de Jesús Calle”</Text>
              <Text style={styles.bulletText}>• Secundaria: Colegio Nacional “Nicolás Infante Díaz”</Text>
              <Text style={styles.bulletText}>• Tecnólogo en Computación – UTEQ</Text>
              <Text style={styles.bulletText}>• Ingeniero Comercial – Facultad de Ciencias Empresariales UTEQ</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="workspace-premium" size={22} color="#6046FF" style={{marginBottom: 2}} />
              <Text style={styles.sectionTitle}>Cursos y Seminarios</Text>
              <Text style={styles.bulletText}>• Liderazgo Estudiantil – FEUE</Text>
              <Text style={styles.bulletText}>• Mercadeo – UTEQ</Text>
              <Text style={styles.bulletText}>• Excelencia en Servicio al Cliente – UTEQ</Text>
              <Text style={styles.bulletText}>• Administración del Cambio – TEAM BUILDEARS</Text>
              <Text style={styles.bulletText}>• Contabilidad Bancaria – INTELECTO</Text>
              <Text style={styles.bulletText}>• Franquicias del Ecuador – UTEQ</Text>
              <Text style={styles.bulletText}>• Seminario Taller Internacional sobre Capital Humano</Text>
              <Text style={styles.bulletText}>• Otros cursos en computación, ventas y servicio</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="work" size={22} color="#6046FF" style={{marginBottom: 2}} />
              <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
              <Text style={styles.bulletText}>• Banco del Pichincha (1998-2000) – Auxiliar Bancario</Text>
              <Text style={styles.bulletText}>• Filanbanco (2000-2001) – Recibidor Pagador</Text>
              <Text style={styles.bulletText}>• Produbanco (2002-2015) – Ejecutivo 1 (Área Compensación)</Text>
              <Text style={styles.bulletText}>• Jardines de Quevedo (2016) – Asesor Comercial</Text>
              <Text style={styles.bulletText}>• Hospital IESS Quevedo (2016-2017) – Responsable de Admisión</Text>
              <Text style={styles.bulletText}>• Marcimex (2018-2019) – Sub Jefe de Agencia</Text>
              <Text style={styles.bulletText}>• Banco Vision Fund (2020-2021) – Asesor de Créditos</Text>
              <Text style={styles.bulletText}>• Galmack Grupo Galarza (2021) – Asesor Comercial</Text>
              <Text style={styles.bulletText}>• COAC Futuro Lamanense (2021-2022) – Coordinador de Agencia</Text>
              <Text style={styles.bulletText}>• Almacenes La Ganga (2022) – Jefe de Almacén</Text>
              <Text style={styles.bulletText}>• Corporación Jarrín Herrera (2022-2023) – Coordinador Ventas</Text>
              <Text style={styles.bulletText}>• Setel Telecomunicaciones Xtrim (2023-2024) – Vendedor Residencial</Text>
            </View>

            <View style={styles.sectionCard}>
              <MaterialIcons name="contact-phone" size={22} color="#6046FF" style={{marginBottom: 2}} />
              <Text style={styles.sectionTitle}>Contacto</Text>
              <Text style={styles.text}><FontAwesome name="phone" size={16} color="#1a2c6c" />  +593 99 061 6536</Text>
              <Text style={styles.text}><MaterialIcons name="email" size={16} color="#1a2c6c" />  mfzv200@hotmail.com</Text>
              <Text style={styles.text}><FontAwesome name="map-marker" size={16} color="#1a2c6c" />  Ventanas, Ecuador</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// --- ESTILOS (idénticos al componente original)
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '92%', maxHeight: '92%', backgroundColor: '#f8f9fa', borderRadius: 24, padding: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  scrollContent: { alignItems: 'center', paddingBottom: 30, paddingHorizontal: 0 },
  closeButton: { alignSelf: 'flex-end', padding: 16, marginTop: 4, marginRight: 4, zIndex: 2 },
  headerCard: { alignItems: 'center', backgroundColor: '#1a2c6c', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, paddingBottom: 18, width: '100%', marginBottom: 8, borderBottomWidth: 2, borderBottomColor: '#6046FF22' },
  profileImage: { width: 110, height: 110, borderRadius: 55, marginBottom: 10, borderWidth: 3, borderColor: '#fff', backgroundColor: '#fff' },
  name: { fontSize: 22, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 2 },
  role: { fontSize: 15, color: '#b3c6ff', textAlign: 'center', marginBottom: 2, fontWeight: '600' },
  role2: { fontSize: 14, color: '#fff', textAlign: 'center', marginBottom: 2, fontWeight: '400' },
  sectionCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginVertical: 7, width: '92%', shadowColor: '#1a2c6c11', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, alignSelf: 'center' },
  sectionCardSmall: { backgroundColor: '#fff', borderRadius: 16, padding: 12, marginVertical: 7, width: '46%', shadowColor: '#1a2c6c11', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, alignSelf: 'center', marginHorizontal: 4, alignItems: 'center' },
  rowCards: { flexDirection: 'row', justifyContent: 'space-between', width: '92%', marginVertical: 7, alignSelf: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1a2c6c', marginBottom: 6, alignSelf: 'flex-start' },
  sectionTitleSmall: { fontSize: 15, fontWeight: '700', color: '#6046FF', marginBottom: 4, alignSelf: 'center' },
  text: { fontSize: 14, color: '#2C3E50', marginBottom: 4, textAlign: 'left', alignSelf: 'flex-start' },
  textCenter: { fontSize: 14, color: '#2C3E50', marginBottom: 4, textAlign: 'center', alignSelf: 'center' },
  bulletText: { fontSize: 14, color: '#2C3E50', marginBottom: 4, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 10 },
  barContainer: { width: '100%', marginBottom: 8 },
  barLabel: { fontSize: 13, color: '#1a2c6c', marginBottom: 2, fontWeight: '500' },
  barBg: { width: '100%', height: 16, backgroundColor: '#e6e9f5', borderRadius: 8, flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom: 2 },
  barFill: { height: 16, backgroundColor: '#6046FF', borderRadius: 8, position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 1 },
  barPercent: { fontSize: 12, color: '#1a2c6c', fontWeight: '700', marginLeft: 'auto', marginRight: 8, zIndex: 2, backgroundColor: 'transparent' },
});

export default PerfilmarioZambranoModal;
