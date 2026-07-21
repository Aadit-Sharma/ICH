/*
-----------------------------------------
File: Success.js

Purpose:
Placeholder screen for successful order confirmation.

Concepts Used:
- React component
- View
- Text

Current Status:
Registered in navigation but not connected to an order flow yet.
-----------------------------------------
*/

// React import for JSX.
import React from 'react';
import {useDispatch} from 'react-redux';

// React Native layout and text components.
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {clearCart} from '../redux/slices/cartSlice';
import Routes from '../navigation/Routes';

// React component
// This currently returns placeholder success UI.
export default function Success({navigation}) {
  const dispatch = useDispatch();

  const handleBackHome = () => {
    dispatch(clearCart());
    navigation.reset({index: 0, routes: [{name: Routes.HOME}]});
  };

  return (
    // View centers placeholder text.
    <View style={styles.container}>
      {/* Text displays temporary screen label. */}
      <Text>Order placed successfully</Text>
      <Pressable onPress={handleBackHome} style={styles.backButton}>
        <Text>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  backButton: {marginTop: 16},
});
