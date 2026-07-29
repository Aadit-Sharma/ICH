import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import Bills from '../screens/Bills';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: require('../assets/icons/home.png'),
  Orders: require('../assets/icons/purchase-order.png'),
  Bills: require('../assets/icons/invoice.png'),
  Profile: require('../assets/icons/user.png'),
};

const getScreenOptions = ({route}) => ({
  headerShown: false,
  animation: 'shift',
  transitionSpec: {animation: 'timing', config: {duration: 280}},
  tabBarActiveTintColor: '#1565C0',
  tabBarInactiveTintColor: '#9CA3AF',
  tabBarLabelStyle: styles.tabLabel,
  tabBarStyle: styles.tabBar,
  tabBarIcon: ({color}) => (
    <Image source={tabIcons[route.name]} style={[styles.tabIcon, {tintColor: color}]} resizeMode="contain" />
  ),
});

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Bills" component={Bills} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {height: 64, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: '#FFFFFF'},
  tabIcon: {width: 24, height: 24},
  tabLabel: {fontSize: 11, fontWeight: '600'},
});
