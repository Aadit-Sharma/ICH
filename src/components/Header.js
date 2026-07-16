/*
-----------------------------------------
File: Header.js

Purpose:
Reusable Home header with greeting, gradient background, cart icon, and animated badge.

Concepts Used:
- React component
- useEffect/useRef hooks
- Animated API
- Image assets
- Pressable
- LinearGradient
-----------------------------------------
*/

// React + Hooks
// useEffect runs badge animation when cart count changes.
// useRef stores the Animated.Value for badge scale.
import React, {useEffect, useRef} from 'react';

// React Native components
// Animated animates the badge.
// Image displays cart.png.
// Pressable makes cart touchable.
// Text displays greeting.
// View groups text.
import {Animated, Image, Pressable, Text, View} from 'react-native';

// Third-party package
// LinearGradient comes from react-native-linear-gradient.
// It creates the blue gradient background.
import LinearGradient from 'react-native-linear-gradient';

// Component styles.
import styles from './HeaderStyles';

// JavaScript constant
// Unicode escape renders the waving hand emoji safely.
const EMPLOYEE_GREETING = 'Aadit Sharma \u{1F44B}';

// React component
// Props: cartCount number, onCartPress function.
// Returns JSX for the Home header.
export default function Header({cartCount = 0, onCartPress}) {
  // Animated API
  // badgeScale controls the orange badge pop animation.
  const badgeScale = useRef(new Animated.Value(1)).current;

  // React Hook
  // Runs when cartCount changes.
  useEffect(() => {
    // Guard clause
    // Do not animate when badge count is zero.
    if (cartCount < 1) {
      return;
    }

    // Animated sequence
    // Badge grows then returns to normal size.
    Animated.sequence([
      Animated.spring(badgeScale, {
        toValue: 1.22,
        friction: 4,
        tension: 180,
        useNativeDriver: true,
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 5,
        tension: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [badgeScale, cartCount]);

  return (
    // LinearGradient component
    // Creates the blue gradient header background.
    <LinearGradient
      colors={['#005BAC', '#1976D2']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      {/* View groups the greeting text. */}
      <View style={styles.copy}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.employeeName}>{EMPLOYEE_GREETING}</Text>
        <Text style={styles.subtitle}>Indian Coffee House</Text>
      </View>

      {/* Pressable makes the cart button tappable. */}
      <Pressable
        onPress={onCartPress}
        style={styles.cartButton}
        accessibilityRole="button"
        accessibilityLabel="Open cart">
        {/* Image displays cart.png from assets. */}
        <Image
          source={require('../assets/icons/cart.png')}
          style={styles.cartIcon}
          resizeMode="contain"
        />
        {/* Animated.View scales the badge when cartCount changes. */}
        <Animated.View
          style={[styles.badge, {transform: [{scale: badgeScale}]}]}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </Animated.View>
      </Pressable>
    </LinearGradient>
  );
}
