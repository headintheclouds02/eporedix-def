import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import BottomSheetMonument from '../components/BottomSheetMonument';
const monuments = require('../data/monuments.json');
import { useNavigation } from '@react-navigation/native';
import RouteProgressSheet from '../components/RouteProgressSheet';
import * as Location from 'expo-location';

export default function HomeScreen({ route }) {
  // Usa il personaggio passato, oppure uno di default
  const character = route?.params?.character || {
    name: "Adriano Olivetti",
    image: require('../assets/images_profile/img_1.png'),
  };
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const center = route?.params?.center;
  const navigation = useNavigation();
  const [routeActive, setRouteActive] = useState(false);
  const [routeTarget, setRouteTarget] = useState(null);
  const [stepsDone, setStepsDone] = useState(0);
  const [userPos, setUserPos] = useState({ lat: 45.4669, lng: 7.8765 });
  const [showCard, setShowCard] = useState(true);
  const [routeLine, setRouteLine] = useState([]);
  const [routeCursor, setRouteCursor] = useState(0);
  const locationSub = useRef(null);
  const prevPosRef = useRef(null);
  const outAlertShownRef = useRef(false);

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

  const makeRouteLine = (slat, slng, elat, elng, segments = 20) => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      pts.push({ latitude: slat + (elat - slat) * t, longitude: slng + (elng - slng) * t });
    }
    return pts;
  };

  useEffect(() => {
    const startWatch = async () => {
      const fg = await Location.requestForegroundPermissionsAsync();
      if (fg.status !== 'granted') return;
      if (locationSub.current) return;
      locationSub.current = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, distanceInterval: 5 }, (loc) => {
        const lat = loc.coords.latitude;
        const lng = loc.coords.longitude;
        setUserPos({ lat, lng });
        const prev = prevPosRef.current;
        if (prev) {
          const d = haversineKm(prev.lat, prev.lng, lat, lng) * 1000;
          setStepsDone((s) => Math.min(s + Math.round(d / 0.8), routeTarget ? (routeTarget.steps || 1000) : s));
        }
        prevPosRef.current = { lat, lng };
        const distKm = haversineKm(lat, lng, 45.4669, 7.8765);
        if (routeActive && distKm > 10 && !outAlertShownRef.current) {
          outAlertShownRef.current = true;
          Alert.alert('Attenzione', 'impossibile seguire il percorso. Perchè non ti trovi nella città di Ivrea');
          setRouteActive(false);
          setRouteTarget(null);
          setRouteLine([]);
          if (locationSub.current) { locationSub.current.remove(); locationSub.current = null; }
        }
      });
    };
    if (routeActive) startWatch();
    return () => {};
  }, [routeActive]);

  const haversineKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startRoute = async () => {
    const target = selected || monuments[0];
    if (!target) return;
    setRouteTarget(target);
    setStepsDone(0);
    let startLat = 45.4669;
    let startLng = 7.8765;
    try {
      const fg = await Location.requestForegroundPermissionsAsync();
      if (fg.status === 'granted') {
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        startLat = pos.coords.latitude;
        startLng = pos.coords.longitude;
        setUserPos({ lat: startLat, lng: startLng });
        prevPosRef.current = { lat: startLat, lng: startLng };
      } else {
        setUserPos({ lat: startLat, lng: startLng });
        prevPosRef.current = { lat: startLat, lng: startLng };
      }
    } catch (e) {
      setUserPos({ lat: startLat, lng: startLng });
      prevPosRef.current = { lat: startLat, lng: startLng };
    }
    const distKm = haversineKm(startLat, startLng, 45.4669, 7.8765);
    if (distKm > 10) {
      Alert.alert('Attenzione', 'impossibile seguire il percorso. Perchè non ti trovi nella città di Ivrea');
      return;
    }
    outAlertShownRef.current = false;
    setRouteActive(true);
    setRouteCursor(0);
    try {
      const url = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${target.lng},${target.lat}?overview=full&geometries=geojson&alternatives=true&annotations=duration,distance`;
      const res = await fetch(url);
      const json = await res.json();
      const routes = Array.isArray(json?.routes) ? json.routes : [];
      const best = routes.length > 0 ? routes.reduce((min, r) => (r.duration < min.duration ? r : min), routes[0]) : null;
      const coords = best?.geometry?.coordinates || [];
      if (Array.isArray(coords) && coords.length > 0) {
        const line = coords.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
        setRouteLine(line);
      } else {
        setRouteLine(makeRouteLine(45.4669, 7.8765, target.lat, target.lng, 30));
      }
    } catch (e) {
      setRouteLine(makeRouteLine(45.4669, 7.8765, target.lat, target.lng, 30));
    }
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: target.lat,
          longitude: target.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        600
      );
    }
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
        ref={mapRef}
      >
        {routeLine.length > 0 ? (
          <Polyline coordinates={routeLine} strokeColor="#C0746D" strokeWidth={4} />
        ) : null}
        {routeActive ? (
          <Marker coordinate={{ latitude: userPos.lat, longitude: userPos.lng }}>
            <Image source={character.image} style={{ width: 32, height: 32, borderRadius: 16 }} />
          </Marker>
        ) : null}
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
          onGo={() => { startRoute(); }}
          onSelectMonument={(m) => { setSelected(null); navigation.navigate('MonumentDetail', { monument: m }); }}
        />
      ) : null}

      {/* Box di benvenuto */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Benvenuto a Ivrea</Text>
        <Text style={styles.welcomeSubtitle}>Scopri la Grande Invasione con noi!</Text>
      </View>

      {/* Card personaggio */}
      {showCard ? (<View style={styles.characterCard}>
        <Image
          source={character.image}
          style={styles.avatar}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Segui il percorso di{'\n'}{character.name.split(' ')[0]}
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={startRoute}>
            <Text style={styles.startButtonText}>Inizia</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => setShowCard(false)}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>) : null}

      {routeActive && routeTarget ? (
        <RouteProgressSheet
          avatar={character.image}
          stepsDone={stepsDone}
          stepsGoal={routeTarget.steps || 1000}
          distanceKm={haversineKm(userPos.lat, userPos.lng, routeTarget.lat, routeTarget.lng)}
          onExit={() => {
            setRouteActive(false);
            setRouteTarget(null);
            setStepsDone(0);
            if (locationSub.current) { locationSub.current.remove(); locationSub.current = null; }
            outAlertShownRef.current = false;
          }}
        />
      ) : null}
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
