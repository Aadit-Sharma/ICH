
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';


import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Splash from '../screens/Splash';
import Login from '../screens/Login';
import MainTabs from './MainTabs';
import Menu from '../screens/Menu';
import FoodDetails from '../screens/FoodDetails';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout/Checkout';
import Payment from '../screens/Payment/Payment';
import Success from '../screens/Success';

import Routes from './Routes';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    
    <NavigationContainer>
      {}
      <Stack.Navigator
        initialRouteName={Routes.SPLASH}
        screenOptions={{
          
          headerShown: false,
          
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={Routes.SPLASH} component={Splash} />
        <Stack.Screen name={Routes.LOGIN} component={Login} />
        <Stack.Screen
          name={Routes.HOME}
          component={MainTabs}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name={Routes.MENU}
          component={Menu}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen name={Routes.FOOD_DETAILS} component={FoodDetails} />
        <Stack.Screen name={Routes.CART} component={Cart} />
        <Stack.Screen name={Routes.CHECKOUT}  component={Checkout}/>
        <Stack.Screen
  name={Routes.PAYMENT}
  component={Payment}
/>
        <Stack.Screen name={Routes.SUCCESS} component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
