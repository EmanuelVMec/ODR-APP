import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen: React.FC = () => {
  const { isLoaded, signIn } = useSignIn();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signIn.create({ identifier: email });
      // Buscar el emailAddressId correcto
      const emailFactor = signIn.supportedFirstFactors?.find(
        (factor) => factor.strategy === 'reset_password_email_code'
      );
      if (!emailFactor || !emailFactor.emailAddressId) {
        throw new Error('No se encontró el emailAddressId para recuperación.');
      }
      await signIn.prepareFirstFactor({ strategy: 'reset_password_email_code', emailAddressId: emailFactor.emailAddressId });
      setStep(2);
      Alert.alert('Código enviado', 'Revisa tu correo para el código de recuperación.');
    } catch (err: any) {
      let msg = 'No se pudo enviar el código.';
      if (err?.errors && err.errors[0]?.message) {
        msg = err.errors[0].message;
      } else if (err?.message) {
        msg = err.message;
      }
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  // Validaciones de contraseña
  const passwordValidations = [
    { label: 'Al menos 8 caracteres', valid: newPassword.length >= 8 },
    { label: 'Una mayúscula', valid: /[A-Z]/.test(newPassword) },
    { label: 'Una minúscula', valid: /[a-z]/.test(newPassword) },
    { label: 'Un número', valid: /[0-9]/.test(newPassword) },
    { label: 'Un carácter especial', valid: /[^A-Za-z0-9]/.test(newPassword) },
  ];
  const isPasswordValid = passwordValidations.every(v => v.valid);

  const handleResetPassword = async () => {
    if (!isLoaded) return;
    if (!isPasswordValid) {
      Alert.alert('Contraseña inválida', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      return;
    }
    setLoading(true);
    try {
      await signIn.attemptFirstFactor({ strategy: 'reset_password_email_code', code, password: newPassword });
      Alert.alert('Éxito', 'Contraseña restablecida. Ahora puedes iniciar sesión.');
      setStep(1);
      setEmail('');
      setCode('');
      setNewPassword('');
      navigation.navigate('Login' as never);
    } catch (err) {
      Alert.alert('Error', 'No se pudo restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar contraseña</Text>
        {step === 1 ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendCode} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar código'}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Código de verificación"
              value={code}
              onChangeText={setCode}
            />
            <View style={{ width: '100%', position: 'relative', marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 18, top: 10 }}
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {/* Validación visual de contraseña */}
            {newPassword.length > 0 && (
              <View style={{ marginBottom: 8 }}>
                {passwordValidations.map((v, i) => (
                  <Text key={i} style={{ color: v.valid ? '#4caf50' : '#ff5252', fontSize: 12 }}>
                    {v.valid ? '✓' : '✗'} {v.label}
                  </Text>
                ))}
              </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Restableciendo...' : 'Restablecer contraseña'}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
