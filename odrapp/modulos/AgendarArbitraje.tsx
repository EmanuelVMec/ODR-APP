import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Animated,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

// Datos jerárquicos exactos de las oficinas ODR Ecuador
interface Oficina {
  id: string;
  name: string;
}

interface Ciudad {
  name: string;
  oficinas: Oficina[];
}

interface Provincia {
  name: string;
  ciudades: { [key: string]: Ciudad };
}

type OficinasData = { [key: string]: Provincia };

const OFICINAS_DATA: OficinasData = {
  // ID 8 - Pichincha
  "8": {
    name: "Pichincha",
    ciudades: {
      "quito": {
        name: "Quito",
        oficinas: [
          { id: "quito_republica", name: "Quito República" },
          { id: "belisario_quevedo", name: "Belisario Quevedo" },
          { id: "quito_san_bartolo", name: "Quito – San Bartolo" },
          { id: "quito_rumipamba", name: "Quito Rumipamba" },
          { id: "quito_sucre", name: "Quito Sucre" },
          { id: "quito_centro", name: "Quito Centro" },
          { id: "quito_chillogallo", name: "Quito Chillogallo" },
          { id: "valle_chillos", name: "Valle de los Chillos" },
          { id: "puellaro", name: "Puéllaro" },
          { id: "el_quinche", name: "El Quinche" }
        ]
      },
      "puerto_quito": {
        name: "Puerto Quito",
        oficinas: [
          { id: "puerto_quito", name: "Puerto Quito" }
        ]
      },
      "san_miguel_bancos": {
        name: "San Miguel de los Bancos",
        oficinas: [
          { id: "san_miguel_bancos", name: "San Miguel de los Bancos" }
        ]
      },
      "machachi": {
        name: "Machachi",
        oficinas: [
          { id: "machachi", name: "Machachi" }
        ]
      }
    }
  },
  // ID 5 - Guayas
  "5": {
    name: "Guayas",
    ciudades: {
      "guayaquil": {
        name: "Guayaquil",
        oficinas: [
          { id: "guayaquil", name: "Guayaquil Centro" },
          { id: "guayaquil_olmedo", name: "Guayaquil – José Joaquín de Olmedo" },
          { id: "guayaquil_illingworth", name: "Guayaquil Almirante - Illingworth" },
          { id: "guayaquil_sur", name: "Guayaquil Sur" }
        ]
      },
      "naranjal": {
        name: "Naranjal",
        oficinas: [
          { id: "naranjal", name: "Naranjal" }
        ]
      }
    }
  },
  // ID 11 - Azuay
  "11": {
    name: "Azuay",
    ciudades: {
      "cuenca": {
        name: "Cuenca",
        oficinas: [
          { id: "cuenca", name: "Cuenca" }
        ]
      },
      "azogues": {
        name: "Azogues",
        oficinas: [
          { id: "azogues", name: "Azogues" }
        ]
      }
    }
  },
  // ID 3 - Manabí
  "3": {
    name: "Manabí",
    ciudades: {
      "manta": {
        name: "Manta",
        oficinas: [
          { id: "manta", name: "Manta" }
        ]
      },
      "portoviejo": {
        name: "Portoviejo",
        oficinas: [
          { id: "portoviejo", name: "Portoviejo" },
          { id: "portoviejo_sur", name: "Portoviejo Sur" }
        ]
      },
      "chone": {
        name: "Chone",
        oficinas: [
          { id: "chone", name: "Chone" }
        ]
      },
      "tosagua": {
        name: "Tosagua",
        oficinas: [
          { id: "tosagua", name: "Tosagua" }
        ]
      },
      "montecristi": {
        name: "Montecristi",
        oficinas: [
          { id: "montecristi", name: "Montecristi" }
        ]
      },
      "el_carmen": {
        name: "El Carmen",
        oficinas: [
          { id: "el_carmen", name: "El Carmen" }
        ]
      }
    }
  },
  // ID 15 - Tungurahua
  "15": {
    name: "Tungurahua",
    ciudades: {
      "ambato": {
        name: "Ambato",
        oficinas: [
          { id: "ambato", name: "Ambato" }
        ]
      },
      "pelileo": {
        name: "Pelileo",
        oficinas: [
          { id: "pelileo", name: "Pelileo" }
        ]
      },
      "quero": {
        name: "Quero",
        oficinas: [
          { id: "quero", name: "Quero" }
        ]
      }
    }
  },
  // ID 10 - Imbabura
  "10": {
    name: "Imbabura",
    ciudades: {
      "ibarra": {
        name: "Ibarra",
        oficinas: [
          { id: "ibarra", name: "Ibarra" }
        ]
      },
      "otavalo": {
        name: "Otavalo",
        oficinas: [
          { id: "otavalo", name: "Otavalo" }
        ]
      },
      "cotacachi": {
        name: "Cotacachi",
        oficinas: [
          { id: "cotacachi_centro", name: "Cotacachi Centro" },
          { id: "las_golondrinas_cotacachi", name: "Las Golondrinas Cotacachi" }
        ]
      }
    }
  },
  // ID 12 - Loja
  "12": {
    name: "Loja",
    ciudades: {
      "cariamanga": {
        name: "Cariamanga",
        oficinas: [
          { id: "cariamanga", name: "Cariamanga" }
        ]
      },
      "celica": {
        name: "Celica",
        oficinas: [
          { id: "celica", name: "Celica" }
        ]
      },
      "alamor": {
        name: "Alamor",
        oficinas: [
          { id: "alamor_puyango", name: "Alamor Puyango" }
        ]
      }
    }
  },
  // ID 6 - El Oro
  "6": {
    name: "El Oro",
    ciudades: {
      "machala": {
        name: "Machala",
        oficinas: [
          { id: "machala", name: "Machala" }
        ]
      },
      "pinas": {
        name: "Piñas",
        oficinas: [
          { id: "pinas", name: "Piñas" }
        ]
      }
    }
  },
  // ID 7 - Esmeraldas
  "7": {
    name: "Esmeraldas",
    ciudades: {
      "quininde": {
        name: "Quinindé",
        oficinas: [
          { id: "quininde", name: "Quinindé" }
        ]
      }
    }
  },
  // ID 14 - Chimborazo
  "14": {
    name: "Chimborazo",
    ciudades: {
      "riobamba": {
        name: "Riobamba",
        oficinas: [
          { id: "riobamba", name: "Riobamba" }
        ]
      }
    }
  },
  // ID 9 - Cotopaxi
  "9": {
    name: "Cotopaxi",
    ciudades: {
      "latacunga": {
        name: "Latacunga",
        oficinas: [
          { id: "latacunga", name: "Latacunga" }
        ]
      },
      "la_mana": {
        name: "La Maná",
        oficinas: [
          { id: "la_mana", name: "La Maná" }
        ]
      },
      "salcedo": {
        name: "Salcedo",
        oficinas: [
          { id: "salcedo", name: "Salcedo" }
        ]
      },
      "pangua": {
        name: "Pangua",
        oficinas: [
          { id: "pangua", name: "Pangua" }
        ]
      },
      "sigchos": {
        name: "Sigchos",
        oficinas: [
          { id: "sigchos", name: "Sigchos" }
        ]
      }
    }
  },
  // ID 13 - Carchi
  "13": {
    name: "Carchi",
    ciudades: {
      "tulcan": {
        name: "Tulcán",
        oficinas: [
          { id: "tulcan", name: "Tulcán" },
          { id: "tulcan_centro", name: "Túlcan Centro" }
        ]
      }
    }
  },
  // ID 1 - Los Ríos
  "1": {
    name: "Los Ríos",
    ciudades: {
      "quevedo": {
        name: "Quevedo",
        oficinas: [
          { id: "quevedo_matriz", name: "Matriz Quevedo" }
        ]
      },
      "buena_fe": {
        name: "Buena Fe",
        oficinas: [
          { id: "buena_fe", name: "Buena Fe" }
        ]
      },
      "babahoyo": {
        name: "Babahoyo",
        oficinas: [
          { id: "babahoyo", name: "Babahoyo" }
        ]
      },
      "quinsaloma": {
        name: "Quinsaloma",
        oficinas: [
          { id: "quinsaloma", name: "Quinsaloma" }
        ]
      },
      "el_empalme": {
        name: "El Empalme",
        oficinas: [
          { id: "el_empalme", name: "El Empalme" }
        ]
      },
      "san_carlos": {
        name: "San Carlos",
        oficinas: [
          { id: "san_carlos", name: "San Carlos" }
        ]
      }
    }
  },
  // ID 4 - Santo Domingo de los Tsáchilas
  "4": {
    name: "Santo Domingo de los Tsáchilas",
    ciudades: {
      "santo_domingo": {
        name: "Santo Domingo",
        oficinas: [
          { id: "santo_domingo", name: "Santo Domingo" },
          { id: "santo_domingo_sur", name: "Santo Domingo Sur" }
        ]
      }
    }
  },
  // ID 2 - Santa Elena
  "2": {
    name: "Santa Elena",
    ciudades: {
      "santa_elena": {
        name: "Santa Elena",
        oficinas: [
          { id: "santa_elena", name: "Santa Elena" }
        ]
      }
    }
  },
  // ID 17 - Napo
  "17": {
    name: "Napo",
    ciudades: {
      "tena": {
        name: "Tena",
        oficinas: [
          { id: "tena", name: "Tena" }
        ]
      }
    }
  },
  // ID 18 - Sucumbíos
  "18": {
    name: "Sucumbíos",
    ciudades: {
      "lago_agrio": {
        name: "Lago Agrio",
        oficinas: [
          { id: "lago_agrio", name: "Lago Agrio" }
        ]
      }
    }
  },
  // ID 19 - Galápagos
  "19": {
    name: "Galápagos",
    ciudades: {
      "san_cristobal": {
        name: "San Cristóbal",
        oficinas: [
          { id: "san_cristobal", name: "San Cristóbal" }
        ]
      },
      "santa_cruz": {
        name: "Santa Cruz",
        oficinas: [
          { id: "santa_cruz", name: "Santa Cruz" }
        ]
      }
    }
  },
  // ID 16 - Morona Santiago
  "16": {
    name: "Morona Santiago",
    ciudades: {
      "macas": {
        name: "Macas",
        oficinas: [
          { id: "macas", name: "Macas" }
        ]
      }
    }
  },
  // ID 20 - Zamora Chinchipe
  "20": {
    name: "Zamora Chinchipe",
    ciudades: {
      "zamora": {
        name: "Zamora",
        oficinas: [
          { id: "zamora", name: "Zamora" }
        ]
      }
    }
  }
};

