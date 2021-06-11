import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import AddBook from './pages/AddBook';

export const HideTabBar = createContext({} as { showTabBar: boolean, setshowTabBar: React.Dispatch<React.SetStateAction<boolean>> });

export default function App() {

  const Tab = createBottomTabNavigator();

  const [showTabBar, setshowTabBar] = useState(true);

  return (
    <HideTabBar.Provider value={{ showTabBar: showTabBar, setshowTabBar: setshowTabBar }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={Home} options={{ tabBarVisible: showTabBar }} />
          <Tab.Screen name="Add Book" component={AddBook} />
        </Tab.Navigator>
      </NavigationContainer>
    </HideTabBar.Provider>
  );
}
