/*
-----------------------------------------
File: FoodCard.js

Purpose:
Reusable food item card used on the Home screen.

Concepts Used:
- React component
- useRef hook
- Animated API
- Pressable
- Image
- Props
-----------------------------------------
*/

// React + useRef for animation values.
import React, {useRef} from 'react';

// React Native components and Animated API.
import {Animated, Image, Pressable, Text, View} from 'react-native';

// Styles for FoodCard.
import styles from './FoodCardStyles';

// React component
// Props: item is food data, onAdd adds to cart, onPress opens details.
export default function FoodCard({item, onAdd, onPress}) {
  // Animated value for whole card press scale.
  const scale = useRef(new Animated.Value(1)).current;
  // Animated value for ADD button press scale.
  const addScale = useRef(new Animated.Value(1)).current;

  // Function
  // Purpose: animate whole card scale.
  const animateScale = toValue => {
    Animated.spring(scale, {
      toValue,
      friction: 6,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  // Function
  // Purpose: handle ADD press without triggering card press.
  // event.stopPropagation prevents parent Pressable from also firing.
  const handleAddPress = event => {
    event.stopPropagation();
    onAdd(item);
  };

  // Function
  // Purpose: animate ADD button scale.
  const animateAddScale = toValue => {
    Animated.spring(addScale, {
      toValue,
      friction: 6,
      tension: 170,
      useNativeDriver: true,
    }).start();
  };

  return (
    // Animated.View applies scale animation to whole card.
    <Animated.View style={[styles.animatedContainer, {transform: [{scale}]}]}>
      {/* Pressable makes the food card open details. */}
      <Pressable
        onPress={() => onPress(item)}
        onPressIn={() => animateScale(0.97)}
        onPressOut={() => animateScale(1)}
        style={styles.card}>
        {/* Image displays the food image from foodData.js. */}
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        {/* View groups text, rating, price, and ADD button. */}
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          {/* View lays out price and rating in one row. */}
          <View style={styles.metaRow}>
            <Text style={styles.price}>Rs. {item.price}</Text>
            <View style={styles.rating}>
              {/* Image displays the downloaded star PNG. */}
              <Image
                source={require('../assets/icons/star.png')}
                style={styles.ratingIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          {/* Animated.View scales the ADD button on press. */}
          <Animated.View style={{transform: [{scale: addScale}]}}>
            {/* Pressable triggers add-to-cart behavior. */}
            <Pressable
              onPress={handleAddPress}
              onPressIn={() => animateAddScale(0.96)}
              onPressOut={() => animateAddScale(1)}
              style={styles.addButton}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.name} to cart`}>
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
