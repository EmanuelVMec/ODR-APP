import React, { useState, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert,
    Image,
    Platform,
    Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Modal, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '@clerk/clerk-expo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
// Componentes
import Inicio from './modulos/Inicio';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Componente para convertir HTML y URLs en texto formateado
const LinkifiedText = ({ text }: { text: string }) => {
    // Función para limpiar y formatear HTML
    const parseHtmlText = (htmlText: string) => {
        return htmlText
            // Convertir <br> y <br/> a saltos de línea
            .replace(/<br\s*\/?>/gi, '\n')
            // Remover etiquetas <strong> y </strong>
            .replace(/<\/?strong>/gi, '')
            // Remover otras etiquetas HTML comunes pero mantener el contenido
            .replace(/<\/?[^>]+(>|$)/g, '')
            // Decodificar entidades HTML básicas
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            // Limpiar espacios múltiples pero preservar saltos de línea
            .replace(/[ \t]+/g, ' ')
            .trim();
    };

    // Función simplificada y robusta para detectar URLs
    const detectUrls = (inputText: string) => {
        const urlMatches: { start: number; end: number; url: string; type: 'http' | 'www' | 'email' }[] = [];

        // Patrón específico para URLs con http/https - optimizado para PayPal y servicios similares
        const httpUrls = inputText.match(/(https?:\/\/[^\s<>"\[\]{}|\\^`]+)/g) || [];
        httpUrls.forEach(url => {
            // Limpiar puntuación al final que no pertenece al URL
            let cleanUrl = url.replace(/[.,;!?)]+$/, '');

            // Verificar que el URL termine correctamente (especial para URLs con parámetros)
            // PayPal URLs oficiales y sandbox
            if (cleanUrl.includes('paypal.com')) {
                // Para URLs de PayPal (sandbox y producción), ser más permisivo con la detección
                const isProduction = !cleanUrl.includes('sandbox');
                console.log('🔵 URL de PayPal detectado:', cleanUrl);
                console.log('🔍 Parámetros detectados:', {
                    hasToken: cleanUrl.includes('token='),
                    hasCmd: cleanUrl.includes('cmd='),
                    environment: isProduction ? 'PRODUCCIÓN' : 'SANDBOX',
                    length: cleanUrl.length
                });
            }

            const index = inputText.indexOf(url);
            if (index !== -1) {
                urlMatches.push({
                    start: index,
                    end: index + cleanUrl.length,
                    url: cleanUrl,
                    type: 'http'
                });
            }
        });

        // Patrón para URLs con www (evitando duplicados manualmente)
        const wwwUrls = inputText.match(/www\.[^\s]+/g) || [];
        wwwUrls.forEach(url => {
            const cleanUrl = url.replace(/[.,;!?)]+$/, '');
            const index = inputText.indexOf(url);
            if (index !== -1) {
                // Verificar que no esté precedido por http:// o https://
                const prefix = inputText.substring(Math.max(0, index - 8), index);
                const hasHttpPrefix = prefix.includes('http://') || prefix.includes('https://');

                if (!hasHttpPrefix) {
                    // Verificar que no esté ya capturado
                    const isAlreadyCaptured = urlMatches.some(existing =>
                        index >= existing.start && index < existing.end
                    );
                    if (!isAlreadyCaptured) {
                        urlMatches.push({
                            start: index,
                            end: index + cleanUrl.length,
                            url: cleanUrl,
                            type: 'www'
                        });
                    }
                }
            }
        });

        // Patrón para emails
        const emails = inputText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        emails.forEach(email => {
            const index = inputText.indexOf(email);
            if (index !== -1) {
                // Verificar que no esté ya capturado
                const isAlreadyCaptured = urlMatches.some(existing =>
                    index >= existing.start && index < existing.end
                );
                if (!isAlreadyCaptured) {
                    urlMatches.push({
                        start: index,
                        end: index + email.length,
                        url: email,
                        type: 'email'
                    });
                }
            }
        });

        return urlMatches.sort((a, b) => a.start - b.start);
    };

    // Primero limpiar el HTML
    const cleanText = parseHtmlText(text);

    const urlMatches = detectUrls(cleanText);

    if (urlMatches.length === 0) {
        return <Text style={{ color: '#222', fontSize: 15, lineHeight: 22 }}>{cleanText}</Text>;
    }

    const parts: Array<{ text: string; isUrl: boolean; key: string; type?: 'http' | 'www' | 'email' }> = [];
    let lastIndex = 0;

    urlMatches.forEach((match, index) => {
        // Agregar texto antes del URL
        if (match.start > lastIndex) {
            parts.push({
                text: cleanText.slice(lastIndex, match.start),
                isUrl: false,
                key: `text-${index}`
            });
        }

        // Agregar el URL
        parts.push({
            text: match.url,
            isUrl: true,
            type: match.type,
            key: `url-${index}`
        });

        lastIndex = match.end;
    });

    // Agregar texto después del último URL
    if (lastIndex < cleanText.length) {
        parts.push({
            text: cleanText.slice(lastIndex),
            isUrl: false,
            key: 'text-end'
        });
    }

    return (
        <Text style={{ color: '#222', fontSize: 15, lineHeight: 22 }}>
            {parts.map((part) => {
                if (part.isUrl) {
                    let urlToOpen = part.text;

                    // Si es www sin protocolo, agregar https://
                    if (part.type === 'www') {
                        urlToOpen = `https://${part.text}`;
                    }
                    // Si es email, agregar mailto:
                    else if (part.type === 'email') {
                        urlToOpen = `mailto:${part.text}`;
                    }

                    return (
                        <Text
                            key={part.key}
                            style={{
                                color: urlToOpen.includes('paypal.com') ? '#0070ba' : '#0066cc', // Azul PayPal oficial para ambos entornos
                                textDecorationLine: 'underline',
                                fontWeight: '500',
                                backgroundColor: urlToOpen.includes('paypal.com') ? '#f0f8ff' : 'transparent', // Fondo sutil para PayPal
                                paddingHorizontal: urlToOpen.includes('paypal.com') ? 2 : 0,
                                borderRadius: urlToOpen.includes('paypal.com') ? 3 : 0,
                            }}
                            onPress={() => {
                                // Logging específico para PayPal
                                const isPayPalUrl = urlToOpen.includes('paypal.com');
                                console.log('=== DETECTANDO CLIC EN URL ===');
                                console.log('URL a abrir:', urlToOpen);
                                console.log('URL original detectada:', part.text);
                                console.log('Es URL de PayPal:', isPayPalUrl);
                                console.log('Tipo de URL:', part.type);
                                console.log('Longitud de URL:', urlToOpen.length);

                                if (isPayPalUrl) {
                                    const isProduction = !urlToOpen.includes('sandbox');
                                    console.log('🔵 ABRIENDO URL DE PAYPAL');
                                    console.log('🌍 Entorno:', isProduction ? 'PRODUCCIÓN 🟢' : 'SANDBOX 🟡');
                                    console.log('Token detectado:', urlToOpen.includes('token=') ? 'SÍ' : 'NO');
                                    console.log('Comando:', urlToOpen.includes('cmd=') ? 'SÍ' : 'NO');
                                    if (isProduction) {
                                        console.log('⚠️  ATENCIÓN: Este es un enlace de PayPal de PRODUCCIÓN');
                                    }
                                }

                                Linking.openURL(urlToOpen).catch(err => {
                                    console.error('❌ ERROR AL ABRIR URL:', err);
                                    console.error('URL que falló:', urlToOpen);
                                    if (isPayPalUrl) {
                                        Alert.alert(
                                            'Error PayPal',
                                            'No se pudo abrir el enlace de PayPal. Verifica tu conexión a internet e inténtalo nuevamente.'
                                        );
                                    } else {
                                        Alert.alert('Error', 'No se pudo abrir el enlace. Verifica tu conexión a internet.');
                                    }
                                });
                            }}
                        >
                            {part.text}
                        </Text>
                    );
                }

                return <Text key={part.key}>{part.text}</Text>;
            })}
        </Text>
    );
};

function ODRScreen({ navigation }: any) {
    // Bloquear botón físico de back en Android
    useEffect(() => {
        const backAction = () => true;
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);
    const { user } = require('@clerk/clerk-expo').useUser ? require('@clerk/clerk-expo').useUser() : { user: undefined };
    const [activeTab, setActiveTab] = useState('Inicio');
    const [menuVisible, setMenuVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(true); // Para WhatsApp
    const [perfilVisible, setPerfilVisible] = useState(false);
    const [chatbotVisible, setChatbotVisible] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [isResetting, setIsResetting] = useState(false); // Para evitar múltiples resets
    const [hasNewMessage, setHasNewMessage] = useState(false); // Notificación visual
    const [isUploadingDocument, setIsUploadingDocument] = useState(false); // Estado de carga para documentos

    const websocketRef = useRef<WebSocket | null>(null);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const handlePerfil = () => {
        setMenuVisible(false);
        setPerfilVisible(true);
    };

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const handleAbout = () => {
        setMenuVisible(false);
        Alert.alert('Acerca de', 'ODR Ecuador - Plataforma de información corporativa');
    };

    const { signOut } = useAuth();

    const handleLogout = () => {
        setMenuVisible(false);
        Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres cerrar sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sí',
                onPress: async () => {
                    try {
                        await signOut();
                    } catch { }
                    finally {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }
                }
            }
        ]);
    };

    const handleBackToMenu = () => {
        setMenuVisible(false);
        navigation.navigate('Menu');
    };

    const openChatbot = () => {
        setChatbotVisible(true);
        setHasNewMessage(false); // Limpiar notificación al abrir
        // Si no hay mensajes, mostrar opciones de empresa inmediatamente
        if (chatMessages.length === 0) {
            setTimeout(() => {
                setChatMessages([
                    {
                        from: 'bot',
                        text: '👋 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?\n\nPara ayudarte mejor, ¿con qué empresa deseas continuar?\n\n• ODR Ecuador – servicios de mediación y arbitraje (contratación de árbitros, casos, etc.)\n• Corp Naula – formación/capacitación y servicios relacionados\n\nPor favor elige una opción:',
                        options: ['ODR Ecuador', 'Corp Naula']
                    }
                ]);
            }, 500);
        }
    };

    const closeChatbot = () => {
        setChatbotVisible(false);
        setChatInput('');
        // NO desconectar WebSocket aquí
    };

    const sendChatMessage = () => {
        if (!chatInput.trim()) return;

        // Enviar mensaje al servidor
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.send(
                JSON.stringify({
                    message: chatInput,
                })
            );
        }

        // Agregar mensaje al estado local
        setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
        setChatInput('');
    };

    const sendOptionMessage = (optionText: string) => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.send(
                JSON.stringify({
                    message: optionText,
                })
            );
        }
        setChatMessages([...chatMessages, { from: 'user', text: optionText }]);
    };

    const resetChat = () => {
        if (isResetting) return;
        setIsResetting(true);
        // Cerrar WebSocket actual si existe
        if (websocketRef.current) {
            websocketRef.current.close();
        }
        // Crear nueva conexión WebSocket
        const websocket = new WebSocket('wss://chatbot-0-production.up.railway.app/chat/widget/odr/');
        websocketRef.current = websocket;

        websocket.onopen = () => {
            console.log('WebSocket reconectado tras reinicio');
            // Limpiar mensajes, no mostrar mensaje de bienvenida
            setChatMessages([]);
            setTimeout(() => {
                setIsResetting(false);
            }, 1000);
        };
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            let processedOptions = [];
            if (data.options) {
                if (Array.isArray(data.options)) {
                    processedOptions = data.options;
                } else if (typeof data.options === 'string') {
                    try {
                        processedOptions = JSON.parse(data.options);
                    } catch (e) {
                        processedOptions = [data.options];
                    }
                }
            }

            // Detectar automáticamente métodos de pago y agregar opciones si no las hay
            if (processedOptions.length === 0 && data.message) {
                const messageText = data.message.toLowerCase();
                const hasPaymentMethods = (
                    (messageText.includes('seleccione') || messageText.includes('selecciona') || messageText.includes('elige')) &&
                    (messageText.includes('1') && messageText.includes('2')) &&
                    (messageText.includes('paypal') || messageText.includes('payphone'))
                );

                if (hasPaymentMethods) {
                    processedOptions = ['PayPal', 'PayPhone'];
                }
            }

            setChatMessages((prevMessages) => {
                if (prevMessages.length === 0) {
                    return [
                        { from: 'bot', text: data.message, options: processedOptions },
                    ];
                }
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (data.message && data.message.includes('no entiendo tu mensaje') &&
                    lastMessage && lastMessage.text && lastMessage.text.includes('no entiendo tu mensaje')) {
                    return prevMessages;
                }
                return [
                    ...prevMessages,
                    { from: 'bot', text: data.message, options: processedOptions },
                ];
            });
            if (!chatbotVisible) setHasNewMessage(true);
        };
        websocket.onerror = (error) => {
            //Alert.alert('Conexión perdida', 'No se pudo conectar con el asistente. Intenta más tarde.');
        };
    };

    // Ocultar tooltip después de 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Abrir conexión WebSocket solo una vez al montar el componente
        const websocket = new WebSocket('wss://chatbot-0-production.up.railway.app/chat/widget/odr/');
        websocketRef.current = websocket;

        websocket.onopen = () => {
            console.log('WebSocket conectado');
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Procesar opciones: asegurar que sean un array
            let processedOptions = [];
            if (data.options) {
                if (Array.isArray(data.options)) {
                    processedOptions = data.options;
                } else if (typeof data.options === 'string') {
                    try {
                        processedOptions = JSON.parse(data.options);
                    } catch (e) {
                        processedOptions = [data.options];
                    }
                }
            }

            // Detectar automáticamente métodos de pago y agregar opciones si no las hay
            if (processedOptions.length === 0 && data.message) {
                const messageText = data.message.toLowerCase();
                const hasPaymentMethods = (
                    (messageText.includes('seleccione') || messageText.includes('selecciona') || messageText.includes('elige')) &&
                    (messageText.includes('1') && messageText.includes('2')) &&
                    (messageText.includes('paypal') || messageText.includes('payphone'))
                );

                if (hasPaymentMethods) {
                    processedOptions = ['PayPal', 'PayPhone'];
                }
            }

            // Evitar mensajes de error repetitivos (pero permitir mensajes de bienvenida)
            setChatMessages((prevMessages) => {
                if (prevMessages.length === 0) {
                    return [
                        { from: 'bot', text: data.message, options: processedOptions },
                    ];
                }
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (data.message && data.message.includes('no entiendo tu mensaje') &&
                    lastMessage && lastMessage.text && lastMessage.text.includes('no entiendo tu mensaje')) {
                    return prevMessages;
                }
                return [
                    ...prevMessages,
                    { from: 'bot', text: data.message, options: processedOptions },
                ];
            });
            // Notificación visual si el chat está cerrado
            if (!chatbotVisible) setHasNewMessage(true);
        };

        websocket.onerror = (error) => {
            //Alert.alert('Conexión perdida', 'No se pudo conectar con el asistente. Intenta más tarde.');
        };

        websocket.onclose = () => {
            //console.log('WebSocket desconectado');
        };

        return () => {
            websocket.close();
        };
    }, []);

    const menuItems = [
        { id: 'inicio', title: 'Inicio', component: <Inicio /> },
    ];

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf', // Solo archivos PDF
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const { name, size, uri, mimeType } = result.assets[0];

                // Validar que sea un PDF
                if (mimeType !== 'application/pdf' && !name.toLowerCase().endsWith('.pdf')) {
                    Alert.alert('Error', 'Solo se permiten archivos PDF');
                    return;
                }

                // Mostrar mensaje de carga en el chat
                setIsUploadingDocument(true);
                const loadingMessage: ChatMessage = {
                    from: 'user',
                    text: `📄 Subiendo documento: ${name}...`,
                    isLoading: true
                };
                setChatMessages(prevMessages => [...prevMessages, loadingMessage]);

                try {
                    // Determinar el tipo de documento basado en el nombre
                    let documentType = 'documento';
                    const fileName = name.toLowerCase();
                    if (fileName.includes('cedula') || fileName.includes('cédula')) {
                        documentType = 'cedula';
                    } else if (fileName.includes('titulo') || fileName.includes('título') || fileName.includes('senescyt')) {
                        documentType = 'titulo';
                    } else if (fileName.includes('hoja') || fileName.includes('cv')) {
                        documentType = 'hoja';
                    }

                    // Crear FormData para enviar el archivo al servidor
                    const formData = new FormData();
                    formData.append('file', {
                        uri: uri,
                        type: 'application/pdf',
                        name: name,
                    } as any);
                    formData.append('document_type', documentType);
                    formData.append('user_name', 'Usuario_Movil'); // Puedes cambiar esto por el nombre real del usuario

                    // Enviar archivo al servidor usando el endpoint correcto
                    const uploadResponse = await fetch('https://chatbot-0-production.up.railway.app/chat/upload/', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            // No incluir Content-Type para que React Native lo configure automáticamente
                        },
                    });

                    console.log('Response status:', uploadResponse.status);

                    // Remover mensaje de carga
                    setChatMessages(prevMessages => prevMessages.filter(msg => !msg.isLoading));
                    setIsUploadingDocument(false);

                    if (uploadResponse.ok) {
                        const uploadData = await uploadResponse.json();
                        console.log('Upload successful:', uploadData);

                        if (uploadData.success) {
                            const driveUrl = uploadData.drive_url;

                            // Crear el mensaje con el documento exitoso
                            const documentMessage: ChatMessage = {
                                from: 'user',
                                text: `✅ ${uploadData.message}`,
                                document: {
                                    name: name,
                                    uri: driveUrl,
                                    size: size,
                                    type: 'application/pdf'
                                }
                            };

                            // Agregar mensaje al chat
                            setChatMessages(prevMessages => [...prevMessages, documentMessage]);

                            // Enviar notificación al WebSocket
                            if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
                                console.log('Enviando mensaje de documento:', name);

                                // Formato: {documentType}_uploaded:{url}
                                websocketRef.current.send(JSON.stringify({
                                    message: `${documentType}_uploaded:${driveUrl}`
                                }));
                            }

                        } else {
                            throw new Error(uploadData.message || 'Error en la respuesta del servidor');
                        }

                    } else {
                        const errorText = await uploadResponse.text();
                        console.error('Server error response:', errorText);
                        console.error('Response status:', uploadResponse.status);
                        throw new Error(`Error del servidor: ${uploadResponse.status} - ${errorText}`);
                    }

                } catch (fileError) {
                    // Remover mensaje de carga en caso de error
                    setChatMessages(prevMessages => prevMessages.filter(msg => !msg.isLoading));
                    setIsUploadingDocument(false);

                    console.error('Error al procesar el archivo:', fileError);
                    const errorMessage = fileError instanceof Error ? fileError.message : 'Error desconocido';

                    // Mostrar mensaje de error en el chat
                    const errorChatMessage: ChatMessage = {
                        from: 'user',
                        text: `❌ Error al subir documento: ${errorMessage}`
                    };
                    setChatMessages(prevMessages => [...prevMessages, errorChatMessage]);
                }
            }
        } catch (error) {
            setIsUploadingDocument(false);
            console.error('Error al seleccionar documento:', error);
            Alert.alert('Error', 'Error al seleccionar el archivo');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="#1a2c6c" />

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            {/* <Image
                source={require('./assets/naula_logo.png')}
                style={styles.logo}
                resizeMode="contain"
              /> */}
                            <Text style={styles.headerTitle}>ODR Ecuador</Text>
                        </View>
                        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                            <Ionicons name="menu" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Barra de navegación horizontal */}
                    <View style={styles.navbar}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navbarContent}>
                            {menuItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.navItem, activeTab === item.title && styles.navItemActive]}
                                    onPress={() => setActiveTab(item.title)}
                                >
                                    <Text style={[styles.navText, activeTab === item.title && styles.navTextActive]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Contenido principal */}
                    <View style={styles.contentContainer}>
                        <ScrollView
                            style={styles.mainScrollView}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {menuItems
                                .filter(item => item.title === activeTab)
                                .map(item => (
                                    <View
                                        key={item.id}
                                        style={styles.componentContainer}
                                    >
                                        {item.component}
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>

                    {/* Menú hamburguesa overlay */}
                    {menuVisible && (
                        <>
                            <TouchableOpacity
                                style={styles.backdrop}
                                onPress={() => setMenuVisible(false)}
                                activeOpacity={1}
                            />
                            <View style={styles.overflowMenu}>
                                <TouchableOpacity style={styles.menuItem} onPress={handlePerfil}>
                                    <Ionicons name="person-circle" size={20} color="#2C3E50" style={styles.menuItemIcon} />
                                    <Text style={styles.menuItemText}>Perfil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
                                    <Ionicons name="information-circle" size={20} color="#2C3E50" style={styles.menuItemIcon} />
                                    <Text style={styles.menuItemText}>Acerca de</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                                    <Ionicons name="log-out" size={20} color="#E74C3C" style={styles.menuItemIcon} />
                                    <Text style={[styles.menuItemText, styles.logoutText]}>Cerrar Sesión</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {/* Botón flotante para abrir el chatbot */}
                    <TouchableOpacity style={styles.whatsappButton} onPress={openChatbot}>
                        {tooltipVisible && (
                            <View style={styles.whatsappTooltip}>
                                <Text style={styles.whatsappTooltipText}>¿Necesitas Ayuda?</Text>
                            </View>
                        )}
                        <Image
                            source={require('./assets/bot.png')}
                            style={{ width: 32, height: 32, resizeMode: 'contain' }}
                        />
                        {hasNewMessage && !chatbotVisible && (
                            <View style={{
                                position: 'absolute',
                                top: 2,
                                right: 2,
                                backgroundColor: '#ff4444',
                                borderRadius: 8,
                                width: 16,
                                height: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                                borderWidth: 2,
                                borderColor: '#fff',
                            }}>
                                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>!</Text>
                            </View>
                        )}
                    </TouchableOpacity>


                    {/* Chatbot flotante con WebView, header y botón de subir archivo */}
                    <Modal
                        visible={chatbotVisible}
                        animationType="slide"
                        transparent
                        onRequestClose={() => setChatbotVisible(false)}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'rgba(0,0,0,0.18)',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <SafeAreaView
                                style={{
                                    width: Math.max(Math.min(screenWidth * 0.98, 440), 220),
                                    minWidth: 180,
                                    maxWidth: 440,
                                    minHeight: Math.max(Math.min(screenHeight * 0.7, 700), 220),
                                    maxHeight: screenHeight * 0.98,
                                    backgroundColor: '#fff',
                                    borderRadius: 22,
                                    alignSelf: 'center',
                                    shadowColor: '#000',
                                    shadowOpacity: 0.10,
                                    shadowRadius: 8,
                                    elevation: 8,
                                    flexShrink: 1,
                                    flexGrow: 0,
                                    overflow: 'hidden',
                                    paddingBottom: 0,
                                }}
                            >
                                {/* Franja superior con saludo y X */}
                                {/* Franja superior absoluta con saludo y X */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 32,
                                        backgroundColor: '#3b63ff',
                                        borderTopLeftRadius: 22,
                                        borderTopRightRadius: 22,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingLeft: 12,
                                        paddingRight: 4,
                                        shadowColor: '#000',
                                        shadowOpacity: 0.08,
                                        shadowRadius: 3,
                                        elevation: 3,
                                        zIndex: 30,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontWeight: '500',
                                            fontSize: 13,
                                            flex: 1,
                                            textAlign: 'left',
                                        }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {`Hola${user?.firstName || user?.username ? ' ' + (user?.firstName || user?.username) : ''}`}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setChatbotVisible(false)}
                                        style={{
                                            backgroundColor: 'rgba(60,60,60,0.13)',
                                            borderRadius: 12,
                                            width: 24,
                                            height: 24,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 6,
                                        }}
                                    >
                                        <Ionicons name="close" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                                {/* WebView con paddingTop para no tapar la franja */}
                                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                                    <WebView
                                        source={{ uri: 'https://chatbot-0-production.up.railway.app/chat/widget/odr/' }}
                                        style={{ flex: 1, backgroundColor: 'transparent', paddingTop: 32 }}
                                        javaScriptEnabled
                                        domStorageEnabled
                                        startInLoadingState
                                    />
                                </View>
                            </SafeAreaView>
                        </View>
                    </Modal>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 15,
        backgroundColor: '#1a2c6c',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        zIndex: 50,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
            android: { elevation: 3 },
        }),
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 120,
        height: 30,
        marginRight: 12
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    menuButton: {
        padding: 8
    },
    navbar: {
        marginTop: 0,
        height: 60,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        justifyContent: 'center',
        zIndex: 10
    },
    navbarContent: {
        alignItems: 'center',
        paddingHorizontal: 15
    },
    navItem: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 20
    },
    navItemActive: {
        backgroundColor: '#3b63ff'
    },
    navText: {
        color: '#2C3E50',
        fontSize: 14,
        fontWeight: '500'
    },
    navTextActive: {
        color: '#fff',
        fontWeight: '700'
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    mainScrollView: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        padding: 0,
        paddingBottom: 0,
    },
    componentContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 100
    },
    overflowMenu: {
        position: 'absolute',
        top: 60,
        right: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 8,
        minWidth: 180,
        zIndex: 101,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
            android: { elevation: 8 },
        }),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    menuItemIcon: {
        marginRight: 12,
        width: 24
    },
    menuItemText: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '500'
    },
    logoutText: {
        color: '#E74C3C'
    },
    whatsappButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#25D366',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    whatsappTooltip: {
        position: 'absolute',
        bottom: 70,
        right: 0,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 5,
        elevation: 3,
    },
    whatsappTooltipText: {
        color: '#333',
        fontSize: 12,
    }
});

interface ChatMessage {
    from: 'user' | 'bot';
    text: string;
    options?: string[];
    isLoading?: boolean;
    document?: {
        name: string;
        uri: string;
        size?: number;
        type: string;
    };
}

export default ODRScreen;
