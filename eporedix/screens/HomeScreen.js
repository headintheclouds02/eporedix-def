import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function HomeScreen( { navigation } ) {

  return (
    <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
            title="Go to Profile"
            onPress={() => navigation.navigate('Profile')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});