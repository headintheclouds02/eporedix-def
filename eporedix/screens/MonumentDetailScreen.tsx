import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type Monument = {
  id: string;
  title: string;
  description: string;
  steps: number;
  image?: string;
  lat?: number;
  lng?: number;
};

const images: Record<string, any> = {
  img_1: require('../assets/images_monumenti/santuario_monte_stella.jpg'),
  img_2: require('../assets/images_monumenti/piazza_ottinetti.jpg'),
  img_3: require('../assets/images_monumenti/torre_civica.jpg'),
  img_4: require('../assets/images_monumenti/duomo_ivrea.jpg'),
  img_5: require('../assets/images_monumenti/chiesa_san_bernardino.jpg'),
  img_6: require('../assets/images_monumenti/castello.jpg'),
};

export default function MonumentDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const monument: Monument = (route.params as any)?.monument;

  const headerImage = monument?.image && images[monument.image] ? images[monument.image] : images.img_1;

  return (
    <ImageBackground source={require('../assets/detail_background.png')} style={styles.background} resizeMode="cover">
      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.closeBtnText}>←</Text>
      </TouchableOpacity>
      <View style={styles.centeredContainer}>
        <View style={styles.card}>
          <View style={styles.headerImageWrap}>
            <Image source={headerImage} style={styles.headerImage} />
          </View>
          <Text style={styles.title}>{monument?.title || 'Dettaglio monumento'}</Text>
          <ScrollView style={{ maxHeight: 140 }}>
            <Text style={styles.description}>{monument?.description || ''}</Text>
          </ScrollView>
          <View style={styles.row}>
            <View style={styles.stepsRow}>
              <Text style={styles.stepsIcon}>👣</Text>
              <Text style={styles.stepsText}>{monument?.steps} passi</Text>
            </View>
            <TouchableOpacity
              style={styles.goBtn}
              onPress={() => {
                if (monument?.lat && monument?.lng) {
                  (navigation as any).navigate('Main', {
                    screen: 'Home',
                    params: { center: { lat: monument.lat, lng: monument.lng } },
                  });
                } else {
                  (navigation as any).navigate('Main', { screen: 'Home' });
                }
              }}
            >
              <Text style={styles.goText}>Vai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#F7F0EB' },
  closeBtn: {
    position: 'absolute',
    top: 70,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    elevation: 2,
    zIndex: 2,
  },
  closeBtnText: { fontSize: 20, color: '#C0746D', fontWeight: 'bold' },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    width: '95%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  headerImageWrap: { height: 160, borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  headerImage: { width: '100%', height: '100%' },
  title: { fontSize: 18, fontWeight: '700', color: '#4B2E2B', marginBottom: 8 },
  description: { fontSize: 14, color: '#4B2E2B', opacity: 0.85, marginBottom: 12, textAlign: 'justify' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepsIcon: { fontSize: 20, color: '#4B2E2B' },
  stepsText: { fontSize: 18, fontWeight: '700', color: '#4B2E2B' },
  goBtn: { backgroundColor: '#C0746D', borderRadius: 18, paddingHorizontal: 22, paddingVertical: 10 },
  goText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
