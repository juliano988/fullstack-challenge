import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home';
import { createStackNavigator } from '@react-navigation/stack';
import BookDetails from './pages/BookDetails';

export const API_DOMAIN = 'http://localhost:3000';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Book Details" component={BookDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
