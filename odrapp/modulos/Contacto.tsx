import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  Animated,
  Image,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Contacto = () => {
  const [whatsappModalVisible, setWhatsappModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Animación de entrada escalonada
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleWhatsApp = () => {
    if (!email) {
      setEmailError('Por favor ingresa tu email');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un email válido');
      return;
    }

    const message = `Hola, necesito información sobre los servicios de ODR Ecuador. Mi nombre: ${nombre}, Email: ${email}. Mensaje: ${mensaje}`;
    const phoneNumber = '593994795695';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('WhatsApp no disponible', 'WhatsApp no está instalado');
        }
      })
      .catch((err) => console.error('Error:', err));
    
    setWhatsappModalVisible(false);
    setEmail('');
    setNombre('');
    setMensaje('');
    setEmailError('');
  };

  const handleCall = () => {
    const phoneNumber = '+593994795695';
    Linking.openURL(`tel:${phoneNumber}`).catch(err => console.error('Error al hacer llamada:', err));
  };

  const handleEmail = () => {
    const emailAddress = 'info@odrecuador.com';
    Linking.openURL(`mailto:${emailAddress}`).catch(err => console.error('Error al abrir email:', err));
  };

  const openMaps = () => {
    const address = 'Av. Quito y Calle Carlos Julio Arosemena, Quevedo, Los Ríos, Ecuador';
    const url = Platform.select({
      ios: `maps://app?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });
    
    if (url) {
      Linking.openURL(url).catch(() => {
        // Fallback a Google Maps web
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#1c3e85" />
      
      {/* Hero Banner */}
      <Animated.View 
        style={[
          styles.heroSection,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Image
          source={{ uri: 'https://odrecuador.com/assets/img/list/portada-pagina-contacto-odr-ecuador.jpg' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <View style={styles.breadcrumb}>
            </View>
            
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="comments" size={45} color="#FFD700" />
              </View>
              <Text style={styles.heroTitle}>
                Contáctanos
              </Text>
            </View>
            
            <Text style={styles.heroSubtitle}>
              Estamos aquí para ayudarte con todas tus consultas sobre resolución de conflictos
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Información de Contacto Principal */}
      <Animated.View 
        style={[
          styles.contactInfoSection,
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Información de Contacto</Text>
        <Text style={styles.sectionSubtitle}>
          Te atendemos personalmente en nuestras oficinas o a través de nuestros canales digitales
        </Text>

        <View style={styles.contactGrid}>
          <TouchableOpacity style={styles.contactCard} onPress={handleCall} activeOpacity={0.8}>
            <View style={[styles.contactIcon, { backgroundColor: '#e8f5e8' }]}>
              <FontAwesome5 name="phone" size={24} color="#27ae60" />
            </View>
            <Text style={styles.contactTitle}>Teléfono</Text>
            <Text style={styles.contactValue}>+593 99 479 5695</Text>
            <Text style={styles.contactDescription}>
              Llámanos de lunes a viernes de 8:00 AM a 6:00 PM
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmail} activeOpacity={0.8}>
            <View style={[styles.contactIcon, { backgroundColor: '#e6f3ff' }]}>
              <FontAwesome5 name="envelope" size={24} color="#3498db" />
            </View>
            <Text style={styles.contactTitle}>Email</Text>
            <Text style={styles.contactValue}>info@odrecuador.com</Text>
            <Text style={styles.contactDescription}>
              Envíanos un email y te responderemos en 24 horas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={openMaps} activeOpacity={0.8}>
            <View style={[styles.contactIcon, { backgroundColor: '#fff3e0' }]}>
              <FontAwesome5 name="map-marker-alt" size={24} color="#f39c12" />
            </View>
            <Text style={styles.contactTitle}>Dirección</Text>
            <Text style={styles.contactValue}>
              Av. Quito y Calle Carlos Julio Arosemena
            </Text>
            <Text style={styles.contactDescription}>
              Diagonal a la Casa Judicial de Quevedo, junto a la UTEQ
            </Text>
          </TouchableOpacity>

          <View style={styles.contactCard}>
            <View style={[styles.contactIcon, { backgroundColor: '#f0f4ff' }]}>
              <FontAwesome5 name="clock" size={24} color="#6c5ce7" />
            </View>
            <Text style={styles.contactTitle}>Horarios</Text>
            <Text style={styles.contactValue}>Lunes a Viernes</Text>
            <Text style={styles.contactDescription}>
              8:00 AM - 6:00 PM{'\n'}
              Sábados: 8:00 AM - 12:00 PM
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Formulario de Contacto Rápido */}
      <View style={styles.quickContactSection}>
        <Text style={styles.sectionTitle}>Contáctanos por WhatsApp</Text>
        <Text style={styles.sectionSubtitle}>
          Completa el formulario y te contactaremos inmediatamente
        </Text>

        <TouchableOpacity 
          style={styles.whatsappFormButton}
          onPress={() => setWhatsappModalVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.whatsappButtonContent}>
            <FontAwesome5 name="whatsapp" size={28} color="#25D366" />
            <View style={styles.whatsappButtonText}>
              <Text style={styles.whatsappTitle}>Escribir por WhatsApp</Text>
              <Text style={styles.whatsappSubtitle}>Respuesta inmediata garantizada</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#25D366" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Servicios de Contacto */}
      <View style={styles.servicesContactSection}>
        <Text style={styles.sectionTitle}>¿En qué podemos ayudarte?</Text>
        <Text style={styles.sectionSubtitle}>
          Nuestro equipo especializado está listo para asesorarte
        </Text>

        <View style={styles.servicesGrid}>
          <View style={styles.serviceContactCard}>
            <FontAwesome5 name="gavel" size={32} color="#e74c3c" />
            <Text style={styles.serviceContactTitle}>Arbitraje</Text>
            <Text style={styles.serviceContactDescription}>
              Consultas sobre procesos arbitrales y designación de árbitros
            </Text>
          </View>

          <View style={styles.serviceContactCard}>
            <FontAwesome5 name="users" size={32} color="#27ae60" />
            <Text style={styles.serviceContactTitle}>Conciliación</Text>
            <Text style={styles.serviceContactDescription}>
              Información sobre métodos de conciliación especializada
            </Text>
          </View>

          <View style={styles.serviceContactCard}>
            <FontAwesome5 name="graduation-cap" size={32} color="#3498db" />
            <Text style={styles.serviceContactTitle}>Formación</Text>
            <Text style={styles.serviceContactDescription}>
              Cursos de certificación y programas académicos
            </Text>
          </View>

          <View style={styles.serviceContactCard}>
            <FontAwesome5 name="file-alt" size={32} color="#9b59b6" />
            <Text style={styles.serviceContactTitle}>Documentación</Text>
            <Text style={styles.serviceContactDescription}>
              Asesoría en documentos y procedimientos legales
            </Text>
          </View>
        </View>
      </View>

      {/* Ubicación y Acceso */}
      <View style={styles.locationSection}>
        <Text style={styles.sectionTitle}>Nuestra Ubicación</Text>
        <Text style={styles.sectionSubtitle}>
          Fácil acceso en el centro de Quevedo, Los Ríos
        </Text>

        <View style={styles.locationCard}>
          {/* Imagen local del mapa */}
          <Image
            source={require('../assets/MAPAODR.jpeg')}
            style={styles.locationImage}
            resizeMode="cover"
          />
          
          <View style={styles.locationContent}>
            <Text style={styles.locationTitle}>Centro de Arbitraje ODR Ecuador</Text>
            <View style={styles.locationDetail}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#1c3e85" />
              <Text style={styles.locationText}>
                Av. Quito y Calle Carlos Julio Arosemena{'\n'}
                Diagonal a la Casa Judicial de Quevedo{'\n'}
                Junto a la UTEQ, Quevedo - Los Ríos
              </Text>
            </View>
            
            <View style={styles.locationActions}>
              <TouchableOpacity style={styles.locationButton} onPress={openMaps}>
                <FontAwesome5 name="directions" size={16} color="#ffffff" />
                <Text style={styles.locationButtonText}>Cómo llegar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.locationButton, styles.locationButtonSecondary]} onPress={handleCall}>
                <FontAwesome5 name="phone" size={16} color="#1c3e85" />
                <Text style={[styles.locationButtonText, { color: '#1c3e85' }]}>Llamar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Modal de WhatsApp */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={whatsappModalVisible}
        onRequestClose={() => setWhatsappModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <FontAwesome5 name="whatsapp" size={28} color="#25D366" />
              </View>
              <Text style={styles.modalTitle}>Contactar por WhatsApp</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setWhatsappModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>
              Completa la información para que podamos atenderte mejor
            </Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Nombre completo</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Tu nombre completo"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={[styles.formInput, emailError ? styles.formInputError : {}]}
                placeholder="tu.email@ejemplo.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Mensaje (opcional)</Text>
              <TextInput
                style={[styles.formInput, styles.formTextArea]}
                placeholder="Describe brevemente tu consulta..."
                value={mensaje}
                onChangeText={setMensaje}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
            
            <TouchableOpacity style={styles.sendButton} onPress={handleWhatsApp} activeOpacity={0.8}>
              <FontAwesome5 name="paper-plane" size={18} color="#ffffff" />
              <Text style={styles.sendButtonText}>Enviar a WhatsApp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Hero Section
  heroSection: {
    height: height * 0.4,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 62, 133, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  breadcrumbText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '500',
  },
  breadcrumbActive: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
    lineHeight: 22,
  },

  // Contact Info Section
  contactInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  contactGrid: {
    gap: 20,
  },
  contactCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  contactIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Quick Contact Section
  quickContactSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
  },
  whatsappFormButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  whatsappButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappButtonText: {
    flex: 1,
    marginLeft: 20,
  },
  whatsappTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 5,
  },
  whatsappSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  // Services Contact Section
  servicesContactSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  serviceContactCard: {
    width: (width - 55) / 2,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  serviceContactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  serviceContactDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Location Section
  locationSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
  },
  locationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  locationImage: {
    width: '100%',
    height: 200,
  },
  locationContent: {
    padding: 25,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 15,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    lineHeight: 20,
    flex: 1,
  },
  locationActions: {
    flexDirection: 'row',
    gap: 15,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c3e85',
    paddingVertical: 12,
    borderRadius: 15,
  },
  locationButtonSecondary: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#1c3e85',
  },
  locationButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c3e85',
    flex: 1,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  modalDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
    lineHeight: 22,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  formInputError: {
    borderColor: '#e74c3c',
  },
  formTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    marginTop: 5,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 18,
    borderRadius: 15,
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Contacto;
