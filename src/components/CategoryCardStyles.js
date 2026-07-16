/*
-----------------------------------------
File: CategoryCardStyles.js

Purpose:
Styles category cards used on Home.

Concepts Used:
- StyleSheet
- Card layout
- Shadows
- Image sizing
-----------------------------------------
*/

// React Native StyleSheet import.
import {StyleSheet} from 'react-native';

// StyleSheet object for CategoryCard.js.
const styles = StyleSheet.create({
  animatedContainer: {
    // Space to the right of each card.
    marginRight: 16,
    // Space below each card for second row layout.
    marginBottom: 12,
  },
  card: {
    // Card width.
    width: 106,
    // Card height.
    height: 118,
    // Rounded card corners.
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 7,
  },
  iconCircle: {
    // Circular icon background size.
    width: 58,
    height: 58,
    // Half of width/height makes a circle.
    borderRadius: 29,
    backgroundColor: '#F3F7FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    // Category icon image size.
    width: 37,
    height: 37,
  },
  name: {
    color: '#102A43',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0,
  },
});

export default styles;
