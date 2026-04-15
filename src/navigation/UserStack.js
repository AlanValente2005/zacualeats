import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

function UserHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ZacualEats</Text>
        <Text style={styles.subtitle}>Sesion iniciada correctamente.</Text>
      </View>
    </SafeAreaView>
  );
}

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
  },
});