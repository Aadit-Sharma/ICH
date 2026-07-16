/*
-----------------------------------------
File: CategoryCard.js

Purpose:
Reusable category tile with icon, label, and press animation.

Concepts Used:
- React component
- useRef hook
- Animated API
- Pressable
- Image
- Props
-----------------------------------------
*/

// React + useRef for animation value storage.
import React, {useRef} from 'react';

// React Native components and Animated API.
import {Animated, Image, Pressable, Text, View} from 'react-native';

// Styles for category card.
import styles from './CategoryCardStyles';

// React component
// Props: category object, optional onPress callback.
export default function CategoryCard({category, onPress}) {
  // Animated value
  // Controls scale when user presses the category card.
  const scale = useRef(new Animated.Value(1)).current;

  // Function
  // Purpose: animate category scale.
  // Parameter: toValue is target scale.
  const animateScale = toValue => {
    Animated.spring(scale, {
      toValue,
      friction: 7,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  // Function
  // Purpose: call optional parent onPress with category data.
  const handlePress = () => {
    if (onPress) {
      onPress(category);
    }
  };

  return (
    // Animated.View applies scale transform to the whole card.
    <Animated.View style={[styles.animatedContainer, {transform: [{scale}]}]}>
      {/* Pressable handles touch events. */}
      <Pressable
        onPress={handlePress}
        onPressIn={() => animateScale(0.96)}
        onPressOut={() => animateScale(1)}
        style={styles.card}
        accessibilityRole="button"
        accessibilityLabel={`${category.name} category`}>
        {/* View creates the circular pastel icon background. */}
        <View style={styles.iconCircle}>
          {/* Image displays category.icon from data/categories.js. */}
          <Image
            source={category.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        {/* Text displays the category name. */}
        <Text style={styles.name}>{category.name}</Text>
      </Pressable>
    </Animated.View>
  );
}
