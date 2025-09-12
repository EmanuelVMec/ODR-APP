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
				<View style={styles.container}>
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
					/>
					<View style={{ width: '100%', position: 'relative', marginBottom: 16 }}>
						<TextInput
							style={styles.input}
							placeholder="Contraseña"
							value={password}
							onChangeText={setPassword}
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
					<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
						<Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Entrar'}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
						<Text style={{ color: '#007AFF', marginTop: 10, marginBottom: 10 }}>¿Olvidaste tu contraseña?</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
						<Text style={{ color: '#007AFF', marginTop: 6 }}>¿No tienes cuenta? Regístrate</Text>
					</TouchableOpacity>
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
		backgroundColor: '#fff',
	},
	logoContainer: {
		marginBottom: -20,
		alignItems: 'center',
		top: -70,
	},
	logo: {
		width: 170,
		height: 130,
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

export default LoginScreen;
