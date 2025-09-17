import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Animated, Image, ScrollView } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

  // Animación para el logo
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  // Animaciones para el fondo
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const backgroundColorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColorAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColorAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
        >
          {/* Fondo con gradiente */}
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#f5f8ff',
            }}
          >
            <Animated.View
              style={{
                position: 'absolute',
                top: -120,
                left: -80,
                width: 350,
                height: 350,
                borderRadius: 180,
                backgroundColor: '#2541b222',
                opacity: 0.8,
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                bottom: -100,
                right: -80,
                width: 320,
                height: 320,
                borderRadius: 160,
                backgroundColor: '#ffd60077',
                opacity: 0.6,
              }}
            />
          </Animated.View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'transparent' }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              {/* Logo con animación */}
              <Animated.View
                style={[
                  styles.logoContainer,
                  {
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }],
                  },
                ]}
              >
                <Image
                  source={require('../assets/LOGO GENERAL.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animated.View>
              <Text style={styles.title}>Recuperar contraseña</Text>
              {step === 1 ? (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor="#8fa1c7"
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
                    placeholderTextColor="#8fa1c7"
                  />
                  <View style={{ width: '100%', position: 'relative', marginBottom: 16 }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nueva contraseña"
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#8fa1c7"
                    />
                    <TouchableOpacity
                      style={{ position: 'absolute', right: 18, top: 10 }}
                      onPress={() => setShowPassword((prev) => !prev)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color="#8fa1c7"
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  card: {
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 36,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#3b63ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 8,
  },
  logoContainer: {
    marginBottom: 0,
    alignItems: 'center',
    top: -30,
  },
  logo: {
    width: 120,
    height: 90,
    marginBottom: 10,
    top: 27,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1a2c6c',
    letterSpacing: 0.2,
  },
  input: {
    width: '100%',
    height: 46,
    borderColor: '#e3e8f0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 14,
    backgroundColor: '#f7faff',
    fontSize: 16,
    color: '#1a2c6c',
    shadowColor: '#3b63ff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#3b63ff',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
    marginBottom: 10,
    shadowColor: '#3b63ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.2,
  },
});

export default ForgotPasswordScreen;
