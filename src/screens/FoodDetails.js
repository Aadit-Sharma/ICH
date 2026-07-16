/*
-----------------------------------------
File: FoodDetails.js

Purpose:
Placeholder screen for showing selected food details.

Concepts Used:
- React component
- View
- Text

Current Status:
Home navigates here, but detailed UI is not built yet.
-----------------------------------------
*/

// React import for JSX.
import React from 'react';

// React Native layout and text components.
import {View, Text} from 'react-native';

// React component
// This currently returns placeholder UI.
export default function FoodDetails() {
  return (
    // View centers placeholder text.
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {/* Text displays temporary screen label. */}
      <Text>Food Details</Text>
    </View>
  );
}
