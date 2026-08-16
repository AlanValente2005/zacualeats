/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import LoginScreen from './src/screens/Auth/loginScreen';
import AppTabBar from './src/components/AppTabBar';
import OrdersScreen from './src/screens/Orders/OrdersScreen';
import HomeScreen from './src/screens/User/HomeScreen';
import RestaurantMenuScreen from './src/screens/User/RestaurantMenuScreen';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.profileSafeArea}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileTitle}>Perfil</Text>
        <Text style={styles.profileSubtitle}>Próximamente</Text>
      </View>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'tabs' | 'detail'>('login');
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const handleTabPress = (tab: 'home' | 'orders' | 'profile') => {
    setActiveTab(tab);
    setCurrentScreen('tabs');
  };

  if (currentScreen === 'detail') {
    return (
      <View style={styles.appShell}>
        <RestaurantMenuScreen
          restaurant={selectedRestaurant}
          onGoBack={() => setCurrentScreen('tabs')}
        />
        <AppTabBar activeTab="home" onTabPress={handleTabPress} />
      </View>
    );
  }

  if (currentScreen === 'tabs') {
    const screenContent =
      activeTab === 'home' ? (
        <HomeScreen
          onSelectRestaurant={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setCurrentScreen('detail');
          }}
        />
      ) : activeTab === 'orders' ? (
        <OrdersScreen />
      ) : (
        <ProfileScreen />
      );

    return (
      <View style={styles.appShell}>
        {screenContent}
        <AppTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    );
  }

  return <LoginScreen onContinue={() => setCurrentScreen('tabs')} />;
}

export default App;

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  profileSafeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 96,
  },
  profileTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#3D2D2D',
    marginBottom: 8,
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#7E6D6D',
  },
});
