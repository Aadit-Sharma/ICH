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

// React Native layout and text components.
import {View, Text} from 'react-native';

// React component
// This currently returns placeholder success UI.
export default function Success() {
  return (
    // View centers placeholder text.
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Text displays temporary screen label. */}
      <Text>Success Screen</Text>
    </View>
  );
}
