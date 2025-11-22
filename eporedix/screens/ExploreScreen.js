import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import events1 from '../data/1events.json';
import events2 from '../data/2events.json';
import events30 from '../data/30events.json';
import events31 from '../data/31events.json';
import { Ionicons } from '@expo/vector-icons';


const days = [
  { label: '30 Maggio', value: '2024-05-30', events: events30 },
  { label: '31 Maggio', value: '2024-05-31', events: events31 },
  { label: '1 Giugno', value: '2024-06-01', events: events1 },
  { label: '2 Giugno', value: '2024-06-02', events: events2 },
];

export default function ExploreScreen({ navigation }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = days[selectedDayIndex].value;

  const filteredEvents = days[selectedDayIndex].events.sort((a, b) => a.time.localeCompare(b.time));

  const handlePrev = () => {
    if (selectedDayIndex > 0) setSelectedDayIndex(selectedDayIndex - 1);
  };

  const handleNext = () => {
    if (selectedDayIndex < days.length - 1) setSelectedDayIndex(selectedDayIndex + 1);
  };

  return (
    <View style={styles.container}>
      {/* Navigazione giorni */}
      <View style={styles.dayNavWrapper}>
        <View style={styles.dayNavTop}>
          <Text style={styles.dayNavText}>{days[selectedDayIndex].label}</Text>
        </View>
        <View style={styles.dayNavBottom}>
          <TouchableOpacity
            style={styles.dayNavBtn}
            onPress={handlePrev}
            disabled={selectedDayIndex === 0}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dayNavBtn}
            onPress={handleNext}
            disabled={selectedDayIndex === days.length - 1}
          >
            <Ionicons name="arrow-forward-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetailEvent', { event: item })}>
            <View style={styles.eventCard}>
              <Text style={styles.eventTime}>{item.time}</Text>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventLocation}>{item.location}</Text>
              <Text style={styles.eventDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nessun evento per questa giornata.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F7F3EF', marginTop: 0 },
  dayNavWrapper: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: '#E3E0DE',
    borderRadius: 32,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  dayNavTop: {
    backgroundColor: '#C0746D',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingVertical: 24,
    paddingHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    zIndex: 2,
  },
  dayNavBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E3E0DE',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 32,
    paddingVertical: 14,
    width: 300,
    marginTop: -12,
    zIndex: 1,
  },
  dayNavText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },
  dayNavBtn: {
    backgroundColor: '#C0746D',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 12,
    opacity: 1,
    marginTop: 20,
  },

  eventCard: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Ombra per Android
    elevation: 4,
  },
  eventTime: { fontWeight: 'bold', fontSize: 16 },
  eventTitle: { fontSize: 16, marginTop: 4 },
  eventLocation: { fontStyle: 'italic', color: '#666', marginTop: 2 },
  eventDescription: { marginTop: 4, color: '#444' },
});