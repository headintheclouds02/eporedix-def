import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        <Text style={styles.title}>Registrati</Text>
        <Text style={styles.subtitle}>Inserisci i tuoi dati e inizia la tua avventura!</Text>

        <View style={styles.form}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome e cognome"
            placeholderTextColor="#d9d9d9"
            style={styles.input}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#d9d9d9"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#d9d9d9"
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Conferma Password"
            placeholderTextColor="#d9d9d9"
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChooseMode' as never)}>
          <Text style={styles.buttonText}>Registrati</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Hai già un account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.footerLink}>ACCEDI</Text>
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
    marginBottom: 100,
  },
  form: {
    marginBottom: 30,
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
});