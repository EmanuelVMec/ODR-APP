import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

// Importar los modales
import CivilModal from '../modal/CivilModal';
import TransitoModal from '../modal/TransitoModal';
import NinezModal from '../modal/NinezModal';
import PenalModal from '../modal/PenalModal';
import LaboralModal from '../modal/LaboralModal';
import InquilinatoModal from '../modal/InquilinatoModal';
import ComunitarioModal from '../modal/ComunitarioModal';
import TributarioModal from '../modal/TributarioModal';

const Inicio: React.FC = () => {
  // Estado para noticias y noticia actual
  const [noticias, setNoticias] = useState([
    // Noticias de ejemplo iniciales, se reemplazarán al obtener del backend
    {
      titulo: 'ODR Ecuador participa en congreso internacional de mediación',
      fecha: '15 de septiembre de 2025',
      desc: 'Nuestro equipo expuso sobre innovación en métodos alternativos de solución de conflictos en el evento realizado en Quito.'
    },
    {
      titulo: 'Nueva alianza con universidades',
      fecha: '10 de septiembre de 2025',
      desc: 'Firmamos convenios para fortalecer la formación en mediación y arbitraje en Ecuador.'
    },
    {
      titulo: 'Lanzamiento de plataforma digital',
      fecha: '1 de septiembre de 2025',
      desc: 'Presentamos nuestra nueva plataforma para gestión de casos de mediación en línea.'
    }
  ]);
  const [noticiaActual, setNoticiaActual] = useState(0);
  const [loadingNoticias, setLoadingNoticias] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  // Preparado para obtener noticias de un backend
  useEffect(() => {
    // Descomenta y ajusta la URL de tu backend:
    // setLoadingNoticias(true);
    // fetch('https://tu-backend.com/api/noticias')
    //   .then(res => res.json())
    //   .then(data => {
    //     setNoticias(data);
    //     setNoticiaActual(0);
    //   })
    //   .catch(err => console.error('Error cargando noticias', err))
    //   .finally(() => setLoadingNoticias(false));
  }, []);

  const handlePrev = () => {
    setNoticiaActual((prev) => (prev === 0 ? noticias.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setNoticiaActual((prev) => (prev === noticias.length - 1 ? 0 : prev + 1));
  };
  const navigation = useNavigation();
  // Animación de pulso para los íconos de estadísticas y valores
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Animaciones de entrada para el logo/icono
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoTranslateY = useRef(new Animated.Value(-20)).current;
  
  useEffect(() => {
    // Animación de pulso para estadísticas
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.13,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animación de entrada para el logo - más elegante y suave
    Animated.sequence([
      Animated.delay(300), // Pequeña pausa antes de comenzar
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 80,
          friction: 12,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ]).start();
  }, [pulseAnim, logoOpacity, logoScale, logoTranslateY]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
      {/* Banner superior */}
      <View style={styles.bannerContainer}>
        <Animated.Image 
          source={require('../assets/icon.png')} 
          style={[
            styles.bannerImgFull,
            {
              opacity: logoOpacity,
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY }
              ]
            }
          ]} 
        />
      </View>

      {/* Layout principal tipo grid */}
      <View style={styles.mainRow}>
        {/* Columna izquierda: efectividad y mensaje */}
        <View style={styles.leftCol}>
          <Text style={styles.efectividadPorcentaje}>99%</Text>
          <Text style={styles.efectividadLabel}>Efectividad</Text>
          <Text style={styles.tituloPrincipal}>Impulsamos la cultura de paz en el Ecuador</Text>
          <Text style={styles.descripcion}>
            ODR-Ecuador aporta a la sociedad en la construcción de una cultura de paz y desarrollo sostenible, a través de la capacitación y la investigación junto con la educación en mediación busca que los conflictos sean resueltos de una manera más pacífica, eficaz y efectiva.
          </Text>
          <TouchableOpacity
            style={styles.leerMasBtn}
            onPress={() => {
              const unique = Date.now();
              if (navigation.getState && navigation.getState().routes) {
                const state = navigation.getState();
                const currentRoute = state.routes[state.index];
                if (currentRoute.name === 'ODR') {
                  navigation.setParams({ tab: 'Quienes somos', unique });
                  return;
                }
              }
              navigation.navigate('ODR', { tab: 'Quienes somos', unique });
            }}
          >
            <Text style={styles.leerMasBtnText}>Leer más</Text>
          </TouchableOpacity>
        </View>
        {/* Columna derecha: tarjetas con íconos */}
        <View style={styles.rightCol}>
          <View style={styles.cardCaracteristica}>
            <FontAwesome5 name="award" size={28} color="#FFD600" style={styles.cardIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>Formación académica</Text>
              <Text style={styles.cardDesc}>Impartida por docentes especializados en Métodos Alternativos de Solución de Conflictos (MASC)</Text>
            </View>
          </View>
          <View style={styles.cardCaracteristica}>
            <Ionicons name="people" size={28} color="#FFD600" style={styles.cardIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>Equipo multidisciplinario</Text>
              <Text style={styles.cardDesc}>Mediadores, negociadores, conciliadores, árbitros, abogados, contadores y TIC's con vasta experiencia</Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 16, color: '#183A7C', fontWeight: 'bold', textAlign: 'center', flex: 1, marginBottom: 10, marginTop: 0 }}>Contamos con</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 4 }}>
            <FontAwesome5 name="building" size={24} color="#007AFF" />
          </Animated.View>
          <Text style={styles.statValue}>65</Text>
          <Text style={styles.statLabel}>Oficinas Dependientes</Text>
        </View>
        <View style={styles.statBox}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 4 }}>
            <MaterialCommunityIcons name="account-group" size={24} color="#007AFF" />
          </Animated.View>
          <Text style={styles.statValue}>1200</Text>
          <Text style={styles.statLabel}>Mediadores Formados</Text>
        </View>
        <View style={styles.statBox}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 4 }}>
            <Ionicons name="globe-outline" size={24} color="#007AFF" />
          </Animated.View>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>ODR Internacionales</Text>
        </View>
        <View style={styles.statBox}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 4 }}>
            <FontAwesome5 name="file-alt" size={24} color="#007AFF" />
          </Animated.View>
          <Text style={styles.statValue}>7000</Text>
          <Text style={styles.statLabel}>Actas de Mediac</Text>
        </View>
      </View>

      {/* ¿Por qué elegirnos? */}
      <View style={styles.whyContainer}>
        <Text style={styles.whyTitleSmall}>¿Por qué elegirnos?</Text>
        <Text style={styles.whyTitle}>Nuestros valores y profesionalismo nos diferencian</Text>
        <Text style={styles.whyDesc}>
          Somos un equipo de mediadores profesionales multidisciplinarios; entre ellos negociadores, árbitros, con vasta experiencia resolviendo conflictos en vía extrajudicial como judicial.
        </Text>
        {/* Grilla de valores */}
        <View style={styles.valuesGrid}>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <FontAwesome5 name="balance-scale" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Honestidad</Text>
          </View>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <MaterialCommunityIcons name="message-bulleted" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Fidelidad</Text>
          </View>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <FontAwesome5 name="users" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Solidaridad</Text>
          </View>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <FontAwesome5 name="lock" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Confidencialidad</Text>
          </View>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <FontAwesome5 name="gavel" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Imparcialidad</Text>
          </View>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <FontAwesome5 name="check-circle" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Capacidad demostrada</Text>
          </View>
          <View style={styles.valueCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 8 }}>
              <FontAwesome5 name="graduation-cap" size={26} color="#fff" style={styles.valueIcon} />
            </Animated.View>
            <Text style={styles.valueText}>Capacitación permanente</Text>
          </View>
        </View>
      </View>

      {/* <SignOutButton /> */}
      {/* Apartado de Últimas Noticias con carrusel */}
      <View style={styles.newsSection}>
        <Text style={styles.newsTitle}>Últimas Noticias</Text>
        <View style={styles.newsCarousel}>
          <TouchableOpacity onPress={handlePrev} style={styles.arrowBtn} disabled={loadingNoticias || noticias.length === 0}>
            <Text style={styles.arrowText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.newsItem}>
            {loadingNoticias || noticias.length === 0 ? (
              <Text style={{ textAlign: 'center', color: '#888' }}>Cargando noticias...</Text>
            ) : (
              <>
                <Text style={styles.newsItemTitle}>{noticias[noticiaActual].titulo}</Text>
                <Text style={styles.newsItemDate}>{noticias[noticiaActual].fecha}</Text>
                <Text style={styles.newsItemDesc}>{noticias[noticiaActual].desc}</Text>
              </>
            )}
          </View>
          <TouchableOpacity onPress={handleNext} style={styles.arrowBtn} disabled={loadingNoticias || noticias.length === 0}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nuestros servicios (justo debajo de noticias) */}
      <View style={styles.serviciosSection}>
        <Text style={styles.serviciosTitle}>Nuestros servicios</Text>
        <Text style={styles.serviciosSubtitle}>Servicios que ofrecemos a nuestros clientes</Text>
        <View style={styles.serviciosGrid}>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('civil')}>
            <FontAwesome5 name="balance-scale" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Civil</Text>
            <Text style={styles.servicioDesc}>Demarcación de linderos, partición voluntaria de bienes sucesorios, partición de la extinta sociedad conyugal, entre otros.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('transito')}>
            <MaterialCommunityIcons name="car" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Tránsito</Text>
            <Text style={styles.servicioDesc}>Lesiones, daños materiales e indemnizaciones.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('ninez')}>
            <FontAwesome5 name="child" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Niñez y Adolescencia</Text>
            <Text style={styles.servicioDesc}>Alimentación, Paternidad, Ayuda prenatal, Tenencia, Regulación de visitas, incremento y/o rebaja de pensión alimenticia.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('penal')}>
            <FontAwesome5 name="gavel" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Penal</Text>
            <Text style={styles.servicioDesc}>Delitos sancionados con pena máxima privativa de libertad de hasta cinco años.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('laboral')}>
            <FontAwesome5 name="briefcase" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Laboral</Text>
            <Text style={styles.servicioDesc}>Forma de pago de liquidación laboral, Forma de pago de jubilación patronal.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('inquilinato')}>
            <FontAwesome5 name="home" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Inquilinato</Text>
            <Text style={styles.servicioDesc}>Pago de cánones de arrendamientos atrasados, Desocupación del inmueble.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('comunitario')}>
            <FontAwesome5 name="users" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Comunitario, usuarios y consumidores</Text>
            <Text style={styles.servicioDesc}>Uso de áreas comunales, Respeto de normas de convivencia comunitaria (Estatutos y Reglamentos), Daños y perjuicios de ínfima cuantía.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicioCard} onPress={() => setModal('tributario')}>
            <FontAwesome5 name="file-invoice-dollar" size={28} color="#183A7C" style={styles.servicioIcon} />
            <Text style={styles.servicioNombre}>Tributario</Text>
            <Text style={styles.servicioDesc}>Determinación de la obligación tributaria, sus intereses, recargos y multas; respecto de los plazos y facilidades de pago de la obligación tributaria a recaudar.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

    {/* Modales */}
    {modal === 'civil' && <CivilModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'transito' && <TransitoModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'ninez' && <NinezModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'penal' && <PenalModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'laboral' && <LaboralModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'inquilinato' && <InquilinatoModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'comunitario' && <ComunitarioModal visible={true} onClose={() => setModal(null)} />}
    {modal === 'tributario' && <TributarioModal visible={true} onClose={() => setModal(null)} />}
    </>
  );
};

