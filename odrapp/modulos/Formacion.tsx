import React, { useState, useEffect, useRef } from 'react';
import {
  View,  Text,  Image,
  ScrollView,  TouchableOpacity,
  Linking,  StyleSheet,
  SafeAreaView,  Platform,
  StatusBar,  Dimensions,
  Animated,  Modal,
  Alert
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Formacion = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  
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

  // Función para manejar la navegación a enlaces externos
  const handleExternalLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Error al abrir el enlace:", err));
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/593994795695');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Banner principal mejorado */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: 'https://odrecuador.com/assets/img/banner/banner-formacion.webp' }}
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
            <Text style={styles.bannerTitle}>Formación Académica</Text>
            <Text style={styles.bannerSubtitle}>Centro de Arbitraje ODR Ecuador</Text>
            <View style={styles.breadcrumbContainer}>
              
            </View>
          </Animated.View>
        </View>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        {/* Sección de introducción con diseño robusto */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Formación Académica en Resolución de Conflictos</Text>
            <Text style={styles.heroDescription}>
              Formar Árbitros para cumplir nuevos roles de convivencia e integración desde las herramientas tecnológicas aplicables como videoconferencias o teleconferencias, que están al servicio de la sociedad para materializar los MASC.
            </Text>
            
            {/* Cards de características */}
            <View style={styles.featuresGrid}>
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
                activeOpacity={0.8}
              >
                <FontAwesome5 name="clock" size={20} color="#FFD700" />
                <Text style={styles.featureTitle}>200 Horas</Text>
                <Text style={styles.featureText}>Académicas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
                activeOpacity={0.8}
              >
                <FontAwesome5 name="certificate" size={20} color="#FFD700" />
                <Text style={styles.featureTitle}>Certificación</Text>
                <Text style={styles.featureText}>Oficial</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.featureCard,
                  { transform: [{ scale: scaleAnim }] }
                ]}
                activeOpacity={0.8}
              >
                <FontAwesome5 name="laptop" size={20} color="#FFD700" />
                <Text style={styles.featureTitle}>Virtual y Presencial</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formación Académica</Text>
        
          
          <Text style={styles.subtitle}>Objetivo general</Text>
          <Text style={styles.paragraph}>
            Formar Árbitros para cumplir nuevos roles de convivencia e integración desde las herramientas tecnológicas aplicables como videoconferencias o teleconferencias, que están al servicio de la sociedad para materializar los MASC.
          </Text>
          
          <Text style={styles.subtitle}>Objetivos específicos</Text>
          <View style={styles.objectivesContainer}>
            <View style={styles.objectivesText}>
              <Text style={styles.paragraph}>• Construir la posición de árbitro operador comprometido y neutral.</Text>
              <Text style={styles.paragraph}>• Lograr un correcto desarrollo comunicacional en línea y, una práctica eficaz de los MASC.</Text>
              <Text style={styles.paragraph}>• Estimular el desarrollo de habilidades tecnológicas para el desempeño del rol de árbitro.</Text>
              <Text style={styles.paragraph}>• Estimular el conocimiento de diversas plataformas (APPS de video conferencia y telecomunicaciones) en situaciones de entorno virtual.</Text>
              <Text style={styles.paragraph}>• Explorar nuevas estrategias como soluciones a los problemas que presenta cotidianamente la práctica profesional de árbitros.</Text>
            </View>
            <Image 
              source={{ uri: 'https://odrecuador.com/assets/img/list/imagen-servicio-ninez.webp' }}
              style={styles.sideImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.twoColumnSection}>
            <View style={styles.column}>
              <Text style={styles.subtitle}>Organizadores y Aval</Text>
              <Text style={styles.paragraph}>
                Organizador del evento de Formación de Árbitros:
                Esta formación estará a cargo del Centro de Arbitraje y Solución de Conflictos Online Dispute Resolution Ecuador (ODR-E), que, para el efecto, Cuenta con el Aval Académico de la Universidad Laica Eloy Alfaro de Manabí (ULEAM).
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.subtitle}>Tipo de formación</Text>
              <Text style={styles.paragraph}>
                La formación propuesta cuya denominación es: "CURSO DE FORMACION DE ÁRBITROS", cuenta con una carga horaria de 200 horas académicas divididas en clases Sincrónicas de 150 horas (75 horas de clases teóricas y 75 horas de clases prácticas) y Asincrónicas (50 horas de trabajo autónomo) para la formación total a desarrollarse en 8 semanas, distribuidas así: 6 semanas asociadas al programa académico teórico y prácticas y 2 semanas asociadas a pasantías, desarrollo de trabajo autónomo y observación de 5 casos reales de arbitraje.
              </Text>
            </View>
          </View>
          
          <Text style={styles.subtitle}>¿Quiénes pueden formarse?</Text>
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: 'https://odrecuador.com/assets/img/list/imagen-servicio-ninez.webp' }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.profileDetails}>
              <View style={styles.profileItem}>
                <FontAwesome5 name="user-plus" size={24} color="#1c3e85" />
                <View style={styles.profileTextContainer}>
                  <Text style={styles.profileTitle}>Perfil de ingreso</Text>
                  <Text style={styles.profileText}>• La/el estudiante debe ser al menos egresado de un centro de educación superior de tercer nivel.</Text>
                  <Text style={styles.profileText}>• La/el estudiante tiene conocimientos mínimos de leyes en el Ecuador, sin que sea necesario ser abogado/a.</Text>
                </View>
              </View>
              <View style={styles.profileItem}>
                <FontAwesome5 name="graduation-cap" size={24} color="#1c3e85" />
                <View style={styles.profileTextContainer}>
                  <Text style={styles.profileTitle}>Perfil de egreso</Text>
                  <Text style={styles.profileText}>• La/el estudiante puede desarrollar procesos de arbitraje con alta satisfacción.</Text>
                  <Text style={styles.profileText}>• La/el estudiante aplica en su profesión habitual los principios de los métodos alternativos de solución de conflictos.</Text>
                  <Text style={styles.profileText}>• La/el estudiante puede desarrollar procesos investigativos complejos.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        
      </ScrollView>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHeader: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'column',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  topNav: {
    backgroundColor: '#343a40',
    padding: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    padding: 5,
  },
  navText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    width: 200,
    height: 35,
    marginRight: 15,
  },
  mainNav: {
    flex: 1,
  },
  mainNavItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mainNavText: {
    color: '#6c757d',
    fontSize: 14,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#1c3e85',
  },
  activeNavText: {
    color: '#1c3e85',
    fontWeight: 'bold',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c3e85',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  ctaText: {
    color: '#fff',
    marginRight: 10,
    fontWeight: 'bold',
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 62, 133, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  breadcrumb: {
    flexDirection: 'row',
  },
  breadcrumbItem: {
    color: '#fff',
  },
  breadcrumbSeparator: {
    color: '#fff',
  },
  breadcrumbActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6c757d',
    marginBottom: 15,
  },
  contentImage: {
    width: '100%',
    height: 200,
    marginVertical: 15,
  },
  objectivesContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  objectivesText: {
    flex: 1,
    paddingRight: 15,
  },
  sideImage: {
    width: 120,
    height: 200,
    borderRadius: 8,
  },
  twoColumnSection: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 200,
    borderRadius: 8,
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  profileItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 5,
  },
  profileText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6c757d',
  },
  footer: {
    backgroundColor: '#343a40',
    padding: 30,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  footerContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  footerSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  footerSocialIcon: {
    marginHorizontal: 10,
  },
  copyright: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  // Nuevos estilos para diseño robusto
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
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 5,
  },
  breadcrumbActiveText: {
    fontWeight: 'bold',
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
  heroSection: {
    backgroundColor: '#f8f9fa',
    padding: 30,
    marginBottom: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 36,
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6c757d',
    marginBottom: 30,
    textAlign: 'justify',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 15,
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
    minWidth: 100,
    flex: 1,
    margin: 5,
    maxWidth: 120,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default Formacion;