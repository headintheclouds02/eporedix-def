import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = require("../../assets/battaglia_lobbies.json");
const details = require("../../assets/battaglia_dettagli.json");
const images = {
  piazza_ferrucci: require("../../assets/images_lobby/piazza_ferrucci.jpg"),
  piazza_ottinetti: require("../../assets/images_lobby/piazza_ottinetti.jpg"),
  piazza_gioberti: require("../../assets/images_lobby/piazza_gioberti.jpg"),
  piazza_balla: require("../../assets/images_lobby/piazza_balla.jpg"),
};

export default function LobbyScreen() {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}
      onPress={() => {
        const d = details.find((e) => e.id === item.id);
        const event = d ? { title: d.title, time: d.time, location: "Centro di Ivrea", description: d.description } : { title: item.title, time: "", location: "Centro di Ivrea", description: "" };
        navigation.navigate("LobbyDetailEvent", { event });
      }}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.stepsRow}>
          <Text style={styles.stepsIcon}>👣</Text>
          <Text style={styles.stepsText}>{item.steps} passi</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Image source={images[item.image]} style={styles.cardImage} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tutte le Lobby</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3EF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4B2E2B",
    textAlign: "center",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
    alignItems: "center",
  },
  separator: {
    height: 4,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#d9d9d9",
    marginVertical: 6,
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#ece7e7ff",
    borderRadius: 18,
    overflow: "hidden",
    width: "90%",
    height: 126,
    marginBottom: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBubble: {
    backgroundColor: "#EFE7DF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 14,
    color: "#4B2E2B",
    textAlign: "center",
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginTop: 10,
  },
  cardRight: {
    width: "45%",
    height: "100%",
  },
  stepsIcon: {
    fontSize: 22,
    color: "#4B2E2B",
  },
  stepsText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4B2E2B",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
});