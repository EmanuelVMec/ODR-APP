import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Animated, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	ODR: undefined;
};

const LoginScreen: React.FC = () => {
	const { signIn, setActive, isLoaded } = useSignIn();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	
	// Animación para el logo
	const logoOpacity = useRef(new Animated.Value(0)).current;
	const logoScale = useRef(new Animated.Value(0.5)).current;
	
	// Animaciones para el fondo
	const backgroundAnimation = useRef(new Animated.Value(0)).current;
	const backgroundColorAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Animación de entrada del logo y fondo
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

		// Animación de color de fondo continua
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

	const handleLogin = async () => {
		if (!isLoaded) return;
		setLoading(true);
		try {
			// Refresca el estado de signIn para evitar problemas de caché
			await signIn.reload();
			const signInAttempt = await signIn.create({ identifier, password });
			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId });
				navigation.reset({
					index: 0,
					routes: [{ name: 'ODR' }],
				});
			} else {
				Alert.alert('Atención', 'Verifica tu correo o completa pasos adicionales.');
			}
		} catch (err: any) {
			let msg = 'Credenciales incorrectas';
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
							backgroundColor: '#2541b222', // azul más oscuro
							opacity: 0.8, // un poco más visible
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
							backgroundColor: '#ffd60077', // amarillo más oscuro
							opacity: 0.6, // un poco más visible
						}}
					/>
				</Animated.View>
				<View style={styles.container}>
					{/* Tarjeta central */}
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
						
						<Text style={styles.title}>Iniciar Sesión</Text>
						<TextInput
							style={styles.input}
							placeholder="Email o Usuario"
							value={identifier}
							onChangeText={setIdentifier}
							autoCapitalize="none"
							placeholderTextColor="#8fa1c7"
						/>
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
						<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
							<Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Entrar'}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
							<Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
							<Text style={styles.linkSec}>¿No tienes cuenta? <Text style={{ color: '#3b63ff', fontWeight: 'bold' }}>Regístrate</Text></Text>
						</TouchableOpacity>
					</View>
				</View>
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
		width: 140,
		height: 90,
		marginBottom: 21,
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
	link: {
		color: '#3b63ff',
		marginTop: 10,
		marginBottom: 10,
		fontSize: 15,
		fontWeight: '500',
		textAlign: 'center',
	},
	linkSec: {
		color: '#888',
		marginTop: 6,
		fontSize: 15,
		textAlign: 'center',
	},
});

export default LoginScreen;
