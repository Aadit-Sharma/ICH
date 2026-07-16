/*
-----------------------------------------
File: Cart.js

Purpose:
Placeholder screen for the cart.

Concepts Used:
- React component
- View
- Text

Current Status:
Home can navigate here, but real cart UI is not built yet.
-----------------------------------------
*/

// React import for JSX.
import React from 'react';

// React Native layout and text components.
import {View, Text} from 'react-native';

// React component
// This currently returns placeholder cart UI.
export default function Cart() {
  return (
    // View centers placeholder text.
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Text displays temporary screen label. */}
      <Text>Cart Screen</Text>
    </View>
  );
}
