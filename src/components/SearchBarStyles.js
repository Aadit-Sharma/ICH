/*
-----------------------------------------
File: SearchBarStyles.js

Purpose:
Styles the reusable search bar component.

Concepts Used:
- StyleSheet
- Flexbox
- Shadows
- TextInput styling
-----------------------------------------
*/

// React Native StyleSheet import.
import {StyleSheet} from 'react-native';

// StyleSheet object for SearchBar.js.
const styles = StyleSheet.create({
  container: {
    // Fixed search bar height.
    height: 58,
    // Makes the search bar pill-shaped.
    borderRadius: 29,
    // White search bar background.
    backgroundColor: '#FFFFFF',
    // Places search icon and input side by side.
    flexDirection: 'row',
    // Vertically centers icon and input.
    alignItems: 'center',
    // Inner left/right spacing.
    paddingHorizontal: 18,
    // Space below search bar.
    marginBottom: 24,
    // Shadow color.
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  icon: {
    // Search icon width.
    width: 21,
    // Search icon height.
    height: 21,
    // Makes icon softer.
    opacity: 0.58,
  },
  input: {
    // Input fills remaining space.
    flex: 1,
    // Typed text color.
    color: '#102A43',
    fontSize: 16,
    paddingLeft: 10,
    letterSpacing: 0,
  },
});

export default styles;
