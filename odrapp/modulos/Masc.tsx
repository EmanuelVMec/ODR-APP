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
  Modal,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Masc = () => {
  const navigation = useNavigation();
  const [whatsappModalVisible, setWhatsappModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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

    // Animación de rotación continua para la balanza
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
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

    const message = `Hola, necesito información sobre servicios de Arbitraje y Conciliación. Mi email: ${email}`;
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
    setEmailError('');
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error al abrir enlace:', err));
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // Ir directo al tab de AgendarArbitraje en ODRScreen
  const goToAgendarArbitraje = () => {
    navigation.navigate('ODR', { tab: 'Cursos' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#1c3e85" />
      
      {/* Hero Banner con diseño MASC único */}
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
          source={{ uri: 'https://odrec.org/wp-content/uploads/2024/09/Banner-7.jpg' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <View style={styles.breadcrumb}>
            </View>
            
            <View style={styles.titleContainer}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <FontAwesome5 name="balance-scale" size={40} color="#FFD700" />
              </Animated.View>
              <Text style={styles.heroTitle}>
                Métodos Alternativos de{'\n'}Solución de Conflictos
              </Text>
            </View>
            
            <Text style={styles.heroSubtitle}>
              Resuelve tus disputas de manera eficiente y confidencial
            </Text>
            
            <View style={styles.servicesBadges}>
              <View style={styles.badge}>
                <FontAwesome5 name="gavel" size={12} color="#1c3e85" />
                <Text style={styles.badgeText}>Arbitraje</Text>
              </View>
              <View style={styles.badge}>
                <FontAwesome5 name="users" size={12} color="#1c3e85" />
                <Text style={styles.badgeText}>Conciliación</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Información Principal */}
      <Animated.View 
        style={[
          styles.mainInfoSection,
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <FontAwesome5 name="info-circle" size={24} color="#1c3e85" />
            <Text style={styles.infoTitle}>¿Qué son los MASC?</Text>
          </View>
          <Text style={styles.infoDescription}>
            Los Métodos Alternativos de Solución de Conflictos (MASC) son procedimientos que permiten 
            resolver disputas de manera eficiente, confidencial y menos costosa que los procesos judiciales 
            tradicionales. En ODR Ecuador ofrecemos arbitraje, mediación y conciliación con los más altos 
            estándares de calidad y profesionalismo.
          </Text>
        </View>
      </Animated.View>

      {/* Servicios MASC - Solo Arbitraje y Conciliación */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Nuestros Servicios</Text>
        <Text style={styles.sectionSubtitle}>
          Selecciona el método que mejor se adapte a tus necesidades
        </Text>
        
        <View style={styles.servicesGrid}>
          {/* Arbitraje */}
          <Animated.View 
            style={[
              styles.serviceCard,
              styles.arbitrajeCard,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.serviceIconContainer}>
              <FontAwesome5 name="gavel" size={32} color="#ffffff" />
            </View>
            <Text style={styles.serviceTitle}>Arbitraje</Text>
            <Text style={styles.serviceDescription}>
              Proceso de resolución de conflictos donde un árbitro imparcial emite una decisión vinculante.
            </Text>
            <View style={styles.serviceFeatures}>
              <Text style={styles.featureItem}>• Decisión vinculante y definitiva</Text>
              <Text style={styles.featureItem}>• Proceso confidencial</Text>
              <Text style={styles.featureItem}>• Especialización técnica</Text>
              <Text style={styles.featureItem}>• Mayor rapidez que tribunales</Text>
            </View>
          </Animated.View>

          {/* Conciliación */}
          <Animated.View 
            style={[
              styles.serviceCard,
              styles.conciliacionCard,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.serviceIconContainer}>
              <FontAwesome5 name="users" size={32} color="#ffffff" />
            </View>
            <Text style={styles.serviceTitle}>Conciliación</Text>
            <Text style={styles.serviceDescription}>
              Método donde un conciliador propone soluciones para resolver el conflicto.
            </Text>
            <View style={styles.serviceFeatures}>
              <Text style={styles.featureItem}>• Propuestas de solución</Text>
              <Text style={styles.featureItem}>• Proceso ágil</Text>
              <Text style={styles.featureItem}>• Orientación profesional</Text>
              <Text style={styles.featureItem}>• Acuerdos mutuos</Text>
            </View>
          </Animated.View>
        </View>
      </View>

        {/* Botones de enlace mejorados */}
        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Documentos y Recursos</Text>
          <Text style={styles.sectionSubtitle}>
            Accede a la documentación oficial y herramientas necesarias
          </Text>
          
          <View style={styles.documentsGrid}>
            <TouchableOpacity 
              style={styles.documentCard}
              onPress={() => openLink('https://drive.google.com/file/d/1SxydYW8dRt49VHosjG1-ZOJMUFGEdKWW/view?usp=sharing')}
            >
              <View style={styles.documentIcon}>
                <FontAwesome5 name="file-pdf" size={24} color="#e74c3c" />
              </View>
              <Text style={styles.documentTitle}>Reglamento</Text>
              <Text style={styles.documentDescription}>
                Reglamento completo del Centro de Arbitraje ODR-E
              </Text>
              <View style={styles.downloadButton}>
                <FontAwesome5 name="download" size={12} color="#ffffff" />
                <Text style={styles.downloadText}>Descargar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.documentCard}
              onPress={() => openLink('https://docs.google.com/spreadsheets/d/10SHYSjMMPFoXRtnat9_5RnB_MHuCHD-P/edit?usp=sharing&ouid=109161900150982709425&rtpof=true&sd=true')}
            >
              <View style={styles.documentIcon}>
                <FontAwesome5 name="users-cog" size={24} color="#3498db" />
              </View>
              <Text style={styles.documentTitle}>Árbitros</Text>
              <Text style={styles.documentDescription}>
                Listado oficial de árbitros y secretarios arbitrales
              </Text>
              <View style={styles.downloadButton}>
                <FontAwesome5 name="download" size={12} color="#ffffff" />
                <Text style={styles.downloadText}>Descargar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.documentCard}
              onPress={() => openLink('https://drive.google.com/file/d/1QpGikmpg38j0XRSs-9rv-Ft6ktXOgG_y/view?usp=sharing')}
            >
              <View style={styles.documentIcon}>
                <FontAwesome5 name="calculator" size={24} color="#27ae60" />
              </View>
              <Text style={styles.documentTitle}>Tarifas</Text>
              <Text style={styles.documentDescription}>
                Tarifario oficial del Centro de Arbitraje
              </Text>
              <View style={styles.downloadButton}>
                <FontAwesome5 name="download" size={12} color="#ffffff" />
                <Text style={styles.downloadText}>Descargar</Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity 
              style={styles.documentCard}
              onPress={() => openLink('https://drive.google.com/file/d/14UJbymsFRHFPTNEKkS4p2p8JHiYN2B_e/view?usp=sharing')}
            >
              <View style={styles.documentIcon}>
                <FontAwesome5 name="university" size={24} color="#1c3e85" />
              </View>
              <Text style={styles.documentTitle}>Centro Oficial Registrado</Text>
              <Text style={styles.documentDescription}>
                #18 EN EL REGISTRO NACIONAL. Reconocido oficialmente por la Función Judicial del Ecuador
              </Text>
              <View style={styles.downloadButton}>
                <FontAwesome5 name="download" size={12} color="#ffffff" />
                <Text style={styles.downloadText}>Descargar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, alignSelf: 'center' }}
              onPress={() => openLink('https://www.funcionjudicial.gob.ec/registro-centros-arbitraje/centros-de-arbitraje-aprobados-por-el-pleno/')}
            >
              <Text style={{ fontSize: 15, color: '#1c3e85', fontWeight: 'bold', marginRight: 6 }}>🔍 Verificar en</Text>
              <Text style={{ fontSize: 15, color: '#1c3e85', textDecorationLine: 'underline' }}>www.funcionjudicial.gob.ec</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección: Capacidad para transigir */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ¿Se podrá someterse al arbitraje las personas naturales o jurídicas que tengan capacidad para transigir?
          </Text>
          <View style={styles.twoColumnLayout}>
            <View style={{flex: 1}}>
              <Text style={styles.sectionText}>
                Tanto las personas naturales como las personas jurídicas que tengan capacidad legal para transigir pueden someterse al arbitraje.
              </Text>
              <Text style={styles.sectionText}>
                En otras palabras, toda persona sea individual o representando a una entidad legal que esté facultada por la ley para celebrar acuerdos y resolver conflictos mediante la transacción, también puede optar por el arbitraje como medio alternativo para resolver sus disputas.
              </Text>
              <Text style={styles.sectionText}>
                Este principio está reconocido en muchas legislaciones y normas de arbitraje, que establecen como requisito básico para someterse al arbitraje la capacidad de las partes para transigir.
              </Text>
            </View>
          </View>
        </View>

        {/* Proceso MASC - Sin Mediación Previa */}
        <View style={styles.processSection}>
          <Text style={styles.sectionTitle}>¿Cómo funciona el proceso?</Text>
          <Text style={styles.sectionSubtitle}>
            Pasos para resolver tu conflicto de manera efectiva
          </Text>
          
          <View style={styles.processSteps}>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Solicitud</Text>
                <Text style={styles.stepDescription}>
                  La parte actora debe presentar su demanda arbitral ante el Director del Centro de Arbitraje ODR Ecuador.
                </Text>
              </View>
              <FontAwesome5 name="file-alt" size={20} color="#1c3e85" />
            </View>

            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Designación de Árbitros</Text>
                <Text style={styles.stepDescription}>
                  Se les notificará la lista de nuestros árbitros y se realizará una diligencia para el sorteo.
                </Text>
              </View>
              <FontAwesome5 name="users" size={20} color="#1c3e85" />
            </View>

            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Audiencia de Sustanciación</Text>
                <Text style={styles.stepDescription}>
                  Posesionados los árbitros, se convocará a Audiencia de Sustanciación, en la que el Tribunal Arbitral se declarará competente y ordenará la práctica de las pruebas.
                </Text>
              </View>
              <FontAwesome5 name="gavel" size={20} color="#1c3e85" />
            </View>

            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Resolución</Text>
                <Text style={styles.stepDescription}>
                  Luego de evacuar las pruebas, se podrá convocar a una audiencia de estrados y se concluirá con la Audiencia de Lectura de Laudo.
                </Text>
              </View>
              <FontAwesome5 name="trophy" size={20} color="#1c3e85" />
            </View>
          </View>
        </View>

        {/* Contacto y WhatsApp */}
        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <FontAwesome5 name="comments" size={28} color="#1c3e85" />
            <Text style={styles.contactTitle}>¿Necesitas más información?</Text>
            <Text style={styles.contactSubtitle}>
              Contáctanos directamente y te asesoraremos sobre el mejor método para tu caso
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={() => {
              const phoneNumber = '593994795695';
              const message = encodeURIComponent('Hola, necesito información sobre servicios de Arbitraje y Conciliación.');
              const url = `https://wa.me/${phoneNumber}?text=${message}`;
              Linking.openURL(url).catch(err => Alert.alert('Error', 'No se pudo abrir WhatsApp.'));
            }}
          >
            <FontAwesome5 name="whatsapp" size={20} color="#ffffff" />
            <Text style={styles.whatsappButtonText}>Consultar por WhatsApp</Text>
            <FontAwesome5 name="arrow-right" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Modal de WhatsApp Mejorado */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={whatsappModalVisible}
          onRequestClose={() => setWhatsappModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.modalHeader}>
                <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
                <Text style={styles.modalTitle}>Contactar por WhatsApp</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setWhatsappModalVisible(false)}
                >
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalDescription}>
                Te conectaremos con nuestro equipo especializado en Arbitraje y Conciliación. Por favor, 
                ingresa tu email para un mejor seguimiento.
              </Text>
              
              <TextInput
                style={[styles.emailInput, emailError ? styles.emailInputError : {}]}
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
              
              <TouchableOpacity style={styles.sendButton} onPress={handleWhatsApp}>
                <FontAwesome5 name="paper-plane" size={16} color="#ffffff" />
                <Text style={styles.sendButtonText}>Enviar Consulta</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

        {/* Formación Académica - Solo Arbitraje y Conciliación */}
        <View style={styles.academicSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="graduation-cap" size={28} color="#1c3e85" />
            <Text style={styles.sectionTitle}>Formación Académica</Text>
            <Text style={styles.sectionSubtitle}>
              Capacítate con los mejores profesionales en métodos alternativos de resolución de conflictos
            </Text>
          </View>

          <View style={styles.trainingGrid}>
            <View style={styles.trainingCard}>
              <View style={styles.trainingIconContainer}>
                <FontAwesome5 name="certificate" size={24} color="#ffffff" />
              </View>
              <Text style={styles.trainingTitle}>Certificación en Arbitraje</Text>
              <Text style={styles.trainingDescription}>
                Programa integral de formación para árbitros con reconocimiento nacional e internacional.
              </Text>
              <View style={styles.trainingFeatures}>
                <View style={styles.trainingFeatureItem}>
                  <MaterialIcons name="schedule" size={16} color="#1c3e85" />
                  <Text style={styles.trainingFeatureText}>120 horas académicas</Text>
                </View>
                <View style={styles.trainingFeatureItem}>
                  <MaterialIcons name="people" size={16} color="#1c3e85" />
                  <Text style={styles.trainingFeatureText}>Modalidad presencial y virtual</Text>
                </View>
                <View style={styles.trainingFeatureItem}>
                  <MaterialIcons name="verified" size={16} color="#1c3e85" />
                  <Text style={styles.trainingFeatureText}>Certificación válida</Text>
                </View>
              </View>
            </View>

            <View style={styles.trainingCard}>
              <View style={[styles.trainingIconContainer, { backgroundColor: '#27ae60' }]}>
                <FontAwesome5 name="balance-scale" size={24} color="#ffffff" />
              </View>
              <Text style={styles.trainingTitle}>Conciliación Especializada</Text>
              <Text style={styles.trainingDescription}>
                Especialización en técnicas de conciliación para diferentes áreas del derecho.
              </Text>
              <View style={styles.trainingFeatures}>
                <View style={styles.trainingFeatureItem}>
                  <MaterialIcons name="schedule" size={16} color="#1c3e85" />
                  <Text style={styles.trainingFeatureText}>60 horas académicas</Text>
                </View>
                <View style={styles.trainingFeatureItem}>
                  <MaterialIcons name="gavel" size={16} color="#1c3e85" />
                  <Text style={styles.trainingFeatureText}>Casos prácticos</Text>
                </View>
                <View style={styles.trainingFeatureItem}>
                  <MaterialIcons name="school" size={16} color="#1c3e85" />
                  <Text style={styles.trainingFeatureText}>Docentes expertos</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.enrollButton} onPress={goToAgendarArbitraje}>
            <FontAwesome5 name="user-plus" size={18} color="#ffffff" />
            <Text style={styles.enrollButtonText}>Inscribirse Ahora</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Why Choose ODR Section */}
        <View style={styles.whyChooseSection}>
          <Text style={styles.sectionTitle}>¿Por qué elegir ODR Ecuador?</Text>
          <Text style={styles.sectionSubtitle}>
            Somos líderes en métodos alternativos de solución de conflictos
          </Text>

          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <FontAwesome5 name="award" size={28} color="#FFD700" />
              </View>
              <Text style={styles.benefitTitle}>Experiencia Comprobada</Text>
              <Text style={styles.benefitDescription}>
                Más de 10 años resolviendo conflictos con éxito en Ecuador
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <FontAwesome5 name="users-cog" size={28} color="#3498db" />
              </View>
              <Text style={styles.benefitTitle}>Profesionales Certificados</Text>
              <Text style={styles.benefitDescription}>
                Equipo de árbitros y mediadores altamente calificados
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <FontAwesome5 name="clock" size={28} color="#27ae60" />
              </View>
              <Text style={styles.benefitTitle}>Rapidez en Resolución</Text>
              <Text style={styles.benefitDescription}>
                Procesos ágiles que ahorran tiempo y recursos
              </Text>
            </View>

            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <FontAwesome5 name="shield-alt" size={28} color="#e74c3c" />
              </View>
              <Text style={styles.benefitTitle}>Confidencialidad Total</Text>
              <Text style={styles.benefitDescription}>
                Garantizamos la privacidad en todos nuestros procesos
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Nuestros Resultados</Text>
          <Text style={styles.sectionSubtitle}>
            Cifras que respaldan nuestra experiencia y profesionalismo
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Casos Resueltos</Text>
              <FontAwesome5 name="gavel" size={24} color="#1c3e85" />
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Tasa de Éxito</Text>
              <FontAwesome5 name="chart-line" size={24} color="#27ae60" />
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Días Promedio</Text>
              <FontAwesome5 name="clock" size={24} color="#3498db" />
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Confidencialidad</Text>
              <FontAwesome5 name="shield-alt" size={24} color="#e74c3c" />
            </View>
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Hero Section Styles
  heroSection: {
    height: height * 0.5,
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
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '500',
  },
  servicesBadges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 320,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: '#1c3e85',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  // Main Info Section
  mainInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginLeft: 10,
  },
  infoDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },

  // Services Section
  servicesSection: {
    paddingHorizontal: 20,
    paddingBottom: 25,
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
    marginBottom: 25,
    lineHeight: 20,
  },
  servicesGrid: {
    gap: 15,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  arbitrajeCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c',
  },
  conciliacionCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#27ae60',
  },
  serviceIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1c3e85',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  serviceFeatures: {
    alignSelf: 'stretch',
  },
  featureItem: {
    fontSize: 13,
    color: '#1c3e85',
    marginBottom: 5,
    fontWeight: '500',
  },

  // Documents Section
  documentsSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#ffffff',
  },
  documentsGrid: {
    gap: 15,
  },
  documentCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
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
  documentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginBottom: 8,
  },
  documentDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c3e85',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  downloadText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },

  // Legacy section styles for existing content
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 12,
    textAlign: 'justify',
  },
  twoColumnLayout: {
    flexDirection: 'row',
    marginTop: 16,
  },
  textColumn: {
    flex: 1,
    paddingRight: 16,
  },
  imageColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },

  // Process Section
  processSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#f8f9fa',
  },
  processSteps: {
    gap: 15,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
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
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1c3e85',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // Contact Section
  contactSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  whatsappButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
    maxWidth: 380,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginLeft: 10,
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
  emailInput: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  emailInputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 20,
    marginTop: -15,
    textAlign: 'center',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 15,
    borderRadius: 15,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Academic Section Styles
  academicSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  trainingGrid: {
    gap: 20,
    marginBottom: 30,
  },
  trainingCard: {
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
  trainingIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1c3e85',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginBottom: 10,
  },
  trainingDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  trainingFeatures: {
    gap: 10,
  },
  trainingFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainingFeatureText: {
    fontSize: 13,
    color: '#1c3e85',
    marginLeft: 8,
    fontWeight: '500',
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c3e85',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
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
  enrollButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },

  // Why Choose Section
  whyChooseSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  benefitCard: {
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
  benefitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c3e85',
    textAlign: 'center',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Contact Info Section
  contactInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
  },
  contactDetails: {
    gap: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
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
  contactIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c3e85',
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // Statistics Section
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#1c3e85',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  statCard: {
    width: (width - 55) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },

  // ...existing styles...
  
  // ...existing styles...
});

export default Masc;