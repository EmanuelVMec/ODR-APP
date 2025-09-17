  // Función para abrir WhatsApp con mensaje personalizado según la zona
  const openWhatsAppZona = (phone: string, zona: string) => {
    const message = `Necesito más información sobre la zona ${zona}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error("No se pudo abrir WhatsApp:", err));
  };
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
//import Footer from './Footer';
import PerfilCristianMoraModal from '../PerfilesODR/PerfilCristianMoraModal';
import PerfilDavisDicadoModal from '../PerfilesODR/PerfilDavisDicadoModal';
import PerfilKatherineConformeModal from '../PerfilesODR/PerfilKatherineConformeModal';
import PerfilMarioZambranoModal from '../PerfilesODR/PerfilMarioZambranoModal';
import PerfilHenrySoledispaModal from '../PerfilesODR/PerfilHenrySoledispaModal';
import PerfilAngelNavarreteModal from '../PerfilesODR/PerfilAngelNavarreteModal';
import PerfilJoshuaVincesModal from '../PerfilesODR/PerfilJoshuaVincesModal';
import PerfilAlexandraLucasNaula from '../PerfilesODR/PerfilAlexandraLucasNaula';
import PerfilDavidEspinozaMeraModal from '../PerfilesODR/PerfilDavidEspinozaMeraModal';
import PerfilEduardoLlugdarModal from '../PerfilesODR/PerfilEduardoLlugdarModal';
import PerfilCeliaManzanModal from '../PerfilesODR/PerfilCeliaManzanModal';
import estilisequipo from '../Styles/estilosequipo';
import PerfilMarceloLopezMesaModal from '../PerfilesODR/PerfilMarceloLopezMesaModal';
import PerfilJuanCastanedaModal from '../PerfilesODR/PerfilJuanCastanedaModal';
import PerfilMirellaTonatoModal from '../PerfilesODR/PerfilMirellaTonatoModal';
import PerfilAlexValleFrancoModal from '../PerfilesODR/PerfilAlexValleFrancoModal';
import PerfilLeninArroyoBaltanModal from '../PerfilesODR/PerfilLeninArroyoBaltanModal';
import PerfilAlejandroMontecéGilerModal from '../PerfilesODR/PerfilAlejandroMontecéGilerModal';
import PerfilRoberHidalgoProanoModal from '../PerfilesODR/PerfilRoberHidalgoProanoModal';
import PerfilWilfridoJavierSanchezModal from '../PerfilesODR/PerfilWilfridoJavierSánchezRodríguez';

export default function Equipo() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("No se pudo abrir el enlace:", err));
  };

  // Función para manejar clics en perfiles
  const handleProfilePress = (profileUrl: string) => {
    if (profileUrl) {
      openLink(profileUrl);
    }
  };

  // Estado para mostrar el modal de Cristian Mora
  const [showCristianModal, setShowCristianModal] = useState(false);

  // Estado para mostrar el modal de Davis Dicado
  const [showDavisModal, setShowDavisModal] = useState(false);

  // Estado para mostrar el modal de Katherine Conforme
  const [showKatherineModal, setShowKatherineModal] = useState(false);

  // Estado para mostrar el modal de Mario Zambrano
  const [showMarioModal, setShowMarioModal] = useState(false);

  // Estado para mostrar el modal de Henry Stalyn Soledispa Vera
  const [showHenryModal, setShowHenryModal] = useState(false);

  // Estado para mostrar el modal de Angel Julian Navarrete Cedeño
  const [showAngelModal, setShowAngelModal] = useState(false);

  // Estado para mostrar el modal de Joshua Vinces
  const [showJoshuaModal, setShowJoshuaModal] = useState(false);

  // Estado para mostrar el modal de Alexandra Lucas Naula
  const [showAlexandraModal, setShowAlexandraModal] = useState(false);

  // Estado para mostrar el modal de David Espinoza Mera
  const [showDavidModal, setShowDavidModal] = useState(false);

  // Estado para mostrar el modal de Eduardo Llugdar
  const [showEduardoModal, setShowEduardoModal] = useState(false);

  // Estado para mostrar el modal de Célia Manzan
  const [showCeliaModal, setShowCeliaModal] = useState(false);

  // Estado para mostrar el modal de Marcelo López Mesa
  const [showMarceloModal, setShowMarceloModal] = useState(false);

  // Estado para mostrar el modal de Juan Castañeda
  const [showJuanModal, setShowJuanModal] = useState(false);

  // Estado para mostrar el modal de Mirella Tonato
  const [showMirellaModal, setShowMirellaModal] = useState(false);

  // Estado para mostrar el modal de Alex Valle Franco
  const [showAlexModal, setShowAlexModal] = useState(false);

  // Estado para mostrar el modal de Lenin Arroyo Baltán
  const [showLeninModal, setShowLeninModal] = useState(false);

  // Estado para mostrar el modal de Alejandro Montecé Giler
  const [showAlejandroModal, setShowAlejandroModal] = useState(false);

  // Estado para mostrar el modal de Rober Hidalgo Proaño
  const [showRoberModal, setShowRoberModal] = useState(false);

  // Estado para mostrar el modal de Wilfrido Javier Sánchez Rodríguez
  const [showWilfridoModal, setShowWilfridoModal] = useState(false);

  return (
    <ScrollView style={estilisequipo.container}>
      {/* Sección de encabezado */}
      <View style={estilisequipo.header}>
        <Text style={estilisequipo.headerSubtitle}>Profesionales establecidos con los mas altos estándares.</Text>
        <Text style={estilisequipo.headerTitle}>nuestro equipo de trabajo</Text>
      </View>

      {/* Sección de introducción */}
      <View style={estilisequipo.introSection}>
        <View style={estilisequipo.introLeft}>
          <Text style={estilisequipo.introSmallTitle}>Servicio con calidad</Text>
          <Text style={estilisequipo.introMainTitle}>Conócenos</Text>
        </View>
        <View style={estilisequipo.introRight}>
          <Text style={estilisequipo.introText}>
            Nuestro equipo de trabajo se caracteriza por los más altos estándares de entrega y servicio de calidad.
          </Text>
        </View>
      </View>

      <Text style={estilisequipo.profileInstruction}>Para saber más de sus perfiles dale clic en cada una de sus fotos.</Text>

      {/* Gerencia */}
      <View style={estilisequipo.section}>
        <Text style={estilisequipo.sectionTitle}>Gerencia</Text>
        <View style={estilisequipo.divider} />

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowCristianModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/cristian_fernando_mora_naula.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Cristian Fernando Mora Naula</Text>
                <Text style={estilisequipo.profileRole}>Director Academico</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowWilfridoModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/wilfridojaviersanchezrodriguez.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Wilfrido Javier Sánchez Rodríguez</Text>
                <Text style={estilisequipo.profileRole}>Comercial Senior - Especialista en Ventas</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dirección empresarial */}
      <View style={estilisequipo.section}>
        <Text style={estilisequipo.sectionTitle}>dirección empresarial</Text>
        <View style={estilisequipo.divider} />

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowDavisModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/davis_danilo_dicado_suarez.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Davis Danilo Dicado Suárez</Text>
                <Text style={estilisequipo.profileRole}>DIRECTOR ADMINISTRATIVO</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowKatherineModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/jordan_olmedo_vera_cedeno.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Jordan Olmedo Vera Cedeño</Text>
                <Text style={estilisequipo.profileRole}>RECURSOS HUMANOS Y ACADEMIA</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowMarioModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/mario_zambrano.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Mario Felipe Zambrano Vega</Text>
                <Text style={estilisequipo.profileRole}>DIRECTOR DE VENTAS</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      {/* Dirección de Tics y diseños */}
      <View style={estilisequipo.section}>
        <Text style={estilisequipo.sectionTitle}>Dirección de Tics y diseños</Text>
        <View style={estilisequipo.divider} />

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowHenryModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/henry_stalyn_soledispa_vera.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Henry Stalyn Soledispa Vera</Text>
                <Text style={estilisequipo.profileRole}>Diseñador Web y Desarrollador Backend</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowAngelModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/angel_navarrete.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Angel Julian Navarrete Cedeño</Text>
                <Text style={estilisequipo.profileRole}>Especialista en Inteligencia Artificial y Backend</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowJoshuaModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/joshua_vinces.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Joshua Emanuel Vinces Manrique</Text>
                <Text style={estilisequipo.profileRole}>Desarrollador de Aplicaciones y Estratega Digital</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logística integral */}
      <View style={estilisequipo.section}>
        <Text style={estilisequipo.sectionTitle}>Logística integral</Text>
        <View style={estilisequipo.divider} />

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowAlexandraModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/alexandra_magaly_lucas_naula.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Alexandra Magaly Lucas Naula</Text>
                <Text style={estilisequipo.profileRole}>Promotora de Ventas</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comite científico */}
      <View style={estilisequipo.section}>
        <Text style={estilisequipo.sectionTitle}>Comite Científico</Text>
        <View style={estilisequipo.divider} />


        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowEduardoModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/eduardo_j_r_llugdar.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>LLM. Eduardo J. R. Llugdar (Argentina)</Text>
                <Text style={estilisequipo.profileRole}>Presidente Comité Científico de NaulaCorp</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowCristianModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/cristian_fernando_mora_naula.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>Mgs. Cristian Mora Naula (Ecuador)</Text>
                <Text style={estilisequipo.profileRole}>Director Académico NaulaCorp</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowCeliaModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/célia_teresinha_manzan.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>PhD. Célia Teresinha Manzan (Brasil)</Text>
                <Text style={estilisequipo.profileRole}>Secretaria del Comité de Publicación</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
 

      {/* Instituto de formación */ }
  <View style={estilisequipo.section}>
    <Text style={estilisequipo.sectionTitle}>Instituto de formación</Text>
    <View style={estilisequipo.divider} />

        <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowEduardoModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/eduardo_j_r_llugdar.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>LLM. Eduardo J. R. Llugdar (Argentina)</Text>
                <Text style={estilisequipo.profileRole}>Presidente Comité Científico de NaulaCorp</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

         <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowMarceloModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/marcelo_lopez_mesa.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>DR. Marcelo López Mesa (Argentina)</Text>
                <Text style={estilisequipo.profileRole}>DOCENTE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
                 <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowJuanModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/juan_castaneda.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>DR. Juan Castañeda (Perú)</Text>
                <Text style={estilisequipo.profileRole}>DOCENTE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

                 <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowMirellaModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/mirella_tonato.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>DR. Mirella Tonato (Ecuador)</Text>
                <Text style={estilisequipo.profileRole}>DOCENTE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

                 <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowAlexModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/alex_valle_franco.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>PhD. Alex Valle Franco (Ecuador)</Text>
                <Text style={estilisequipo.profileRole}>DOCENTE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

            <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowLeninModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/lenin_arroyo_baltan.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>PhD. Lenin Arroyo Baltán (Ecuador)</Text>
                <Text style={estilisequipo.profileRole}>DOCENTE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

          <View style={estilisequipo.profileContainer}>
          <TouchableOpacity
            style={estilisequipo.profileCardSingle}
            onPress={() => setShowAlejandroModal(true)}
          >
            <View style={estilisequipo.profileFront}>
              <Image
                source={require('../Fotoperfiles/alejandro_montecé_giler.png')}
                style={estilisequipo.profilePhoto}
              />
              <View style={estilisequipo.profileTextContainer}>
                <Text style={estilisequipo.profileName}>PhD. Alejandro Montecé Giler (Ecuador)</Text>
                <Text style={estilisequipo.profileRole}>DOCENTE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
  </View>

  {/* Abogados LAW FIRM */ }
  <View style={estilisequipo.section}>
    <Text style={estilisequipo.sectionTitle}>Abogados LAW FIRM</Text>
    <View style={estilisequipo.divider} />

    <View style={estilisequipo.profileContainer}>
      <TouchableOpacity
        style={estilisequipo.profileCardSingle}
        onPress={() => setShowDavidModal(true)}
      >
        <View style={estilisequipo.profileFront}>
          <Image
            source={require('../Fotoperfiles/david_espinoza_mera.png')}
            style={estilisequipo.profilePhoto}
          />
          <View style={estilisequipo.profileTextContainer}>
            <Text style={estilisequipo.profileName}>David Espinoza Mera</Text>
            <Text style={estilisequipo.profileRole}>Abogado Jr. LAW FIRM</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>

    <View style={estilisequipo.profileContainer}>
      <TouchableOpacity
        style={estilisequipo.profileCardSingle}
        onPress={() => setShowRoberModal(true)}
      >
        <View style={estilisequipo.profileFront}>
          <Image
            source={require('../Fotoperfiles/rober_hidalgo_proano.png')}
            style={estilisequipo.profilePhoto}
          />
          <View style={estilisequipo.profileTextContainer}>
          <Text style={estilisequipo.profileName}>Rober Hidalgo Proaño.</Text>
          <Text style={estilisequipo.profileRole}>Abogado Jr. LAW FIRM</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>

  {/* Sección de contacto */ }
  <View style={estilisequipo.contactSection}>
    <Text style={estilisequipo.contactTitle}>Quieres ser parte de nosotros?</Text>
    <TouchableOpacity
      style={estilisequipo.contactButton}
      onPress={() => Linking.openURL('https://forms.gle/iiMfKRaxEPnNqADa8')}
    >
      <Text style={estilisequipo.contactButtonText}>Aplica ahora</Text>
      <Ionicons name="arrow-forward" size={20} color="#fff" />
    </TouchableOpacity>
  </View>

  {/* Información de contacto */ }
  <View style={estilisequipo.footer}>
    <Text style={estilisequipo.footerTitle}>TE ASISTIREMOS 24/7</Text>
    <Text style={estilisequipo.footerSubtitle}>Contáctenos</Text>

    <View style={estilisequipo.contactInfo}>
      <View style={estilisequipo.contactItem}>
        <FontAwesome5 name="map-marker-alt" size={16} color="#fff" />
        <Text style={estilisequipo.contactText}>Av. Carlo J. Arosemena, junto a la UTEQ, diagonal Casa Judicial Quevedo</Text>
      </View>

      <TouchableOpacity
        style={estilisequipo.contactItem}
        onPress={() => openWhatsAppZona('593994795695', 'Quevedo')}
      >
        <FontAwesome5 name="phone" size={16} color="#fff" />
        <Text style={estilisequipo.contactText}>+(593)0994795695</Text>
      </TouchableOpacity>

      <View style={estilisequipo.contactItem}>
        <FontAwesome5 name="envelope" size={16} color="#fff" />
        <Text style={estilisequipo.contactText}>naulacorp@gmail.com</Text>
      </View>
    </View>
  </View>

  {/* Modales de perfiles */ }
      <PerfilCristianMoraModal visible={showCristianModal} onClose={() => setShowCristianModal(false)} />
      <PerfilDavisDicadoModal visible={showDavisModal} onClose={() => setShowDavisModal(false)} />
      <PerfilKatherineConformeModal visible={showKatherineModal} onClose={() => setShowKatherineModal(false)} />
      <PerfilMarioZambranoModal visible={showMarioModal} onClose={() => setShowMarioModal(false)} />
      <PerfilHenrySoledispaModal visible={showHenryModal} onClose={() => setShowHenryModal(false)} />
      <PerfilAngelNavarreteModal visible={showAngelModal} onClose={() => setShowAngelModal(false)} />
      <PerfilJoshuaVincesModal visible={showJoshuaModal} onClose={() => setShowJoshuaModal(false)} />
      <PerfilAlexandraLucasNaula visible={showAlexandraModal} onClose={() => setShowAlexandraModal(false)} />
      <PerfilDavidEspinozaMeraModal visible={showDavidModal} onClose={() => setShowDavidModal(false)} />
      <PerfilEduardoLlugdarModal visible={showEduardoModal} onClose={() => setShowEduardoModal(false)} />
      <PerfilCeliaManzanModal visible={showCeliaModal} onClose={() => setShowCeliaModal(false)} />
      <PerfilMarceloLopezMesaModal visible={showMarceloModal} onClose={() => setShowMarceloModal(false)} />
      <PerfilJuanCastanedaModal visible={showJuanModal} onClose={() => setShowJuanModal(false)} />
      <PerfilMirellaTonatoModal visible={showMirellaModal} onClose={() => setShowMirellaModal(false)} />
      <PerfilAlexValleFrancoModal visible={showAlexModal} onClose={() => setShowAlexModal(false)} />
      <PerfilLeninArroyoBaltanModal visible={showLeninModal} onClose={() => setShowLeninModal(false)} />
      <PerfilAlejandroMontecéGilerModal visible={showAlejandroModal} onClose={() => setShowAlejandroModal(false)} />
      <PerfilRoberHidalgoProanoModal visible={showRoberModal} onClose={() => setShowRoberModal(false)} />
      <PerfilWilfridoJavierSanchezModal visible={showWilfridoModal} onClose={() => setShowWilfridoModal(false)} />

  {/* Footer */ }
  {/* <Footer /> */}
    </ScrollView >
  );
}

