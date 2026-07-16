/*
-----------------------------------------
File: StackNavigator.js

Purpose:
Defines the app's screen navigation stack.

Concepts Used:
- React
- React Navigation
- NavigationContainer
- Native Stack Navigator
- Stack.Screen

Flow:
App.tsx -> StackNavigator -> Splash/Login/Home/etc.
-----------------------------------------
*/

// React import
// React is needed because this file returns JSX components.
import React from 'react';

// React Navigation
// NavigationContainer manages navigation state for the whole app.
import {NavigationContainer} from '@react-navigation/native';

// React Navigation Native Stack
// createNativeStackNavigator creates a stack-based screen navigator.
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screen imports
// Each screen component is imported so it can be registered in the stack.
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Menu from '../screens/Menu';
import FoodDetails from '../screens/FoodDetails';
import Cart from '../screens/Cart';
import Success from '../screens/Success';

// Route constants
// Routes prevents typing route names manually in many places.
import Routes from './Routes';

// React Navigation API
// Stack is an object that gives us Stack.Navigator and Stack.Screen.
const Stack = createNativeStackNavigator();

// Component
// StackNavigator returns the full navigation structure.
// It receives no props and returns JSX.
export default function StackNavigator() {
  return (
    // React Navigation component
    // NavigationContainer must wrap all navigators.
    <NavigationContainer>
      {/* React Navigation component
          Stack.Navigator groups all stack screens.
          initialRouteName chooses the first screen shown. */}
      <Stack.Navigator
        initialRouteName={Routes.SPLASH}
        screenOptions={{
          // React Navigation option
          // headerShown false hides the default top navigation header.
          headerShown: false,
          // React Navigation option
          // animation controls default screen transition style.
          animation: 'slide_from_right',
        }}>
        {/* Stack.Screen registers the Splash screen with the navigator. */}
        <Stack.Screen name={Routes.SPLASH} component={Splash} />
        {/* Stack.Screen registers the Login screen. */}
        <Stack.Screen name={Routes.LOGIN} component={Login} />
        {/* Stack.Screen registers Home and overrides its transition to fade. */}
        <Stack.Screen
          name={Routes.HOME}
          component={Home}
          options={{animation: 'fade'}}
        />
        {/* Stack.Screen registers the Menu screen. */}
        <Stack.Screen name={Routes.MENU} component={Menu} />
        {/* Stack.Screen registers the FoodDetails screen. */}
        <Stack.Screen name={Routes.FOOD_DETAILS} component={FoodDetails} />
        {/* Stack.Screen registers the Cart screen. */}
        <Stack.Screen name={Routes.CART} component={Cart} />
        {/* Stack.Screen registers the Success screen. */}
        <Stack.Screen name={Routes.SUCCESS} component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
