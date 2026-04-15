/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import LoginScreen from './src/screens/Auth/loginScreen';
import HomeScreen from './src/screens/User/HomeScreen';
import RestaurantMenuScreen from './src/screens/User/RestaurantMenuScreen';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'home' | 'detail'>('login');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  if (currentScreen === 'detail') {
    return (
      <RestaurantMenuScreen
        restaurant={selectedRestaurant}
        onGoBack={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        onSelectRestaurant={(restaurant) => {
          setSelectedRestaurant(restaurant);
          setCurrentScreen('detail');
        }}
      />
    );
  }

  return <LoginScreen onContinue={() => setCurrentScreen('home')} />;
}

export default App;
