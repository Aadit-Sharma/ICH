import React, {useEffect, useRef} from 'react';
import {Animated, Image, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../redux/slices/cartSlice';
import styles from './FoodCardStyles';

export default function FoodCard({item, onPress}) {
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.cartItems.find(currentItem => currentItem.id === item.id),
  );
  const isInCart = Boolean(cartItem);
  const controlOpacity = useRef(new Animated.Value(1)).current;
  const controlScale = useRef(new Animated.Value(1)).current;
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    controlOpacity.setValue(0);
    controlScale.setValue(0.9);
    Animated.parallel([
      Animated.timing(controlOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(controlScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [controlOpacity, controlScale, isInCart]);

  const updateCart = (event, action) => {
    event?.stopPropagation?.();
    dispatch(action);
  };

  const isVeg = item.isVeg !== false;
  const rating = Number(item.rating || 4.5).toFixed(1);
  const description =
    item.description || `Freshly prepared ${item.name} from Indian Coffee House.`;

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={[styles.vegIcon, !isVeg && styles.nonVegIcon]}>
            <View style={[styles.vegDot, !isVeg && styles.nonVegDot]} />
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.rating}>⭐ {rating}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        <Animated.View
          style={{
            opacity: controlOpacity,
            transform: [{scale: controlScale}],
          }}>
          {isInCart ? (
            <View style={styles.quantitySelector}>
              <Pressable
                onPress={event => updateCart(event, decreaseQuantity(item.id))}
                style={styles.quantityButton}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Decrease ${item.name} quantity`}>
                <Text style={styles.quantityButtonText}>−</Text>
              </Pressable>
              <Text style={styles.quantityText}>{cartItem.quantity}</Text>
              <Pressable
                onPress={event => updateCart(event, increaseQuantity(item.id))}
                style={styles.quantityButton}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Increase ${item.name} quantity`}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={event => updateCart(event, addToCart(item))}
              style={styles.addButton}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.name} to cart`}>
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
}
