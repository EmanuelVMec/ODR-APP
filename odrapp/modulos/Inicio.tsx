import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Dimensions, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const Inicio: React.FC = () => {
  // Animación de pulso para los íconos de estadísticas y valores
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
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
  }, [pulseAnim]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Banner superior */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/icon.png')} style={styles.bannerImgFull} />
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
          <TouchableOpacity style={styles.leerMasBtn} onPress={() => Linking.openURL('https://odrecuador.com/')}> 
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    height: 210,
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
});

export default Inicio;
