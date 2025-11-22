import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context"; // aggiungi questa importazione

const icons: Record<string, any> = {
  Home: require("../assets/icons/Home.png"),
  Explore: require("../assets/icons/Explore.png"),
  Profile: require("../assets/icons/Profile.png"),
};

const activeColor = "#F7F3EF";
const inactiveColor = "#C48C8C";

export default function TabBarCustom({ state, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}> 
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tab}
            >
              <View style={[styles.iconBg, isFocused && styles.iconBgFocused]}>
                <Image
                  source={icons[route.name]}
                  style={[
                    styles.icon,
                    { tintColor: isFocused ? activeColor : inactiveColor },
                  ]}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F7F3EF",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#F7F3EF",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  iconBg: {
    padding: 10,
    borderRadius: 16,
  },
  iconBgFocused: {
    backgroundColor: "#C0746D",
    paddingHorizontal: 32,
  },
  icon: {
    width: 28,
    height: 28,
  },
});