import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Animated, Image, ScrollView } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen: React.FC = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');

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

	// Validaciones de contraseña
	const passwordValidations = [
		{ label: 'Al menos 8 caracteres', valid: password.length >= 8 },
		{ label: 'Una mayúscula', valid: /[A-Z]/.test(password) },
		{ label: 'Una minúscula', valid: /[a-z]/.test(password) },
		{ label: 'Un número', valid: /[0-9]/.test(password) },
		{ label: 'Un carácter especial', valid: /[^A-Za-z0-9]/.test(password) },
	];
	const isPasswordValid = passwordValidations.every(v => v.valid);

	// Validación de usuario
	const usernameValid = /^[A-Za-z0-9_]+$/.test(username) && !username.includes(' ');

	const onSignUpPress = async () => {
		if (!isLoaded) return;
		if (!email || !firstName || !lastName || !username || !password) {
			Alert.alert('Error', 'Completa todos los campos.');
			return;
		}
		if (!usernameValid) {
			Alert.alert('Usuario inválido', 'El usuario solo puede contener letras, números y guion bajo, sin espacios.');
			return;
		}
		if (!isPasswordValid) {
			Alert.alert('Contraseña inválida', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
			return;
		}
		try {
			await signUp.create({
				emailAddress: email,
				username: username,
				password,
				firstName,
				lastName,
			});
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
			setPendingVerification(true);
		} catch (err) {
			Alert.alert('Error', 'No se pudo registrar.');
		}
	};

	const onVerifyPress = async () => {
		if (!isLoaded) return;
		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
			if (signUpAttempt.status === 'complete') {
				await setActive({ session: signUpAttempt.createdSessionId });
				Alert.alert('Éxito', 'Registro y verificación completos.', [
					{
						text: 'OK',
						onPress: () => {
							// Redirigir a ODR (inicio) después de verificar
							if (navigation && navigation.reset) {
								navigation.reset({ index: 0, routes: [{ name: 'ODR' as never }] });
							}
						},
					},
				]);
			} else {
				Alert.alert('Verificación pendiente', 'Revisa tu correo.');
			}
		} catch (err) {
			Alert.alert('Error', 'Código incorrecto.');
		}
	};

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
					{/* Scroll principal para que todo sea visible con teclado */}
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
							{pendingVerification ? (
								<>
									<Text style={styles.title}>Verifica tu correo</Text>
									<TextInput
										style={styles.input}
										placeholder="Código de verificación"
										value={code}
										onChangeText={setCode}
										placeholderTextColor="#8fa1c7"
									/>
									<TouchableOpacity style={styles.button} onPress={onVerifyPress}>
										<Text style={styles.buttonText}>Verificar</Text>
									</TouchableOpacity>
								</>
							) : (
								<>
									<Text style={styles.title}>Registrarse</Text>
									<TextInput
										style={styles.input}
										placeholder="Nombre"
										value={firstName}
										onChangeText={setFirstName}
										autoCapitalize="words"
										placeholderTextColor="#8fa1c7"
									/>
									<TextInput
										style={styles.input}
										placeholder="Apellido"
										value={lastName}
										onChangeText={setLastName}
										autoCapitalize="words"
										placeholderTextColor="#8fa1c7"
									/>
									<TextInput
										style={styles.input}
										placeholder="Correo electrónico"
										value={email}
										onChangeText={setEmail}
										autoCapitalize="none"
										placeholderTextColor="#8fa1c7"
									/>
									<TextInput
										style={styles.input}
										placeholder="Nombre de usuario"
										value={username}
										onChangeText={setUsername}
										autoCapitalize="none"
										placeholderTextColor="#8fa1c7"
									/>
									{/* Validación visual de usuario */}
									{username.length > 0 && (
										<Text style={{ color: usernameValid ? '#4caf50' : '#ff5252', marginBottom: 8, fontSize: 13 }}>
											{usernameValid ? 'Usuario válido' : 'Solo letras, números y guion bajo. Sin espacios.'}
										</Text>
									)}
									<View style={{ width: '100%', position: 'relative', marginBottom: 16 }}>
										<TextInput
											style={styles.input}
											placeholder="Contraseña"
											value={password}
											onChangeText={setPassword}
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
									{password.length > 0 && (
										<View style={{ marginBottom: 8 }}>
											{passwordValidations.map((v, i) => (
												<Text key={i} style={{ color: v.valid ? '#4caf50' : '#ff5252', fontSize: 12 }}>
													{v.valid ? '✓' : '✗'} {v.label}
												</Text>
											))}
										</View>
									)}
									<TouchableOpacity style={styles.button} onPress={onSignUpPress}>
										<Text style={styles.buttonText}>Continuar</Text>
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

export default RegisterScreen;


