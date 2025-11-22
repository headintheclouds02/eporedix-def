import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

type Event = {
  title: string;
  time: string;
  location: string;
  description: string;
  image?: string;
};

type Props = {
  event: Event;
  onClose?: () => void;
  onBook?: () => void;
};

export default function DetailEvent({ event, onClose, onBook }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.imageWrapper}>
        {event.image && (
          <Image source={{ uri: event.image }} style={styles.eventImage} />
        )}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeBtnText}>←</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.time}>{event.time}</Text>
        <Text style={styles.location}>{event.location}</Text>

        <Text style={styles.sectionTitle}>Dettagli dell'evento</Text>
        <ScrollView style={{ maxHeight: 90 }}>
          <Text style={styles.description}>{event.description}</Text>
        </ScrollView>

        <Text style={styles.sectionTitle}>Ospiti</Text>
        <View style={styles.guestsRow}>
          {/* Placeholder ospiti */}
          <View style={styles.guestPlaceholder} />
          <View style={styles.guestPlaceholder} />
          <View style={styles.guestPlaceholder} />
        </View>

        <TouchableOpacity>
          <Text style={styles.mapLink}>Vedi sulla mappa</Text>
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareIcon}>⤴</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookBtn} onPress={onBook}>
            <Text style={styles.bookBtnText}>Prenota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(60,60,60,0.15)",
    justifyContent: "flex-end",
  },
  imageWrapper: {
    alignItems: "center",
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    resizeMode: "cover",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 6,
    elevation: 2,
  },
  closeBtnText: {
    fontSize: 20,
    color: "#C0746D",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 8,
    marginTop: -24,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B2E2B",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#C0746D",
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: "#7C5C5C",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    color: "#C0746D",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  guestsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  guestPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E3E0DE",
  },
  mapLink: {
    color: "#4B2E2B",
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 4,
    textDecorationLine: "underline",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  shareBtn: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E3E0DE",
  },
  shareIcon: {
    fontSize: 18,
    color: "#C0746D",
  },
  bookBtn: {
    backgroundColor: "#C0746D",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#C0746D",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  bookBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});