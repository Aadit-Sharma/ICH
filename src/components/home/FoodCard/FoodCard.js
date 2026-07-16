import React, {useRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './FoodCardStyles';

export default function FoodCard({item, onPress}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = toValue => {
    Animated.spring(scale, {
      toValue,
      friction: 6,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.animatedContainer, {transform: [{scale}]}]}>
      <Pressable
        onPress={() => onPress(item)}
        onPressIn={() => animateScale(0.97)}
        onPressOut={() => animateScale(1)}
        style={styles.card}>
        <View style={[styles.imagePlaceholder, styles[item.imageStyle]]}>
          <View style={[styles.foodMark, styles[item.accentStyle]]} />
        </View>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.price}>Rs. {item.price}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={13} color="#F9A826" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