const styles = StyleSheet.create({
  newsCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  arrowBtn: {
    backgroundColor: '#183A7C',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  arrowText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newsSection: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginTop: 18,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  newsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 10,
    textAlign: 'center',
  },
  newsList: {
    width: '100%',
    gap: 14,
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  newsItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#183A7C',
    marginBottom: 2,
  },
  newsItemDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  newsItemDesc: {
    fontSize: 14,
    color: '#444',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
    justifyContent: 'center',
  },
  bannerImgFull: {
    width: '70%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  mainRow: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 18,
    gap: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCol: {
    flex: 1,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  efectividadPorcentaje: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD600',
    lineHeight: 52,
    marginBottom: 0,
    textAlign: 'center',
    alignSelf: 'center',
  },
  efectividadLabel: {
    fontSize: 16,
    color: '#1a237e',
    marginBottom: 12,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
    alignSelf: 'center',
  },
  descripcion: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
  leerMasBtn: {
    backgroundColor: '#183A7C',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  leerMasBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  rightCol: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 18,
    alignItems: 'center',
  },
  cardCaracteristica: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    gap: 10,
    justifyContent: 'center',
  },
  cardIcon: {
    marginRight: 10,
    marginTop: 2,
    alignSelf: 'center',
  },
  cardTitulo: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#183A7C',
    marginBottom: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
  cardDesc: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 18,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    alignSelf: 'center',
  },
  whyContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 18,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  whyTitleSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 4,
    textAlign: 'center',
    alignSelf: 'center',
  },
  whyTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 8,
    textAlign: 'center',
    alignSelf: 'center',
  },
  whyDesc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    maxWidth: 600,
    textAlign: 'center',
    alignSelf: 'center',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    width: '100%',
    alignItems: 'center',
  },
  valueCard: {
    backgroundColor: '#27408B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 4,
    minWidth: 90,
    minHeight: 80,
    flexBasis: '28%',
    flexGrow: 1,
    shadowColor: '#FFD600',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 1,
  },
  valueIcon: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  valueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  serviciosSection: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginTop: 18,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  serviciosTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviciosSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  serviciosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  servicioCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '45%',
    maxWidth: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  servicioIcon: {
    marginBottom: 8,
  },
  servicioNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 6,
    textAlign: 'center',
  },
  servicioDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default Inicio;
