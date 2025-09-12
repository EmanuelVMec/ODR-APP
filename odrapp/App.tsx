import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';
import ODRScreen from './ODRScreen';
import { useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Componente Home que decide a qué pantalla ir según sesión
const Home = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'ODR' as never }] });
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }
  return null;
};

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar contraseña' }} />
          <Stack.Screen name="ODR" component={ODRScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ClerkProvider>
  );
}
