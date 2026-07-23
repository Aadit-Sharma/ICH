import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Image,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import styles from "./AppHeaderStyles";

const AppHeader = ({
  greeting = "Good Morning",
  username = "Employee",
  subtitle = "Indian Coffee House",
  cartCount = 0,
  onCartPress,
}) => {
  const badgeScale = useRef(new Animated.Value(1)).current;
  const cartBackground = useRef(new Animated.Value(cartCount > 0 ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(cartBackground, {
      toValue: cartCount > 0 ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [cartBackground, cartCount]);

  useEffect(() => {
    if (cartCount < 1) {
      return;
    }

    Animated.sequence([
      Animated.spring(badgeScale, {
        toValue: 1.2,
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
  }, [cartCount, badgeScale]);

  return (
    <LinearGradient
      colors={["#005BAC", "#1976D2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={styles.greeting}>
            {greeting}
          </Text>

          <Text style={styles.username}>
            {username}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>

        <Pressable
          onPress={onCartPress}
          style={styles.cartButton}
          accessibilityRole="button"
          accessibilityLabel="Open Cart"
        >
          <Animated.View
            style={[
              styles.cartBackground,
              {
                backgroundColor: cartBackground.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["#005BAC", "#F9A826"],
                }),
              },
            ]}
          >
            <Image
            source={require("../../../assets/icons/cart.png")}
            style={styles.cartIcon}
            resizeMode="contain"
          />
          </Animated.View>
          <Animated.View
            style={[
              styles.badge,
              {
                transform: [
                  {
                    scale: badgeScale,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {cartCount}
            </Text>
          </Animated.View>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default AppHeader;
