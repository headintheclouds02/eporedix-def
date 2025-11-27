import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

type Monument = {
  id: string;
  title: string;
  description: string;
  steps: number;
  image?: string;
};

type RootStackParamList = {
  MonumentDetail: { monument: Monument };
};

type Props = {
  monument: Monument;
  onClose: () => void;
  onGo: () => void;
  suggested?: Monument[];
  onSelectMonument?: (m: Monument) => void;
};

const images: Record<string, any> = {
  img_1: require('../assets/images_monumenti/santuario_monte_stella.jpg'),
  img_2: require('../assets/images_monumenti/piazza_ottinetti.jpg'),
  img_3: require('../assets/images_monumenti/torre_civica.jpg'),
  img_4: require('../assets/images_monumenti/duomo_ivrea.jpg'),
  img_5: require('../assets/images_monumenti/chiesa_san_bernardino.jpg'),
  img_6: require('../assets/images_monumenti/castello.jpg'),
  
};

export default function BottomSheetMonument({ monument, onClose, onGo, suggested = [], onSelectMonument }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const headerImage = monument.image ? images[monument.image] : images.img_1;
  return (
    <View style={styles.sheet}>
      <View style={styles.headerImageWrap}>
        <Image source={headerImage} style={styles.headerImage} />
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{monument.title}</Text>
        <Text style={styles.description}>{monument.description}</Text>
        <View style={styles.row}>
          <View style={styles.stepsRow}>
            <Text style={styles.stepsIcon}>👣</Text>
            <Text style={styles.stepsText}>{monument.steps} passi</Text>
          </View>
          <TouchableOpacity style={styles.goBtn} onPress={onGo}>
            <Text style={styles.goText}>Vai</Text>
          </TouchableOpacity>
        </View>
        {suggested.length > 0 ? (
          <View style={styles.suggestSection}>
            <Text style={styles.suggestTitle}>Potresti visitare anche:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestRow}>
              {suggested.map((s) => (
                <TouchableOpacity key={s.id} style={styles.suggestCard} onPress={() => navigation.navigate('MonumentDetail', { monument: s })}>
                  <Image source={images[s.image || 'img_1']} style={styles.suggestImage} />
                  <Text numberOfLines={1} style={styles.suggestLabel}>{s.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  headerImageWrap: {
    height: 180,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#ffffffcc',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  closeText: {
    fontSize: 20,
    color: '#4B2E2B',
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B2E2B',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B2E2B',
    opacity: 0.85,
    marginBottom: 12,
    textAlign: "justify",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepsIcon: {
    fontSize: 20,
    color: '#4B2E2B',
  },
  stepsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B2E2B',
  },
  goBtn: {
    backgroundColor: '#C0746D',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  goText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  suggestSection: {
    marginTop: 16,
  },
  suggestTitle: {
    fontSize: 14,
    color: '#4B2E2B',
    fontWeight: '700',
    marginBottom: 8,
  },
  suggestRow: {
    gap: 12,
    paddingRight: 12,
  },
  suggestCard: {
    width: 120,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  suggestImage: {
    width: '100%',
    height: 74,
  },
  suggestLabel: {
    fontSize: 12,
    color: '#4B2E2B',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
