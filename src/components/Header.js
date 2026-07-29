
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';


import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styles from './HeaderStyles';

export default function Header({
  greeting = 'Good Morning',
  username = 'Aadit Sharma',
  subtitle = 'Indian Coffee House',
  onCartPress,
}) {
  const cartCount = useSelector(state => state.cart.totalItems);
  // Animated API
  // badgeScale controls the orange badge pop animation.
  const badgeScale = useRef(new Animated.Value(1)).current;
  const cartBackgroundOpacity = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const hasCartItems = cartCount > 0;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 480,
      useNativeDriver: true,
    }).start();
  }, [headerOpacity]);

  useEffect(() => {
    Animated.timing(cartBackgroundOpacity, {
      toValue: hasCartItems ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [cartBackgroundOpacity, hasCartItems]);

  
  useEffect(() => {
    
    if (cartCount < 1) {
      return;
    }

    
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
    
    <Animated.View style={{opacity: headerOpacity}}>
      <LinearGradient
        colors={['#004E99', '#0875C9', '#2189D1']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text pointerEvents="none" style={styles.watermark}>{'\u2615'}</Text>
          <View style={styles.copy}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.employeeName}>{username} {'\u{1F44B}'}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

      {/* Pressable makes the cart button tappable. */}
          <Pressable
            onPress={onCartPress}
            style={[styles.cartButton, localStyles.cartButton]}
            accessibilityRole="button"
            accessibilityLabel="Open cart">
            <Animated.View
              pointerEvents="none"
              style={[localStyles.cartBackground, {opacity: cartBackgroundOpacity}]}
            />
            <Image
              source={require('../assets/icons/cart.png')}
              style={[styles.cartIcon, localStyles.activeCartIcon]}
              resizeMode="contain"
            />
            {hasCartItems && (
              <Animated.View
                style={[
                  styles.badge,
                  localStyles.activeBadge,
                  {transform: [{scale: badgeScale}]},
                ]}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </Animated.View>
            )}
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
}

const localStyles = StyleSheet.create({
  cartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.32)',
  },
  cartBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  activeCartIcon: {
    tintColor: '#FFFFFF',
  },
  activeBadge: {
    backgroundColor: '#E53935',
  },
});
