/*
-----------------------------------------
File: HeaderStyles.js

Purpose:
Styles the reusable Home header.

Concepts Used:
- StyleSheet
- Flexbox
- Shadows
- Typography
- Absolute positioning
-----------------------------------------
*/

// React Native StyleSheet import.
import {StyleSheet} from 'react-native';

// StyleSheet object for Header.js.
const styles = StyleSheet.create({
  container: {
    // Places greeting and cart button in a horizontal row.
    flexDirection: 'row',
    // Centers children vertically.
    alignItems: 'center',
    // Pushes text left and cart button right.
    justifyContent: 'space-between',
    // Minimum height of gradient header.
    minHeight: 158,
    // Rounded corners for the header.
    borderRadius: 30,
    // Inner left/right space.
    paddingHorizontal: 28,
    // Inner top/bottom space.
    paddingVertical: 26,
    // Moves header down slightly.
    marginTop: 12,
    // Space below header.
    marginBottom: 22,
    // Shadow color.
    shadowColor: '#005BAC',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.2,
    shadowRadius: 26,
    elevation: 10,
  },
  copy: {
    // Text block uses remaining space.
    flex: 1,
    // Space between text block and cart button.
    paddingRight: 18,
  },
  greeting: {
    color: '#DCEBFA',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
  },
  employeeName: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 6,
    letterSpacing: 0,
  },
  subtitle: {
    color: '#F9D78A',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 7,
    letterSpacing: 0,
  },
  cartButton: {
    // Button size and circular shape.
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#003A70',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 7,
  },
  cartIcon: {
    width: 27,
    height: 27,
  },
  badge: {
    // Badge can grow wider if number has more digits.
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    // Absolute places badge on corner of cart button.
    position: 'absolute',
    top: -3,
    right: -3,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
});

export default styles;
