import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen: React.FC = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');

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
		if (!email || !username || !password) {
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
				Alert.alert('Éxito', 'Registro y verificación completos.');
			} else {
				Alert.alert('Verificación pendiente', 'Revisa tu correo.');
			}
		} catch (err) {
			Alert.alert('Error', 'Código incorrecto.');
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
		>
		<View style={styles.container}>
			{pendingVerification ? (
				<>
					<Text style={styles.title}>Verifica tu correo</Text>
					<TextInput
						style={styles.input}
						placeholder="Código de verificación"
						value={code}
						onChangeText={setCode}
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
						placeholder="Correo electrónico"
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
					/>
					<TextInput
						style={styles.input}
						placeholder="Nombre de usuario"
						value={username}
						onChangeText={setUsername}
						autoCapitalize="none"
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

export default RegisterScreen;
