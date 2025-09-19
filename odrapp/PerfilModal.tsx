import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, Image, ActivityIndicator } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PerfilModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Cambiar foto de perfil
  const handlePickImage = async () => {
    if (!user) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: false,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUploading(true);
      try {
        const uri = result.assets[0].uri;
        // Leer la imagen como base64 (compatible Expo Go)
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const file = `data:image/jpeg;base64,${base64}`;
        await user.setProfileImage({ file });
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      } catch (err) {
        Alert.alert('Error', 'No se pudo actualizar la foto');
      } finally {
        setImageUploading(false);
      }
    }
  };
  const handleSave = async () => {
    if (!isLoaded || !user) return;
    setLoading(true);
    try {
      await user.update({ firstName, lastName, username });
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      onClose();
    } catch (err: any) {
      Alert.alert('Error', err?.errors?.[0]?.message || 'No se pudo actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Foto de perfil */}
          <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage} disabled={imageUploading}>
            {imageUploading ? (
              <View style={styles.avatarLoading}><ActivityIndicator size="large" color="#007AFF" /></View>
            ) : (
              <>
                <Image
                  source={user?.imageUrl ? { uri: user.imageUrl } : require('./assets/icon.png')}
                  style={styles.avatar}
                />
                <Text style={styles.cambiarFoto}>Cambiar foto</Text>
              </>
            )}
          </TouchableOpacity>
          <Text style={[styles.title, { color: '#000' }]}>Editar Perfil</Text>
          <TextInput
            style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
            placeholder="Apellido"
            placeholderTextColor="#888"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
            placeholder="Usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#ff0000ff' }]} onPress={onClose} disabled={loading}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
    marginBottom: 6,
  },
  avatarLoading: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cambiarFoto: {
    color: '#007AFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 14,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PerfilModal;
