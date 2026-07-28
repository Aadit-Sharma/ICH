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
    // Fixed gradient header height.
    height: 165,
    // Keep the header edge straight across the full screen width.
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // Inner left/right space.
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
  },
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    overflow: 'hidden',
  },
  copy: {
    flex: 1,
    paddingRight: 18,
  },
  greeting: {
    color: '#DCEBFA',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0,
  },
  employeeName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0,
  },
  subtitle: {
    color: '#F9A826',
    fontSize: 18,
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
      width: 10,
      height: 18,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 7,
  },
  watermark: {
    position: 'absolute',
    right: 80,
    bottom: -9,
    color: '#FFFFFF',
    fontSize: 104,
    opacity: 0.07,
    transform: [{rotate: '-12deg'}],
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
