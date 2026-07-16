/*
-----------------------------------------
File: Splash.js

Purpose:
Shows the splash screen when the app opens.

Concepts Used:
- React component
- React Hooks
- React Native Animated API
- React Navigation
- JSX

Flow:
StackNavigator -> Splash -> Login
-----------------------------------------
*/

// React + Hooks
// useEffect runs side effects after render.
// useRef stores animation values without causing re-renders.
import React, {useEffect, useRef} from 'react';

// React Native components and APIs
// Animated creates animations.
// Text displays words.
// View is a layout container.
import {Animated, Text, View} from 'react-native';

// Navigation route constants
// Routes.LOGIN is used when moving from Splash to Login.
import Routes from '../navigation/Routes';

// StyleSheet object for this screen.
import styles from './SplashStyles';

// JavaScript constant
// This stores how long the splash stays visible: 3000ms = 3 seconds.
const SPLASH_DURATION = 3000;

// React component
// navigation is a prop provided by React Navigation.
// The component returns JSX for the splash UI.
export default function Splash({navigation}) {
  // React Hook + Animated API
  // useRef keeps the same Animated.Value between renders.
  // Animated.Value(0) starts opacity at invisible.
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Animated API
  // This controls logo scale. 0.6 means the logo starts smaller.
  const logoScale = useRef(new Animated.Value(0.6)).current;

  // Animated API
  // This controls text opacity from invisible to visible.
  const textOpacity = useRef(new Animated.Value(0)).current;

  // Animated API
  // This controls the text moving upward into place.
  const textTranslate = useRef(new Animated.Value(25)).current;

  // Animated API
  // This controls the loading dots opacity pulse.
  const dotsOpacity = useRef(new Animated.Value(0.3)).current;

  // React Hook
  // useEffect runs once after the component appears.
  // It starts animations and the navigation timer.
  useEffect(() => {
    // Animated API
    // Animated.sequence runs animations one after another.
    Animated.sequence([
      // Animated API
      // Animated.parallel runs animations at the same time.
      Animated.parallel([
        // Fade animation
        // Animated.timing changes logoOpacity from 0 to 1 over 700ms.
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        // Scale animation
        // Animated.spring gives the logo a natural scale-up motion.
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
      // Text animation group
      // Text fades in and moves upward together.
      Animated.parallel([
        // Fade animation for title/subtitle.
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        // Translation animation for title/subtitle.
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Animated API
    // Animated.loop repeats the dot fade animation continuously.
    Animated.loop(
      Animated.sequence([
        // Makes dots brighter.
        Animated.timing(dotsOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Makes dots dimmer.
        Animated.timing(dotsOpacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // JavaScript timer
    // setTimeout runs navigation after SPLASH_DURATION milliseconds.
    const timer = setTimeout(() => {
      // React Navigation
      // replace removes Splash from the stack and opens Login.
      navigation.replace(Routes.LOGIN);
    }, SPLASH_DURATION);

    // React cleanup function
    // clearTimeout prevents the timer from running if Splash unmounts early.
    return () => clearTimeout(timer);
  }, [
    // Dependency array
    // These values are used inside useEffect.
    dotsOpacity,
    logoOpacity,
    logoScale,
    navigation,
    textOpacity,
    textTranslate,
  ]);

  return (
    // React Native View
    // This is the full-screen splash container.
    <View style={styles.container}>
      {/* Animated.View
          This wraps the logo and text so its opacity can animate. */}
      <Animated.View style={[styles.content, {opacity: logoOpacity}]}>
        {/* Animated.View
            This is the NTPC logo circle with scale animation. */}
        <Animated.View
          style={[styles.logoContainer, {transform: [{scale: logoScale}]}]}>
          {/* Text displays the NTPC label inside the logo circle. */}
          <Text style={styles.logoText}>NTPC</Text>
        </Animated.View>

        {/* Animated.View
            This wraps title/subtitle for opacity and vertical movement. */}
        <Animated.View
          style={[
            styles.textContent,
            {
              opacity: textOpacity,
              transform: [{translateY: textTranslate}],
            },
          ]}>
          {/* Text displays the app name. */}
          <Text style={styles.title}>Indian Coffee House</Text>
          {/* Text displays the app subtitle. */}
          <Text style={styles.subtitle}>Employee Food Ordering</Text>
        </Animated.View>
      </Animated.View>

      {/* Animated.View
          Footer dots pulse using dotsOpacity. */}
      <Animated.View style={[styles.footer, {opacity: dotsOpacity}]}>
        {/* Text displays bullet dots using a Unicode escape. */}
        <Text style={styles.loadingDots}>{'\u2022 \u2022 \u2022'}</Text>
      </Animated.View>
    </View>
  );
}
