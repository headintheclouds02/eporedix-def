import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  avatar: any;
  stepsDone: number;
  stepsGoal: number;
  distanceKm: number;
  onExit: () => void;
};

export default function RouteProgressSheet({ avatar, stepsDone, stepsGoal, distanceKm, onExit }: Props) {
  const progress = Math.min(1, stepsDone / Math.max(1, stepsGoal));

  return (
    <View style={styles.sheet}>
      <View style={styles.row}>
        <View style={styles.avatarWrap}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
          </View>
        </View>

        <View style={styles.progressWrap}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>Passi completati: {stepsDone}/{stepsGoal}</Text>
          <Text style={styles.distanceLabel}>Distanza rimanente: {distanceKm.toFixed(2)} km</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.exitBtn} onPress={onExit}>
        <Text style={styles.exitText}>Esci</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    marginRight: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0E0E0',
  },
  percentBadge: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#E3E0DE',
  },
  percentText: { fontSize: 12, color: '#4B2E2B' },
  progressWrap: { flex: 1 },
  progressBarBg: {
    height: 14,
    backgroundColor: '#E3E0DE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#C0746D',
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#4B2E2B',
    fontWeight: '700',
  },
  distanceLabel: {
    fontSize: 13,
    color: '#7C5C5C',
  },
  exitBtn: {
    marginTop: 12,
    backgroundColor: '#C0746D',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  exitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

