import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Image,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./AppHeaderStyles";

const AppHeader = ({
  greeting = "Good Morning",
  username = "Employee",
  subtitle = "Indian Coffee House",
  cartCount = 0,
  onCartPress,
}) => {
  const badgeScale = useRef(new Animated.Value(1)).current;

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
          <Icon
            name="cart-outline"
            size={24}
            color="#FFFFFF"
          />
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