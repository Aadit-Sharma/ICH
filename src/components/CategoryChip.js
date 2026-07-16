/*
-----------------------------------------
File: CategoryChip.js

Purpose:
Older reusable category pill component.

Concepts Used:
- React component
- View
- Text
- Props

Current Status:
Not currently used by Home because CategoryCard replaced it.
-----------------------------------------
*/

// React import for creating JSX.
import React from 'react';

// React Native components.
import {Text, View} from 'react-native';

// Styles for this component.
import styles from './CategoryChipStyles';

// React component
// Props: title is the category label.
export default function CategoryChip({title}) {
  return (
    // View creates the pill container.
    <View style={styles.container}>
      {/* Text displays the category title. */}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
