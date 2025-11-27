import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import BottomSheetMonument from '../components/BottomSheetMonument';
const monuments = require('../data/monuments.json');

export default function HomeScreen({ route }) {
  // Usa il personaggio passato, oppure uno di default
  const character = route?.params?.character || {
    name: "Adriano Olivetti",
    image: require('../assets/images_profile/img_1.png'),
  };
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const center = route?.params?.center;

  useEffect(() => {
    if (center && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        600
      );
    }
  }, [center]);

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
        ref={mapRef}
      >
        {monuments.map((m) => (
          <Marker key={m.id} coordinate={{ latitude: m.lat, longitude: m.lng }} onPress={() => setSelected(m)}>
            <View style={styles.monumentMarker}>
              <Text style={styles.monumentIcon}>🏛️</Text>
            </View>
          </Marker>
        ))}
        <Marker coordinate={{ latitude: 45.4669, longitude: 7.8765 }} />
      </MapView>

      {selected ? (
        <BottomSheetMonument
          monument={selected}
          suggested={monuments.filter((m) => m.id !== selected.id).slice(0, 3)}
          onClose={() => setSelected(null)}
          onGo={() => {
            if (mapRef.current && selected) {
              mapRef.current.animateToRegion(
                {
                  latitude: selected.lat,
                  longitude: selected.lng,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                },
                600
              );
            }
          }}
          onSelectMonument={(m) => setSelected(m)}
        />
      ) : null}

      {/* Box di benvenuto */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Benvenuto a Ivrea</Text>
        <Text style={styles.welcomeSubtitle}>Scopri la Grande Invasione con noi!</Text>
      </View>

      {/* Card personaggio */}
      <View style={styles.characterCard}>
        <Image
          source={character.image}
          style={styles.avatar}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Segui il percorso di{'\n'}{character.name.split(' ')[0]}
          </Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Inizia</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
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
  monumentMarker: {
    backgroundColor: '#C0746D',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#b35f5f',
  },
  monumentIcon: {
    color: '#F7F3EF',
    fontSize: 16,
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
  characterCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: '#E0E0E0',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B2E2B',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#C0746D',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#C0746D',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    fontSize: 22,
    color: '#4B2E2B',
    fontWeight: 'bold',
  },
});
