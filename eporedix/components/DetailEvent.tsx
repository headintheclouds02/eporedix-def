import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type Event = {
  title: string;
  time: string;
  location: string;
  description: string;
};

type Props = {
  event?: Event;
  onClose?: () => void;
  onBook?: () => void;
};

export default function DetailEvent(props: Props) {
  const navigation = useNavigation();
  const route = useRoute();

  const event: Event | undefined =
    props.event || (route.params && (route.params as any).event);
  const onClose = props.onClose || (() => navigation.goBack());

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nessun evento selezionato.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/detail_background.png")}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ opacity: 0.25 }}
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeBtnText}>←</Text>
      </TouchableOpacity>
      <View style={styles.centeredContainer}>
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
            <TouchableOpacity style={styles.bookBtn} onPress={props.onBook}>
              <Text style={styles.bookBtnText}>Prenota</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F7F0EB",
  },
  closeBtn: {
    position: "absolute",
    top: 70,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 6,
    elevation: 2,
    zIndex: 2,
  },
  closeBtnText: {
    fontSize: 20,
    color: "#C0746D",
    fontWeight: "bold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
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
