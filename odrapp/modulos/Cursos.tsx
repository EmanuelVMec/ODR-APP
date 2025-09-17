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
      <Text style={styles.title}>Cursos</Text>
      
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
            >
              {selectedCurso && (
                <>
                  <Text style={styles.modalTitle}>
                    {selectedCurso.titulo || selectedCurso.nombre}
                  </Text>

                  {/* Descripción principal */}
                  <View style={styles.modalSection}>
                    <View style={styles.sectionHeader}>
                      <Ionicons name="document-text-outline" size={20} color="#183A7C" />
                      <Text style={styles.modalSectionTitle}>Descripción</Text>
                    </View>
                    <Text style={styles.modalText}>
                      {selectedCurso.descripcionCompleta || selectedCurso.descripcion}
                    </Text>
                  </View>

                  {/* Información del curso */}
                  <View style={styles.courseInfoContainer}>
                    {selectedCurso.duracion && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="time-outline" size={18} color="#4BB543" />
                          <Text style={styles.infoTitle}>Duración</Text>
                        </View>
                        <Text style={styles.infoValue}>{selectedCurso.duracion}</Text>
                      </View>
                    )}

                    {selectedCurso.precio && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="pricetag-outline" size={18} color="#4BB543" />
                          <Text style={styles.infoTitle}>Precio</Text>
                        </View>
                        <Text style={styles.modalPrice}>{selectedCurso.precio}</Text>
                      </View>
                    )}

                    {selectedCurso.instructor && (
                      <View style={styles.infoCard}>
                        <View style={styles.infoHeader}>
                          <Ionicons name="person-outline" size={18} color="#4BB543" />
                          <Text style={styles.infoTitle}>Instructor</Text>
                        </View>
                        <Text style={styles.infoValue}>{selectedCurso.instructor}</Text>
                      </View>
                    )}
                  </View>

                  {selectedCurso.requisitos && selectedCurso.requisitos.length > 0 && (
                    <View style={styles.modalSection}>
                      <View style={styles.sectionHeader}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#183A7C" />
                        <Text style={styles.modalSectionTitle}>Requisitos</Text>
                      </View>
                      <View style={styles.requisitosList}>
                        {selectedCurso.requisitos.map((requisito, index) => (
                          <View key={index} style={styles.requisitoItem}>
                            <Ionicons name="chevron-forward" size={14} color="#4BB543" />
                            <Text style={styles.modalRequisito}>{requisito}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  <TouchableOpacity style={styles.enrollButton} onPress={openChatWidget}>
                    <Ionicons name="bookmark-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.enrollButtonText}>Inscribirse al Curso</Text>
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
          onPress={() => openModal(curso)}
        >
          <Text style={styles.cursoTitulo}>{curso.titulo}</Text>
          <Text style={styles.cursoDescripcion}>{curso.descripcion}</Text>
          <View style={styles.verMasContainer}>
            <Text style={styles.verMasText}>Ver más</Text>
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 15,
    position: 'relative',
  },
  modalScrollView: {
    maxHeight: '100%',
  },
  modalScrollContent: {
    padding: 24,
    paddingTop: 50, // Space for close button
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
    marginTop: 10,
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
});

export default Cursos;