interface FormData {
  tipoAudiencia: string;
  materia: string;
  asunto: string;
  fechaHora: string;
  cedula: string;
  nombreCompleto: string;
  telefono: string;
  correoElectronico: string;
  direccionDomiciliaria: string;
  // Datos del invitado
  cedulaInvitado: string;
  nombreCompletoInvitado: string;
  telefonoInvitado: string;
  correoElectronicoInvitado: string;
  direccionDomiciliariaInvitado: string;
  // Campos para audiencia presencial
  provincia: string;
  ciudad: string;
  oficina: string;
  // Campo para audiencia virtual
  comprobantePago: any;
}

const AgendarArbitraje: React.FC = () => {
  // Estados para el formulario
  const [formData, setFormData] = useState<FormData>({
    tipoAudiencia: '',
    materia: '',
    asunto: '',
    fechaHora: '',
    cedula: '',
    nombreCompleto: '',
    telefono: '',
    correoElectronico: '',
    direccionDomiciliaria: '',
    cedulaInvitado: '',
    nombreCompletoInvitado: '',
    telefonoInvitado: '',
    correoElectronicoInvitado: '',
    direccionDomiciliariaInvitado: '',
    provincia: '',
    ciudad: '',
    oficina: '',
    comprobantePago: null
  });

  // Estado para el teclado
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animaciones de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Listeners del teclado
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      
      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        // Verificar tamaño (10 MB máximo)
        if (file.size && file.size > 10 * 1024 * 1024) {
          Alert.alert('Error', 'El archivo no puede superar los 10 MB');
          return;
        }
        updateFormData('comprobantePago', file);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const updateFormData = (field: keyof FormData, value: string | any) => {
    // Validar longitud para cédula y teléfono (máximo 10 números)
    if (field === 'cedula' || field === 'telefono' || field === 'cedulaInvitado' || field === 'telefonoInvitado') {
      // Remover caracteres no numéricos
      const numericValue = value.replace(/[^0-9]/g, '');
      // Limitar a 10 dígitos
      if (numericValue.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [field]: numericValue
        }));
      }
    } else {
      setFormData(prev => {
        const newData = {
          ...prev,
          [field]: value
        };
        
        // Limpiar campos dependientes cuando cambie la provincia
        if (field === 'provincia') {
          newData.ciudad = '';
          newData.oficina = '';
        }
        
        // Limpiar campo de oficina cuando cambie la ciudad
        if (field === 'ciudad') {
          newData.oficina = '';
        }
        
        return newData;
      });
    }
  };

  // Función para obtener ciudades de una provincia
  const getCiudadesPorProvincia = (provinciaId: string) => {
    if (!provinciaId) return [];
    
    const provincia = OFICINAS_DATA[provinciaId] as Provincia;
    if (!provincia) return [];
    
    return Object.entries(provincia.ciudades).map(([key, ciudad]: [string, Ciudad]) => ({
      value: key,
      label: ciudad.name
    }));
  };

  // Función para obtener oficinas de una ciudad
  const getOficinasPorCiudad = (provinciaId: string, ciudadKey: string) => {
    if (!provinciaId || !ciudadKey) return [];
    
    const provincia = OFICINAS_DATA[provinciaId] as Provincia;
    if (!provincia) return [];
    
    const ciudad = provincia.ciudades[ciudadKey];
    if (!ciudad) return [];
    
    return ciudad.oficinas.map(oficina => ({
      value: oficina.id,
      label: oficina.name
    }));
  };

  // Función para obtener lista de provincias
  const getProvinciasList = () => {
    return Object.entries(OFICINAS_DATA).map(([id, provincia]) => ({
      value: id,
      label: provincia.name
    })).sort((a, b) => a.label.localeCompare(b.label));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'tipoAudiencia', 'materia', 'asunto', 'cedula', 'nombreCompleto', 'telefono', 'correoElectronico',
      'cedulaInvitado', 'nombreCompletoInvitado', 'telefonoInvitado', 'correoElectronicoInvitado'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        Alert.alert('Error', `El campo ${field} es obligatorio`);
        return false;
      }
    }
    
    // Validar campos específicos para audiencia presencial
    if (formData.tipoAudiencia === 'presencial') {
      if (!formData.provincia) {
        Alert.alert('Error', 'Debe seleccionar una provincia para la audiencia presencial');
        return false;
      }
      if (!formData.ciudad) {
        Alert.alert('Error', 'Debe seleccionar una ciudad para la audiencia presencial');
        return false;
      }
      if (!formData.oficina) {
        Alert.alert('Error', 'Debe seleccionar una oficina para la audiencia presencial');
        return false;
      }
    }
    
    // Validar archivo para audiencia virtual
    if (formData.tipoAudiencia === 'virtual' && !formData.comprobantePago) {
      Alert.alert('Error', 'Debe adjuntar un comprobante de pago para la audiencia virtual');
      return false;
    }
    
    // Validar emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correoElectronico)) {
      Alert.alert('Error', 'Por favor ingrese un email válido para el solicitante');
      return false;
    }
    
    if (!emailRegex.test(formData.correoElectronicoInvitado)) {
      Alert.alert('Error', 'Por favor ingrese un email válido para el invitado');
      return false;
    }

    // Validar longitud de cédulas (10 dígitos)
    if (formData.cedula.length !== 10) {
      Alert.alert('Error', 'La cédula del solicitante debe tener 10 dígitos');
      return false;
    }
    
    if (formData.cedulaInvitado.length !== 10) {
      Alert.alert('Error', 'La cédula del invitado debe tener 10 dígitos');
      return false;
    }
    
    // Validar longitud de teléfonos (10 dígitos)
    if (formData.telefono.length !== 10) {
      Alert.alert('Error', 'El teléfono del solicitante debe tener 10 dígitos');
      return false;
    }
    
    if (formData.telefonoInvitado.length !== 10) {
      Alert.alert('Error', 'El teléfono del invitado debe tener 10 dígitos');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Solicitud Enviada', 
        'Su solicitud de arbitraje ha sido enviada exitosamente. Nos contactaremos con usted pronto.',
        [{ text: 'OK' }]
      );
      // Aquí se implementaría la lógica para enviar a un backend
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: Math.max(30, keyboardHeight * 0.1) }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
            {/* Header */}
            <Animated.View 
              style={[
                styles.header,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <FontAwesome5 name="gavel" size={32} color="#183A7C" style={styles.headerIcon} />
              <Text style={styles.title}>Tu solución a un clic de distancia: Agendamiento de arbitraje, presencial y virtual</Text>
              <Text style={styles.subtitle}>Solicitud de arbitraje telemática</Text>
            </Animated.View>

            {/* Información importante */}
            <Animated.View 
              style={[
                styles.infoSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.infoTitle}>Información importante</Text>
              <Text style={styles.infoText}>
                Al elegir el tipo de audiencia virtual, es necesario completar los campos correspondientes al número de celular y al correo electrónico de manera obligatoria.
              </Text>
              <Text style={styles.infoText}>
                El formato del comprobante de pago debe ser PDF o imagen y el tamaño permitido es 10 MB.
              </Text>
              <Text style={styles.infoText}>
                La hora de la audiencia debe estar en el intervalo de 08:00 A.M. a 18:00 P.M.
              </Text>
            </Animated.View>

            {/* Formulario */}
            <Animated.View 
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              {/* Selecciones principales */}
              <View style={styles.section}>
                <Text style={styles.label}>Tipo de Audiencia *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.tipoAudiencia}
                    onValueChange={(value) => updateFormData('tipoAudiencia', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleccionar una opción" value="" />
                    <Picker.Item label="Virtual" value="virtual" />
                    <Picker.Item label="Presencial" value="presencial" />
                  </Picker>
                </View>
                
                <Text style={styles.label}>Materia *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.materia}
                    onValueChange={(value) => updateFormData('materia', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleccionar una opción" value="" />
                    <Picker.Item label="Civil" value="civil" />
                    <Picker.Item label="Tránsito" value="transito" />
                    <Picker.Item label="Niñez y adolescencia" value="ninez_adolescencia" />
                    <Picker.Item label="Penal" value="penal" />
                    <Picker.Item label="Laboral" value="laboral" />
                    <Picker.Item label="Inquilinato" value="inquilinato" />
                    <Picker.Item label="Comunitario, usuarios y consumidores" value="comunitario" />
                  </Picker>
                </View>

                <Text style={styles.label}>Asunto *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.asunto}
                    onValueChange={(value) => updateFormData('asunto', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleccionar una opción" value="" />
                    <Picker.Item label="Contractual" value="contractual" />
                    <Picker.Item label="Extracontractual" value="extracontractual" />
                    <Picker.Item label="Societario" value="societario" />
                    <Picker.Item label="Comercial" value="comercial" />
                    <Picker.Item label="Otro" value="otro" />
                  </Picker>
                </View>

                <Text style={styles.label}>Fecha y hora *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.fechaHora}
                  onChangeText={(value) => updateFormData('fechaHora', value)}
                  placeholder="dd/mm/aaaa --:--"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Datos del Solicitante */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  <Ionicons name="person" size={18} color="#183A7C" /> Datos del Solicitante
                </Text>
                
                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Cédula *</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.cedula}
                      onChangeText={(value) => updateFormData('cedula', value)}
                      placeholder="1234567890 (10 dígitos)"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Teléfono *</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.telefono}
                      onChangeText={(value) => updateFormData('telefono', value)}
                      placeholder="0999999999 (10 dígitos)"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>

                <Text style={styles.label}>Nombre completo *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.nombreCompleto}
                  onChangeText={(value) => updateFormData('nombreCompleto', value)}
                  placeholder="Ingrese su nombre completo"
                  placeholderTextColor="#999"
                />

                <Text style={styles.label}>Correo electrónico *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.correoElectronico}
                  onChangeText={(value) => updateFormData('correoElectronico', value)}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Dirección domiciliaria</Text>
                <TextInput
                  style={styles.input}
                  value={formData.direccionDomiciliaria}
                  onChangeText={(value) => updateFormData('direccionDomiciliaria', value)}
                  placeholder="Ingrese su dirección"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Datos del Invitado */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  <Ionicons name="person-add" size={18} color="#183A7C" /> Datos del Invitado
                </Text>
                
                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Cédula *</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.cedulaInvitado}
                      onChangeText={(value) => updateFormData('cedulaInvitado', value)}
                      placeholder="1234567890 (10 dígitos)"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Teléfono *</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.telefonoInvitado}
                      onChangeText={(value) => updateFormData('telefonoInvitado', value)}
                      placeholder="0999999999 (10 dígitos)"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>

                <Text style={styles.label}>Nombre completo *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.nombreCompletoInvitado}
                  onChangeText={(value) => updateFormData('nombreCompletoInvitado', value)}
                  placeholder="Ingrese el nombre completo del invitado"
                  placeholderTextColor="#999"
                />

                <Text style={styles.label}>Correo electrónico *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.correoElectronicoInvitado}
                  onChangeText={(value) => updateFormData('correoElectronicoInvitado', value)}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Dirección domiciliaria</Text>
                <TextInput
                  style={styles.input}
                  value={formData.direccionDomiciliariaInvitado}
                  onChangeText={(value) => updateFormData('direccionDomiciliariaInvitado', value)}
                  placeholder="Ingrese la dirección del invitado"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Sección condicional para audiencia presencial */}
              {formData.tipoAudiencia === 'presencial' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Datos de la Audiencia presencial</Text>
                  
                  <Text style={styles.label}>Provincia *</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.provincia}
                      onValueChange={(value) => updateFormData('provincia', value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Seleccionar una opción" value="" />
                      <Picker.Item label="Azuay" value="11" />
                      <Picker.Item label="Carchi" value="13" />
                      <Picker.Item label="Chimborazo" value="14" />
                      <Picker.Item label="Cotopaxi" value="9" />
                      <Picker.Item label="El Oro" value="6" />
                      <Picker.Item label="Esmeraldas" value="7" />
                      <Picker.Item label="Galápagos" value="19" />
                      <Picker.Item label="Guayas" value="5" />
                      <Picker.Item label="Imbabura" value="10" />
                      <Picker.Item label="Loja" value="12" />
                      <Picker.Item label="Los Ríos" value="1" />
                      <Picker.Item label="Manabí" value="3" />
                      <Picker.Item label="Morona Santiago" value="16" />
                      <Picker.Item label="Napo" value="17" />
                      <Picker.Item label="Pichincha" value="8" />
                      <Picker.Item label="Santa Elena" value="2" />
                      <Picker.Item label="Santo Domingo de los Tsáchilas" value="4" />
                      <Picker.Item label="Sucumbíos" value="18" />
                      <Picker.Item label="Tungurahua" value="15" />
                      <Picker.Item label="Zamora Chinchipe" value="20" />
                    </Picker>
                  </View>

                  <Text style={styles.label}>Ciudad *</Text>
                  <View style={[
                    styles.pickerContainer, 
                    !formData.provincia && styles.pickerContainerDisabled
                  ]}>
                    <Picker
                      selectedValue={formData.ciudad}
                      onValueChange={(value) => updateFormData('ciudad', value)}
                      style={[
                        styles.picker,
                        !formData.provincia && styles.pickerDisabled
                      ]}
                      enabled={!!formData.provincia}
                    >
                      <Picker.Item label="Seleccionar una opción" value="" />
                      {formData.provincia && getCiudadesPorProvincia(formData.provincia).map((ciudad) => (
                        <Picker.Item key={ciudad.value} label={ciudad.label} value={ciudad.value} />
                      ))}
                    </Picker>
                  </View>

                  <Text style={styles.label}>Oficina *</Text>
                  <View style={[
                    styles.pickerContainer,
                    !formData.ciudad && styles.pickerContainerDisabled
                  ]}>
                    <Picker
                      selectedValue={formData.oficina}
                      onValueChange={(value) => updateFormData('oficina', value)}
                      style={[
                        styles.picker,
                        !formData.ciudad && styles.pickerDisabled
                      ]}
                      enabled={!!formData.ciudad}
                    >
                      <Picker.Item label="Seleccionar una opción" value="" />
                      {formData.provincia && formData.ciudad && getOficinasPorCiudad(formData.provincia, formData.ciudad).map((oficina) => (
                        <Picker.Item key={oficina.value} label={oficina.label} value={oficina.value} />
                      ))}
                    </Picker>
                  </View>
                </View>
              )}

              {/* Sección condicional para audiencia virtual */}
              {formData.tipoAudiencia === 'virtual' && (
                <View style={styles.section}>
                  <Text style={styles.label}>Comprobante de pago (PDF, JPG, JPEG, PNG, WEBP) *</Text>
                  <TouchableOpacity style={styles.fileButton} onPress={selectDocument}>
                    <MaterialIcons name="attach-file" size={20} color="#007AFF" />
                    <Text style={styles.fileButtonText}>
                      {formData.comprobantePago 
                        ? `Archivo seleccionado: ${formData.comprobantePago.name}` 
                        : 'Elegir archivos'}
                    </Text>
                  </TouchableOpacity>
                  {!formData.comprobantePago && (
                    <Text style={styles.fileHelperText}>Ningún archivo seleccionado</Text>
                  )}
                </View>
              )}

              {/* Botón de envío */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <MaterialIcons name="send" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.submitButtonText}>Enviar Solicitud</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD600',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#e3f7ff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183A7C',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  halfInput: {
    flex: 1,
  },
  thirdInput: {
    flex: 1,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  pickerDisabled: {
    height: 50,
    color: '#999',
  },
  pickerContainerDisabled: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    opacity: 0.6,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoText: {
    color: '#1565c0',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
  },
  fileButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    marginBottom: 5,
  },
  fileButtonText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  fileHelperText: {
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default AgendarArbitraje;
