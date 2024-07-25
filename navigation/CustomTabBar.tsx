import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : route.name;
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            <Ionicons
              name={
                isFocused
                  ? route.name === 'Home'
                    ? 'home'
                    : route.name === 'Exchange'
                    ? 'swap-horizontal'
                    : route.name === 'Market Analysis'
                    ? 'analytics'
                    : 'person'
                  : route.name === 'Home'
                  ? 'home-outline'
                  : route.name === 'Exchange'
                  ? 'swap-horizontal-outline'
                  : route.name === 'Market Analysis'
                  ? 'analytics-outline'
                  : 'person-outline'
              }
              size={isFocused ? 30 : 24}
              color={isFocused ? '#3700b3' : 'gray'}
            />
            {isFocused && <Text style={styles.tabLabel}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeTab: {
    backgroundColor: '#000000', // Background color for the active tab
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3700b3',
  },
});

export default CustomTabBar;
