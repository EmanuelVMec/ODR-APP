import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Curso {
  id: string | number;
  nombre: string;
  descripcion: string;
  modalidad?: string;
  modalidad_display?: string;
  precio?: number;
  precio_display?: string;
  duracion_horas?: number;
  es_gratuito?: boolean;
  horarios?: string;
  requisitos?: string[];
  beneficios?: string[];
  empresa?: string;
  empresa_display?: string;
  // Legacy fields for backward compatibility
  titulo?: string;
  descripcionCompleta?: string;
  duracion?: string;
  instructor?: string;
}

const Cursos: React.FC = () => {
  const navigation = useNavigation();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Descomenta y personaliza la URL para traer cursos de tu backend
  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://chatbot-0-production.up.railway.app/api/cursos/odr/');
        if (!response.ok) throw new Error('Error al cargar los cursos');
        const data = await response.json();
        setCursos(Array.isArray(data) ? data : data.cursos || []);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);
  

  const openModal = (curso: Curso) => {
    setSelectedCurso(curso);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCurso(null);
  };

  // Función para abrir el chat (widget) en ODRScreen
  const openChatWidget = () => {
    navigation.navigate('ODR', { openChatbot: true });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: '#183A7C' }]}>Cursos</Text>
      
      {/* Modal de detalles del curso */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="#183A7C" />
            </TouchableOpacity>
            
            <ScrollView 
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
              nestedScrollEnabled={true}
            >
              {selectedCurso && (
                <>
                  <Text style={[styles.modalTitle, { color: '#183A7C' }]}>
                    {selectedCurso.titulo || selectedCurso.nombre}
                  </Text>

                  {/* Badge de gratuito si aplica */}
                  {selectedCurso.es_gratuito && (
                    <View style={styles.modalBadgeContainer}>
                      <View style={styles.modalBadgeGratis}>
                        <Ionicons name="gift-outline" size={16} color="#fff" />
                        <Text style={[styles.modalBadgeText, { color: '#fff' }]}>CURSO GRATUITO</Text>
                      </View>
                    </View>
                  )}

                  {/* Descripción principal */}
                  <View style={styles.modalSection}>
                    <View style={styles.sectionHeader}>
                      <Ionicons name="document-text-outline" size={20} color="#183A7C" />
                      <Text style={[styles.modalSectionTitle, { color: '#183A7C' }]}>Descripción</Text>
                    </View>
                    <Text style={[styles.modalText, { color: '#495057' }]}>
                      {selectedCurso.descripcionCompleta || selectedCurso.descripcion}
                    </Text>
                  </View>

                  {/* Información general del curso */}
                  <View style={styles.courseInfoContainer}>
                    <Text style={[styles.infoContainerTitle, { color: '#183A7C' }]}>Información del Curso</Text>
                    
                    {selectedCurso.duracion_horas && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="time-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Duración</Text>
                        </View>
                        <Text style={[styles.infoValue, { color: '#212529' }]}>{selectedCurso.duracion_horas} horas académicas</Text>
                      </View>
                    )}

                    {selectedCurso.duracion && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="calendar-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Duración del Programa</Text>
                        </View>
                        <Text style={[styles.infoValue, { color: '#212529' }]}>{selectedCurso.duracion}</Text>
                      </View>
                    )}

                    {selectedCurso.modalidad_display && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="desktop-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Modalidad</Text>
                        </View>
                        <Text style={[styles.infoValue, { color: '#212529' }]}>{selectedCurso.modalidad_display}</Text>
                      </View>
                    )}

                    {selectedCurso.precio_display && !selectedCurso.es_gratuito && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="pricetag-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Inversión</Text>
                        </View>
                        <Text style={[styles.modalPrice, { color: '#28a745' }]}>{selectedCurso.precio_display}</Text>
                      </View>
                    )}

                    {selectedCurso.precio && !selectedCurso.precio_display && !selectedCurso.es_gratuito && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="pricetag-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Inversión</Text>
                        </View>
                        <Text style={[styles.modalPrice, { color: '#28a745' }]}>${selectedCurso.precio}</Text>
                      </View>
                    )}

                    {selectedCurso.empresa_display && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="business-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Institución</Text>
                        </View>
                        <Text style={[styles.infoValue, { color: '#212529' }]}>{selectedCurso.empresa_display}</Text>
                      </View>
                    )}

                    {selectedCurso.instructor && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="person-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Instructor</Text>
                        </View>
                        <Text style={[styles.infoValue, { color: '#212529' }]}>{selectedCurso.instructor}</Text>
                      </View>
                    )}

                    {selectedCurso.horarios && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="alarm-outline" size={18} color="#4BB543" />
                          <Text style={[styles.infoTitle, { color: '#495057' }]}>Horarios</Text>
                        </View>
                        <Text style={[styles.infoValue, { color: '#212529' }]}>{selectedCurso.horarios}</Text>
                      </View>
                    )}
                  </View>

                  {/* Requisitos */}
                  {selectedCurso.requisitos && selectedCurso.requisitos.length > 0 && (
                    <View style={styles.modalSection}>
                      <View style={styles.sectionHeader}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#183A7C" />
                        <Text style={[styles.modalSectionTitle, { color: '#183A7C' }]}>Requisitos</Text>
                      </View>
                      <View style={styles.requisitosList}>
                        {selectedCurso.requisitos.map((requisito, index) => (
                          <View key={index} style={styles.requisitoItem}>
                            <Ionicons name="chevron-forward" size={14} color="#4BB543" />
                            <Text style={[styles.modalRequisito, { color: '#495057' }]}>{requisito}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Beneficios */}
                  {selectedCurso.beneficios && selectedCurso.beneficios.length > 0 && (
                    <View style={styles.modalSection}>
                      <View style={styles.sectionHeader}>
                        <Ionicons name="star-outline" size={20} color="#183A7C" />
                        <Text style={[styles.modalSectionTitle, { color: '#183A7C' }]}>Beneficios</Text>
                      </View>
                      <View style={styles.beneficiosList}>
                        {selectedCurso.beneficios.map((beneficio, index) => (
                          <View key={index} style={styles.beneficioItem}>
                            <Ionicons name="trophy-outline" size={14} color="#FFD700" />
                            <Text style={[styles.modalBeneficio, { color: '#495057' }]}>{beneficio}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  <TouchableOpacity style={styles.enrollButton} onPress={openChatWidget}>
                    <Ionicons name="bookmark-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={[styles.enrollButtonText, { color: '#fff' }]}>Inscribirse al Curso</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {loading && <ActivityIndicator size="large" color="#183A7C" />}
      {error && <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>}
      {cursos.map((curso) => (
        <TouchableOpacity
          key={curso.id}
          style={styles.cursoCard}
          activeOpacity={0.85}
          onPress={() => openModal(curso)}
        >
          <View style={styles.cursoCardHeader}>
            <View style={styles.cursoIconContainer}>
              <Ionicons name="school-outline" size={32} color="#183A7C" />
            </View>
            {curso.es_gratuito && (
              <View style={styles.badgeGratis}>
                <Text style={[styles.badgeGratisText, { color: '#fff' }]}>GRATUITO</Text>
              </View>
            )}
          </View>
          <Text style={[styles.cursoTitulo, { color: '#183A7C' }]}>{curso.titulo || curso.nombre}</Text>
          <Text style={[styles.cursoDescripcion, { color: '#6c757d' }]}>{curso.descripcion}</Text>
          <View style={styles.cursoInfoRow}>
            {curso.duracion_horas && (
              <View style={styles.infoPill}>
                <Ionicons name="time-outline" size={14} color="#4BB543" />
                <Text style={[styles.infoPillText, { color: '#183A7C' }]}>{curso.duracion_horas}h</Text>
              </View>
            )}
            {curso.precio_display && !curso.es_gratuito && (
              <View style={styles.infoPill}>
                <Ionicons name="pricetag-outline" size={14} color="#183A7C" />
                <Text style={[styles.infoPillText, { color: '#183A7C' }]}>{curso.precio_display}</Text>
              </View>
            )}
            {curso.empresa_display && (
              <View style={styles.infoPill}>
                <Ionicons name="business-outline" size={14} color="#183A7C" />
                <Text style={[styles.infoPillText, { color: '#183A7C' }]}>{curso.empresa_display}</Text>
              </View>
            )}
          </View>
          <View style={styles.verMasContainer}>
            <Text style={[styles.verMasText, { color: '#183A7C' }]}>Ver más</Text>
            <Ionicons name="arrow-forward" size={16} color="#183A7C" />
          </View>
        </TouchableOpacity>
      ))}
      {!loading && !error && cursos.length === 0 && (
        <Text style={{ color: '#888' }}>No hay cursos disponibles.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 24,
    textAlign: 'center',
  },
  cursoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#183A7C',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e3e8f0',
    position: 'relative',
    overflow: 'hidden',
  },
  cursoCardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.18,
  },
  cursoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  cursoIconContainer: {
    backgroundColor: '#e3e8f0',
    borderRadius: 12,
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGratis: {
    backgroundColor: '#4BB543',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginLeft: 'auto',
  },
  badgeGratisText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  cursoInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
    flexWrap: 'wrap',
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4fa',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  infoPillText: {
    fontSize: 13,
    color: '#183A7C',
    marginLeft: 4,
    fontWeight: '500',
  },
  cursoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 8,
    lineHeight: 24,
  },
  cursoDescripcion: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
    lineHeight: 20,
  },
  verMasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  verMasText: {
    fontSize: 14,
    color: '#183A7C',
    fontWeight: '600',
    marginRight: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '95%',
    maxWidth: 420,
    height: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 15,
    position: 'relative',
  },
  modalScrollView: {
    flex: 1,
    paddingTop: 50,
  },
  modalScrollContent: {
    padding: 20,
    paddingBottom: 50,
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183A7C',
    marginLeft: 8,
  },
  courseInfoContainer: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4BB543',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginLeft: 6,
  },
  infoValue: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  requisitosList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  requisitoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  modalRequisito: {
    fontSize: 14,
    color: '#495057',
    flex: 1,
    marginLeft: 6,
  },
  enrollButton: {
    backgroundColor: '#183A7C',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#183A7C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBadgeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalBadgeGratis: {
    backgroundColor: '#4BB543',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4BB543',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  modalBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    marginLeft: 6,
  },
  infoContainerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 15,
    textAlign: 'center',
  },
  beneficiosList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  beneficioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalBeneficio: {
    fontSize: 14,
    color: '#495057',
    flex: 1,
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default Cursos;
