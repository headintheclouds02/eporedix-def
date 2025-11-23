import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    try {
      const raw = await AsyncStorage.getItem('user');

      if (!raw) {
        setError('Credenziali non valide');
        return;
      }
      const saved = JSON.parse(raw);

      // Normalizza email dell’input e quella salvata
      const inputEmail = email.trim().toLowerCase();
      const savedEmail = (saved.email || '').trim().toLowerCase();


      if (savedEmail === inputEmail && saved.password === password) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.reset({ index: 0, routes: [{ name: 'Main' as never }] });
        setError('');
      } else {
        setError('Credenziali non valide');
      }
    } catch {}
  };

  return (
    <ImageBackground
      source={require('../assets/sfondo_splash.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: 'center' }}
        keyboardVerticalOffset={40}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Inserisci i tuoi dati e inizia la tua avventura!</Text>

          <View style={styles.form}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#d9d9d9"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordWrapper}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#d9d9d9"
                style={styles.input}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeText}>{showPassword ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Accedi</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Hai già un account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
              <Text style={styles.footerLink}>REGISTRATI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1b2d',
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'Playfair Display',
  },
  subtitle: {
    color: '#d9d9d9',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 260,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    color: '#ffffff',
    marginBottom: 26,
  },
  button: {
    width: '100%',
    backgroundColor: '#b06a6a',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 12, 22, 0.45)'
  },
  content: {
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  footerText: {
    color: '#d9d9d9',
    fontSize: 14,
  },
  footerLink: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    color: '#c54949',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 6,
    padding: 8,
  },
  eyeText: {
    color: '#d9d9d9',
    fontSize: 18,
  },
});