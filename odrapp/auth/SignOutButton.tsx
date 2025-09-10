import React from 'react';
import { useClerk } from '@clerk/clerk-expo';
import { Text, TouchableOpacity } from 'react-native';

const SignOutButton = () => {
	const { signOut } = useClerk();
	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (err) {
			// Manejo de error opcional
		}
	};
	return (
		<TouchableOpacity onPress={handleSignOut} style={{ marginTop: 20 }}>
			<Text style={{ color: 'red', fontWeight: 'bold' }}>Cerrar sesión</Text>
		</TouchableOpacity>
	);
};

export default SignOutButton;
