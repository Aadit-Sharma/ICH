import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import Routes from '../../navigation/Routes';
import styles from './SplashStyles';

const SPLASH_DURATION = 3000;

export default function Splash({navigation}) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(25)).current;

  const dotsOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dotsOpacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(() => {
      navigation.replace(Routes.LOGIN);
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: logoOpacity,
          },
        ]}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{scale: logoScale}],
            },
          ]}>
          <Text style={styles.logoText}>NTPC</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContent,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslate }],
            },
          ]}
        >
          <Text style={styles.title}>Indian Coffee House</Text>
          <Text style={styles.subtitle}>Employee Food Ordering</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: dotsOpacity,
          },
        ]}>
        <Text style={styles.loadingDots}>
          • • •
        </Text>
      </Animated.View>
    </View>
  );
}