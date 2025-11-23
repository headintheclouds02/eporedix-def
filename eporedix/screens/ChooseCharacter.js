import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


const characters = [
    {
        name: "Adriano Olivetti",
        image: require("../assets/images_profile/img_1.png"),
    },
    {
        name: "Alessandro Slabir",
        image: require("../assets/images_profile/img_2.png"),
    },
    {
        name: "La Mugnaia",
        image: require("../assets/images_profile/img_3.png"),
    },
    {
        name: "Camillo Olivetti",
        image: require("../assets/images_profile/img_4.png"),
    },
];

export default function ChooseCharacter({ navigation }) {
    const [selected, setSelected] = useState(null);

    const handleNext = async () => {
        if (selected !== null) {
            const mode = (await AsyncStorage.getItem('mode')) || 'explore';
            navigation.replace("Main", { character: characters[selected], mode });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.centeredContent}>
                <Text style={styles.title}>Scegli il tuo personaggio</Text>
                <Text style={styles.subtitle}>Potrai modificarlo in seguito</Text>
                <View style={styles.grid}>
                    {characters.map((char, idx) => (
                        <TouchableOpacity
                            key={char.name}
                            style={[
                                styles.card,
                                selected === idx && styles.cardSelected,
                            ]}
                            onPress={() => setSelected(idx)}
                            activeOpacity={0.8}
                        >
                            <Image source={char.image} style={styles.avatar} />
                            <Text style={styles.name}>{char.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <SafeAreaView edges={["bottom"]} style={styles.safeArea}>

                <Pressable
                    style={[
                        styles.button,
                        selected === null && styles.buttonDisabled,
                    ]}
                    onPress={handleNext}
                    disabled={selected === null}
                >
                    <Text style={styles.buttonText}>Avanti</Text>
                </Pressable>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F3EF",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    centeredContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4B2E2B",
        fontFamily: "serif",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#7C5C5C",
        textAlign: "center",
        marginBottom: 32,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 32,
        gap: 16,
    },
    card: {
        width: 150,
        alignItems: "center",
        margin: 8,
        paddingVertical: 8,
        borderRadius: 50,
        backgroundColor: "#F7F3EF",
        borderWidth: 2,
        borderColor: "transparent",
        padding: 30,
    },
    cardSelected: {
        borderColor: "#C0746D",
        backgroundColor: "#F3E0DC",
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 36,
        marginBottom: 8,
        // backgroundColor: "#E0E0E0",
    },
    name: {
        fontSize: 15,
        color: "#4B2E2B",
        textAlign: "center",
        fontWeight: "600",
        fontFamily: "serif",
    },
    button: {
        width: "90%",
        backgroundColor: "#C0746D",
        paddingVertical: 14,
        borderRadius: 18,
        alignItems: "center",
        marginBottom: 32,
    },
    buttonDisabled: {
        backgroundColor: "#E0CFCB",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    safeArea: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F7F3EF",
  },
});