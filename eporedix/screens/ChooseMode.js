import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// const infoIcon = require("../assets/icons/info.png");
const background = require("../assets/icons/background.png");

export default function ChooseMode({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={background} style={styles.background} resizeMode="cover" />
      <View style={styles.overlay}>
        {/* Card Esplora */}
        <TouchableOpacity
          style={[styles.card, styles.cardTop]}
          activeOpacity={0.8}
          onPress={() => navigation.replace("Main")}
        >
          <Text style={styles.cardText}>Esplora</Text>
          {/* <Image source={infoIcon} style={styles.infoIcon} /> */}
        </TouchableOpacity>
        {/* Card Battaglia */}
        <TouchableOpacity
          style={[styles.card, styles.cardBottom]}
          activeOpacity={0.8}
          onPress={() => navigation.replace("Main")}
        >
          <Text style={styles.cardText}>Battaglia</Text>
          {/* <Image source={infoIcon} style={styles.infoIcon} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 260,
    height: 80,
    backgroundColor: "rgba(247,243,239,0.85)",
    marginVertical: 25,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  cardTop: {
    transform: [{ rotate: "18deg" }],
  },
  cardBottom: {
    transform: [{ rotate: "18deg" }],
  },
  cardText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4B2E2B",
    fontFamily: "serif",
    marginRight: 18,
  },
  infoIcon: {
    width: 22,
    height: 22,
    tintColor: "#4B2E2B",
  },
});
