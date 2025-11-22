import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const icons: Record<string, any> = {
  Home: require('../assets/icons/Home.png'),
  Explore: require('../assets/icons/Explore.png'),
  Profile: require('../assets/icons/Profile.png'),
};

export default function TabBarCustom({ state, navigation }: BottomTabBarProps) {
  return (
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
            style={[styles.tab, isFocused && styles.tabFocused]}
          >
            <Image
              source={icons[route.name]}
              style={[
                styles.icon,
                isFocused && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  tabFocused: {
    backgroundColor: '#F5E5E5',
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#8B4545',
    borderRadius: 12,
  },
  iconFocused: {
    opacity: 1,
  },
});