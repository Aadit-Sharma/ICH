import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Menu from "../screens/Menu";
import FoodDetails from "../screens/FoodDetails";
import Cart from "../screens/Cart";
import Success from "../screens/Success";
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>

    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Menu" component={Menu} />
    <Stack.Screen name="FoodDetails" component={FoodDetails} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Success" component={Success} />

  </Stack.Navigator>
</NavigationContainer>
  );
}
