// src/screens/Auth/loginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

// ─── Paleta de colores alineada con el Home ────────────────────────────
const COLORS = {
  primary: '#800020',      // Vinotinto
  background: '#F8F8F8',   // Gris casi blanco
  white: '#FFFFFF',
  darkText: '#222222',
  secondaryText: '#555555',
  gray: '#888888',
  border: '#D9D9D9',
};

export default function LoginScreen({ navigation, onContinue }) {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (typeof onContinue === 'function') {
      onContinue();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('UserHome');
      return;
    }

    console.log('Continuar con:', email);
  };

  const handleGoogle = () => {
    // TODO: implementar OAuth con Google
    console.log('Continuar con Google');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── HEADER: imagen de comida con degradado ── */}
          <View style={styles.headerContainer}>
            <ImageBackground
              source={{
                uri: 'https://pixabay.com/es/images/download/pexels-beans-1834984_1920.jpg',
              }}
              style={styles.headerImage}
              resizeMode="cover"
            >
              {/* Badge de marca sobre la imagen */}
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Ionicons name="restaurant" size={22} color={COLORS.primary} />
                  <Text style={styles.badgeText}>ZacualEats</Text>
                </View>
              </View>

              {/* Degradado inferior que se funde con el fondo */}
              <LinearGradient
                colors={['transparent', 'rgba(248,248,248,0.7)', '#F8F8F8']}
                locations={[0.3, 0.72, 1]}
                style={styles.headerGradient}
              />
            </ImageBackground>
          </View>

          {/* ── FORMULARIO ── */}
          <View style={styles.formContainer}>
            {/* Título */}
            <Text style={styles.title}>Te damos la bienvenida a</Text>
            <Text style={styles.brandTitle}>ZacualEats</Text>
            <Text style={styles.subtitle}>Ingresa tu correo para continuar</Text>

            {/* Input de correo */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={COLORS.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleContinue}
              />
            </View>

            {/* Botón principal Vinotinto */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
              activeOpacity={0.82}
            >
              <Text style={styles.primaryButtonText}>Continuar</Text>
            </TouchableOpacity>

            {/* ── Separador ── */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorLabel}>o</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* ── Botón Google (Outline) ── */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogle}
              activeOpacity={0.82}
            >
              <AntDesign name="google" size={20} color="#DB4437" style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ── Header ──────────────────────────────────────────────
  headerContainer: {
    height: height * 0.36,
    overflow: 'hidden',
  },
  headerImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.2,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 6,
  },

  // ── Formulario ──────────────────────────────────────────
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkText,
    textAlign: 'center',
    lineHeight: 32,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: 28,
  },

  // ── Input ───────────────────────────────────────────────
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: COLORS.darkText,
  },

  // ── Botón principal ─────────────────────────────────────
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // ── Separador ───────────────────────────────────────────
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  separatorLabel: {
    marginHorizontal: 12,
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '500',
  },

  // ── Botón Google ────────────────────────────────────────
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkText,
  },
});
