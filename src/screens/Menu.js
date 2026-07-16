/*
-----------------------------------------
File: Menu.js

Purpose:
Placeholder screen for a future Menu feature.

Concepts Used:
- React component
- View
- Text

Current Status:
Registered in navigation but not built yet.
-----------------------------------------
*/

// React import for JSX.
import React from 'react';

// React Native layout and text components.
import {View, Text} from 'react-native';

// React component
// Note: function name is Login, but file is Menu.
// It works because this is a default export, but it should be improved later.
export default function Login() {
  return (
    // View centers placeholder text.
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {/* Text displays temporary screen label. */}
      <Text>Menu Screen</Text>
    </View>
  );
}
