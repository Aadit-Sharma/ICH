import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, Text, View} from 'react-native';

import Routes from '../navigation/Routes';
import styles from './SplashStyles';

const SPLASH_DURATION = 3000;

export default function Splash({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace(Routes.LOGIN);
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [fadeAnim, logoScale, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <Animated.View
          style={[styles.logoContainer, {transform: [{scale: logoScale}]}]}>
          <Text style={styles.logoText}>NTPC</Text>
        </Animated.View>

        <Text style={styles.title}>Indian Coffee House</Text>
        <Text style={styles.subtitle}>Employee Food Ordering</Text>
      </Animated.View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#005BAC" />
      </View>
    </View>
  );
}
