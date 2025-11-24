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

export default function LobbyDetailEvent(props: Props) {
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
      source={require("../assets/backgroundLobby1.jpg")}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ width: "100%", height: "100%", opacity: 0.25 }}
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeBtnText}>←</Text>
      </TouchableOpacity>
      <View style={styles.centeredContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.time}>{event.time}</Text>
          <Text style={styles.location}>{event.location}</Text>

          <Text style={styles.sectionTitle}>Dettagli</Text>
          <Text style={styles.description}>{event.description}</Text>

          <Text style={styles.sectionTitleAzzurra}>Persone interessate</Text>
          <View style={styles.guestsRow}>
            <View style={styles.guestPlaceholder} />
            <View style={styles.guestPlaceholder} />
            <View style={styles.guestPlaceholder} />
            <View style={styles.guestPlaceholder} />
          </View>

          <Text style={styles.sectionTitleAzzurra}>Persone nelle vicinanze</Text>
          <View style={styles.guestsRow}>
            <View style={styles.guestPlaceholder} />
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
              <Text style={styles.bookBtnText}>Mi interessa</Text>
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
    width: '100%',
    height: '100%', 
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
    color: "#222",
    fontWeight: "bold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: "#F7F7F4",
    borderRadius: 24,
    padding: 22,
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#222",
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: "#222",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    color: "#222",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  sectionTitleAzzurra: {
    fontSize: 15,
    color: "#7DB8B3",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#222",
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
    marginRight: 8,
  },
  mapLink: {
    color: "#222",
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 4,
    textDecorationLine: "underline",
    fontSize: 15,
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
    marginRight: 8,
  },
  shareIcon: {
    fontSize: 18,
    color: "#7DB8B3",
  },
  bookBtn: {
    backgroundColor: "#7DB8B3",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 48,
    alignItems: "center",
    shadowColor: "#7DB8B3",
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