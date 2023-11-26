import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/components/ProvideUser';


import Ratings from './src/components/Ratings';
import AddRating from './src/components/Add';
import EditRating from './src/components/Edit';
import Registration from './src/components/Registration';
import Login from './src/components/Login';
import Details from './src/components/Details';
import Title from './src/components/TitleAndUser';
import Statistics from './src/components/Statistics';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState('');

  //we used a navigation stack to navigate screens
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Home" component={Ratings} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Add Rating" component={AddRating} />
          <Stack.Screen name="Edit Rating" component={EditRating} />
          <Stack.Screen name="Statistics" component={Statistics} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fffd75',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingsContainer: {
    flex: '50%',
  },
  addRatingContainer: {
    flex: '50%',
  }
});
