import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const QuienesSomos = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
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
      }),
    ]).start();
  }, []);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleSubscribe = () => {
    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido');
      return;
    }
    
    setEmailError('');
    Alert.alert('¡Gracias!', 'Te has suscrito correctamente a nuestro boletín');
    setEmail('');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/593994795695');
  };

  const openSocialMedia = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />      
     
      {/* Banner principal mejorado */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: 'https://odrecuador.com/assets/img/banner/banner-quienes-somos1.webp' }} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <Animated.View 
            style={[
              styles.bannerContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.bannerTitle}>Centro de Arbitraje ODR Ecuador</Text>
            <View style={styles.breadcrumb}>
            </View>
          </Animated.View>
        </View>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        {/* Sección de introducción con diseño robusto */}
        <View style={styles.heroSection}>
          <Animated.View 
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>
                Conócenos: Resolviendo conflictos, construyendo soluciones
              </Text>
              <Text style={styles.heroDescription}>
                Un equipo de profesionales multidisciplinarios; entre ellos negociadores, árbitros, con vasta experiencia resolviendo conflictos en vía extrajudicial como judicial.
              </Text>
              <Text style={styles.heroSubDescription}>
                Experticia que nos ha hecho dignos de la confianza de cada uno de nuestros clientes en Ecuador y en América Latina.
              </Text>
            </View>
            
            <View style={styles.heroCards}>
              <TouchableOpacity 
                style={[
                  styles.missionCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
                activeOpacity={0.8}
                onPressIn={() => {
                  Animated.spring(scaleAnim, {
                    toValue: 0.95,
                    useNativeDriver: true,
                  }).start();
                }}
                onPressOut={() => {
                  Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }}
              >
                <View style={styles.cardIcon}>
                  <FontAwesome5 name="rocket" size={20} color="#FFD700" />
                </View>
                <Text style={styles.cardTitle}>Misión</Text>
                <Text style={styles.cardText}>
                  Convertirnos en referentes de la prestación de servicios académicos, formación y arbitraje a través de nuestra red de Centros.
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.visionCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
                activeOpacity={0.8}
                onPressIn={() => {
                  Animated.spring(scaleAnim, {
                    toValue: 0.95,
                    useNativeDriver: true,
                  }).start();
                }}
                onPressOut={() => {
                  Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }}
              >
                <View style={styles.cardIcon}>
                  <FontAwesome5 name="bullseye" size={20} color="#FFD700" />
                </View>
                <Text style={styles.cardTitle}>Visión</Text>
                <Text style={styles.cardText}>
                  Liderar la oferta de servicios que genera ODR Ecuador a nivel Internacional hasta el 2030.
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          <View style={styles.heroImage}>
            <Image 
              source={{ uri: 'https://odrecuador.com/assets/img/list/imagen-odr-altern.webp' }} 
              style={styles.professionalImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Sección de objetivos con diseño mejorado */}
        <View style={styles.objectivesSection}>
          <Text style={styles.objectivesHeader}>Conoce nuestros objetivos</Text>
          
          <View style={styles.objectivesContainer}>
            <Animated.View 
              style={[
                styles.objectiveColumn,
                { opacity: fadeAnim }
              ]}
            >
              <Text style={styles.objectiveTitle}>Objetivos principales</Text>
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveText}>
                  Promover la utilización de MASC a nuestros clientes y, usuarios a través de la red de Centros ODR-E.
                </Text>
              </View>
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveText}>
                  Generar espacios de difusión, capacitación y, trabajo de los servicios que brindamos en ODR-E.
                </Text>
              </View>
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveText}>
                  Incentivar la transformación de la sociedad conflictiva a colaborativa, para armonizar la convivencia social y pacífica.
                </Text>
              </View>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.objectiveColumn,
                { opacity: fadeAnim }
              ]}
            >
              <Text style={styles.objectiveTitle}>Objetivos específicos</Text>
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveText}>
                  Designar administradores de las Oficinas Dependientes de la Red de Centros de Arbitraje ODR-Ecuador para promover la utilización de los MASC a nuestros clientes y usuarios.
                </Text>
              </View>
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveText}>
                  Prestar servicios académicos, formación y arbitraje a través de la red de Centros, con la finalidad de fomentar la Cultura de Paz y Justicia Social.
                </Text>
              </View>
              <View style={styles.objectiveCard}>
                <Text style={styles.objectiveText}>
                  Participar activamente en medios de comunicación y redes sociales que propendan orientar la opinión pública sobre los beneficios y ventajas de los MASC, frente a la Justicia y la sociedad.
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
             
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topInfo: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  contactText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#6c757d',
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    marginHorizontal: 8,
  },
  navMenu: {
    backgroundColor: '#343a40',
    paddingVertical: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  navText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  logo: {
    width: 200,
    height: 35,
  },
  menuButton: {
    padding: 5,
  },
  banner: {
    height: 300,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28,62,133,0.8)',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    fontWeight: '300',
  },
  breadcrumb: {
    flexDirection: 'row',
  },
  breadcrumbItem: {
    color: '#fff',
    fontSize: 14,
  },
  breadcrumbSeparator: {
    color: '#fff',
    marginHorizontal: 5,
  },
  breadcrumbActive: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -15,
  },
  col: {
    padding: 15,
    ...Platform.select({
      web: {
        width: '33.333333%',
      },
      default: {
        width: width < 768 ? '100%' : '33.333333%',
      },
    }),
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1c3e85',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1c3e85',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 15,
    color: '#6c757d',
    textAlign: 'justify',
  },
  missionVision: {
    flexDirection: 'column',
  },
  missionItem: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#1c3e85',
  },
  missionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6c757d',
    lineHeight: 20,
  },
  sideImage: {
    width: '100%',
    height: 700,
    borderRadius: 8,
  },
  footer: {
    backgroundColor: '#343a40',
    padding: 20,
  },
  footerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  footerSection: {
    marginBottom: 20,
    ...Platform.select({
      web: {
        width: '25%',
        paddingHorizontal: 15,
      },
      default: {
        width: width < 768 ? '100%' : '25%',
        paddingHorizontal: 15,
      },
    }),
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  socialIconsFooter: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIconFooter: {
    marginRight: 15,
  },
  newsletterForm: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: '#1c3e85',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  subscribeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#6c757d',
    paddingTop: 20,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#fff',
    fontSize: 12,
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25d366',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  chatModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  chatBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 300,
  },
  chatHeader: {
    backgroundColor: '#075e54',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  chatTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chatBody: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  chatBubble: {
    backgroundColor: '#e5f7ef',
    padding: 15,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  chatBubbleText: {
    color: '#000',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f1f1f1',
  },
  chatFooterText: {
    color: '#075e54',
    fontWeight: 'bold',
    marginRight: 10,
  },
  // Nuevos estilos para diseño robusto
  heroSection: {
    flexDirection: width < 768 ? 'column' : 'row',
    backgroundColor: '#f8f9fa',
    padding: 30,
    alignItems: 'center',
    minHeight: 500,
  },
  heroContent: {
    flex: 1,
    paddingRight: width < 768 ? 0 : 30,
    marginBottom: width < 768 ? 30 : 0,
  },
  heroText: {
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 20,
    lineHeight: 36,
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6c757d',
    marginBottom: 15,
    textAlign: 'justify',
  },
  heroSubDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6c757d',
    textAlign: 'justify',
  },
  heroCards: {
    flexDirection: width < 768 ? 'column' : 'row',
    gap: 20,
  },
  missionCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#1c3e85',
    flex: 1,
    alignSelf: 'flex-start',
  },
  visionCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
    flex: 1,
    alignSelf: 'flex-start',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1c3e85',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6c757d',
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  professionalImage: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  objectivesSection: {
    backgroundColor: '#ffffff',
    padding: 30,
  },
  objectivesHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  objectivesContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    gap: 30,
  },
  objectiveColumn: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 25,
    textAlign: 'center',
  },
  objectiveCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1c3e85',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  objectiveText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#495057',
    textAlign: 'justify',
  },
});

export default QuienesSomos;