/*
-----------------------------------------
File: SearchBar.js

Purpose:
Reusable search input for the Home screen.

Concepts Used:
- React component
- TextInput
- Image asset
- Props
-----------------------------------------
*/

// React import for JSX component creation.
import React from 'react';

// React Native components
// Image shows search.png.
// TextInput receives typed search text.
// View groups icon and input.
import {Image, TextInput, View} from 'react-native';

// Styles for this component.
import styles from './SearchBarStyles';

// React component
// Props: value is current text, onChangeText updates parent state.
export default function SearchBar({value, onChangeText}) {
  return (
    // View is the search container.
    <View style={styles.container}>
      {/* Image shows the search icon asset. */}
      <Image
        source={require('../assets/icons/search.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      {/* TextInput is the editable search field. */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search food..."
        placeholderTextColor="#8A98A8"
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}
