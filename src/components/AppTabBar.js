import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#800020',
  surface: '#FFFFFF',
  text: '#6F5F5F',
  shadow: '#000000',
};

const TABS = [
  {
    key: 'home',
    label: 'Inicio',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    key: 'orders',
    label: 'Pedidos',
    icon: 'shopping-outline',
    activeIcon: 'shopping',
  },
  {
    key: 'profile',
    label: 'Perfil',
    icon: 'account-outline',
    activeIcon: 'account',
  },
];

export default function AppTabBar({ activeTab, onTabPress }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.86}
              onPress={() => onTabPress(tab.key)}
            >
              {isActive ? (
                <View style={styles.activeIconWrap}>
                  <MaterialCommunityIcons
                    name={tab.activeIcon}
                    size={26}
                    color={COLORS.surface}
                  />
                </View>
              ) : (
                <MaterialCommunityIcons name={tab.icon} size={27} color={COLORS.text} />
              )}

              <Text style={isActive ? styles.activeLabel : styles.label}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 14,
    paddingBottom: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 16,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 78,
  },
  activeIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginBottom: 8,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});