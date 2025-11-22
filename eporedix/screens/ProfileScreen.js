import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';



export default function ProfileScreen({ navigation }) {

  return (
    
    <View>
        <Text>Profile Screen</Text>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 12,
  },
  
  list: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  emptyStateTitle: {
    textAlign: 'center',
    paddingBottom: 8,
  },
  emptyStateSubtitle: {

    paddingHorizontal: 40,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});