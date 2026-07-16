/*
-----------------------------------------
File: CategoryChipStyles.js

Purpose:
Styles the older CategoryChip component.

Current Status:
Not used by the current Home screen.
-----------------------------------------
*/

// React Native StyleSheet import.
import {StyleSheet} from 'react-native';

// StyleSheet object for CategoryChip.js.
const styles = StyleSheet.create({
  container: {
    // Fixed chip height.
    height: 40,
    // Pill shape.
    borderRadius: 20,
    // White chip background.
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E2EC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginRight: 10,
  },
  text: {
    // Text color.
    color: '#243B53',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
  },
});

export default styles;
