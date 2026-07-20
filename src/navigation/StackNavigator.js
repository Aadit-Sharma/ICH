import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Menu from '../screens/Menu';
import FoodDetails from '../screens/FoodDetails';
import Cart from '../screens/Cart';
import Success from '../screens/Success';

import Routes from './Routes';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.SPLASH}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name={Routes.SPLASH}
          component={Splash}
        />

        <Stack.Screen
          name={Routes.LOGIN}
          component={Login}
        />

        <Stack.Screen
          name={Routes.HOME}
          component={Home}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name={Routes.MENU}
          component={Menu}
        />

        <Stack.Screen
          name={Routes.FOOD_DETAILS}
          component={FoodDetails}
        />

        <Stack.Screen
          name={Routes.CART}
          component={Cart}
        />

        <Stack.Screen
          name={Routes.SUCCESS}
          component={Success}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}