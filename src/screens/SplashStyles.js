/*
-----------------------------------------
File: SplashStyles.js

Purpose:
Stores all visual styles for the Splash screen.

Concepts Used:
- React Native StyleSheet
- Flexbox
- Colors
- Shadows
- Typography
-----------------------------------------
*/

// React Native StyleSheet
// StyleSheet.create makes named style objects for React Native components.
import {StyleSheet} from 'react-native';

// StyleSheet object
// Each key is a reusable style name.
const styles = StyleSheet.create({
  container: {
    // Flexbox
    // flex: 1 makes the container fill the whole screen.
    flex: 1,
    // Color
    // Sets the splash background to light gray.
    backgroundColor: '#F5F7FA',
    // Flexbox
    // Centers children horizontally.
    alignItems: 'center',
    // Flexbox
    // Centers children vertically.
    justifyContent: 'center',
    // Spacing
    // Adds left and right space inside the container.
    paddingHorizontal: 24,
  },
  content: {
    // Flexbox
    // Centers logo/text horizontally.
    alignItems: 'center',
    // Flexbox
    // Centers logo/text vertically within this group.
    justifyContent: 'center',
  },
  textContent: {
    // Flexbox
    // Keeps title and subtitle centered.
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    // Size
    // Sets the logo circle width.
    width: 104,
    // Size
    // Sets the logo circle height.
    height: 104,
    // Shape
    // Half of width/height makes this a circle.
    borderRadius: 52,
    // Color
    // NTPC blue background.
    backgroundColor: '#005BAC',
    alignItems: 'center',
    justifyContent: 'center',
    // Spacing
    // Adds space below the logo.
    marginBottom: 28,
    // Border
    // Adds an orange ring around the logo.
    borderWidth: 4,
    borderColor: '#F9A826',
    // iOS shadow color.
    shadowColor: '#005BAC',
    // iOS shadow direction.
    shadowOffset: {
      width: 0,
      height: 8,
    },
    // iOS shadow transparency.
    shadowOpacity: 0.18,
    // iOS shadow blur.
    shadowRadius: 16,
    // Android shadow.
    elevation: 8,
  },
  logoText: {
    // Text color.
    color: '#FFFFFF',
    // Text size.
    fontSize: 22,
    // Text weight.
    fontWeight: '800',
    // Letter spacing set to zero for normal spacing.
    letterSpacing: 0,
  },
  title: {
    color: '#102A43',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#52606D',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 0,
  },
  footer: {
    // Position
    // absolute places footer relative to the screen, not normal layout flow.
    position: 'absolute',
    // Distance from bottom edge.
    bottom: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDots: {
    color: '#005BAC',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 6,
  },
});

export default styles;
