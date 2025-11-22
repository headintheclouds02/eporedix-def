import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ICON_DARK_MODE = require("../assets/icons/dark_mode.png");
const ICON_LANGUAGE = require("../assets/icons/language.png");
const ICON_CHANGE_MODE = require("../assets/icons/change_mod.png");

export default function ProfileScreen({ route }) {
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const progress = 0.7;
    const AVATAR = route?.params?.character?.image || require("../assets/images_profile/img_1.png");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenTitle}>Profilo</Text>

            <View style={styles.profileCard}>
                <View style={styles.avatarWrapper}>
                    <Image source={AVATAR} style={styles.avatar} />
                </View>
                <Text style={styles.name}>Mario Rossi</Text>
                <Text style={styles.email}>mario.rossi@gmail.com</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Il tuo avanzamento</Text>
                <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressValue}>70 %</Text>
                </View>
                <Text style={styles.caption}>Hai visitato 6 monumenti su 16</Text>
            </View>

            <View style={styles.settingCard}>
                <View style={styles.settingLeft}>
                    <Image source={ICON_DARK_MODE} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Modalità Scura</Text>
                </View>
                <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: "#dfd8d3", true: "#b1635b" }}
                    thumbColor="#ffffff"
                />
            </View>

            <TouchableOpacity style={styles.settingCard} activeOpacity={0.8}>
                <View style={styles.settingLeft}>
                    <Image source={ICON_LANGUAGE} style={styles.settingIcon} />
                    <View>
                        <Text style={styles.settingLabel}>Lingua</Text>
                        <Text style={styles.settingSubLabel}>Italiano</Text>
                    </View>
                </View>
                <Text style={styles.chevron}>{">"}</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionLabel, styles.modeLabel]}>La tua modalità attuale</Text>
            <TouchableOpacity style={styles.modeButton} activeOpacity={0.85} onPress={() => navigation.navigate("ChooseMode")}
            >
                <Image source={ICON_CHANGE_MODE} style={styles.modeIcon} />
                <Text style={styles.modeText}>Cambia modalità</Text>
                
                <Text style={styles.chevronLight}>{">"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f0eb",
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    screenTitle: {
        fontFamily: "Playfair Display",
        fontSize: 24,
        color: "#734848",
        textAlign: "center",
        marginBottom: 18,
    },
    profileCard: {
        backgroundColor: "#efe7df",
        borderRadius: 18,
        paddingVertical: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    avatarWrapper: {
        width: 118,
        height: 86,
        borderRadius: 24,
        // backgroundColor: "#f6f1ec",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#f1d9c4",
    },
    badge: {
        position: "absolute",
        bottom: 6,
        right: 18,
        backgroundColor: "#3d69e1",
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 20,
        marginTop: -1,
    },
    name: {
        fontFamily: "Playfair Display",
        fontSize: 20,
        color: "#a15c53",
        marginBottom: 4,
    },
    email: {
        color: "#a15c53",
        fontSize: 14,
    },
    section: {
        marginTop: 26,
        marginBottom: 10,
    },
    sectionLabel: {
        color: "#81605b",
        fontSize: 16,
        marginBottom: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressTrack: {
        flex: 1,
        height: 24,
        backgroundColor: "#d9d1cb",
        borderRadius: 20,
        marginRight: 12,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#a4524b",
    },
    progressValue: {
        color: "#a4524b",
        fontSize: 18,
        fontWeight: "700",
    },
    caption: {
        marginTop: 12,
        textAlign: "center",
        color: "#7c6a65",
    },
    settingCard: {
        backgroundColor: "#efe7df",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 14,
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingLabel: {
        color: "#7b625d",
        fontSize: 15,
        fontWeight: "600",
    },
    settingSubLabel: {
        color: "#b4a29d",
        fontSize: 13,
    },
    chevron: {
        color: "#9c8a83",
        fontSize: 18,
        marginLeft: 12,
    },
    chevronLight: {
        color: "#efe7df",
        fontSize: 18,
        marginLeft: 12,
    },
    modeLabel: {
        marginTop: 24,
        marginBottom: 10,
        textAlign: "left",
    },
    modeButton: {
        backgroundColor: "#b05f55",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    modeIcon: {
        width: 25,
        height: 25,
        borderRadius: 10,
        marginRight: 20,
    },
    modeText: {
        color: "#f7f0eb",
        fontSize: 15,
        fontWeight: "600",
        flex: 1,
    },
    settingIcon: {
        width: 25,
        height: 25,
        marginRight: 20,
        borderRadius: 8,
        padding: 2

    },
});