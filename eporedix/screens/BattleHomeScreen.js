import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

export default function BattleHomeScreen({ route }) {
  // Usa il personaggio passato, oppure uno di default
  const character = route?.params?.character || {
    name: "Adriano Olivetti",
    image: require('../assets/images_profile/img_1.png'),
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 45.4669,
          longitude: 7.8765,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 45.4669, longitude: 7.8765 }} />
      </MapView>

      {/* Box di benvenuto */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Benvenuto a Ivrea</Text>
        <Text style={styles.welcomeSubtitle}>Scopri la Grande Invasione con noi!</Text>
      </View>

      {/* Card in basso */}
      <View style={styles.lobbyCard}>
        <Text style={styles.lobbyTitle}>Raggiungi la lobby{'\n'}più vicina</Text>
        <TouchableOpacity style={styles.lobbyButton} disabled>
          <Text style={styles.lobbyButtonText}>Inizia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  welcomeBox: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    backgroundColor: '#ffffffb3',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 28,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B2E2B',
    textAlign: 'center',
    marginBottom: 2,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#7C5C5C',
    textAlign: 'center',
  },
  lobbyCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
    backgroundColor: '#ffffffcc', // bianco trasparente
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  lobbyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  lobbyButton: {
    backgroundColor: '#B9D6D2', // azzurro chiaro
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 60,
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.5, // effetto disabilitato
    marginTop: 2,
  },
  lobbyButtonText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
