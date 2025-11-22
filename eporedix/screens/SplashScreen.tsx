import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const slides = [
    {
      title: 'Metti alla prova il tuo passo',
      description:
        'Partecipa alle sfide sportive pensate per la Grande Invasione. Accumula punti, confrontati con gli altri partecipanti e vivi l’energia della città in movimento.',
    },
    {
      title: 'Scopri Ivrea camminando',
      description:
        'Segui i percorsi guidati, esplora i luoghi simbolo e lasciati sorprendere dalle tappe interattive. L’app diventa la tua bussola per vivere Ivrea a piedi, senza perderti nulla.',
    },
    {
      title: 'Sempre al centro dell’azione',
      description:
        'Consulta il programma in tempo reale, trova facilmente attività e punti d’interesse e resta aggiornato su tutto ciò che accade durante la Grande Invasione – Sport.',
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate('Signup' as never);
    }
  };

  return (
    <ImageBackground 
    source={require('../assets/sfondo_splash.png')}
    style={styles.container}
    resizeMode="cover"
  >
    <View style={styles.content}>
      <Text style={styles.title}>{slides[index].title}</Text>
      <Text style={styles.description}>{slides[index].description}</Text>
    </View>

    <View style={styles.footer}>
      

      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]} />
        ))}
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1b2d',
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#d9d9d9',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  footer: {
    alignItems: 'center',
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 22,
    height: 16,
    borderRadius: 10,
  },
  dotActive: {
    backgroundColor: '#ffffff',
    width: 40,
  },
  dotInactive: {
    backgroundColor: '#C0746D',
    opacity: 0.6,
  },
  button: {
    width: '100%',
    backgroundColor: '#C0746D',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});