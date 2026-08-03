/*
-----------------------------------------
File: Cart.js

Purpose:
Professional Cart screen with item cards, removal animations,
order summary calculations (Subtotal, GST, Service Charge, Grand Total),
sticky checkout bottom bar, empty cart illustration, and Redux integration.
-----------------------------------------
*/

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../../navigation/Routes';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/cartSlice';
import {createOrder} from '../../redux/slices/ordersSlice';
import {createBill} from '../../redux/slices/billsSlice';
import styles from './CartStyles';

// Individual Cart Item Card with Removal & Quantity Animations
const CartItemCard = ({item, onIncrease, onDecrease}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleDecrease = () => {
    if (item.quantity === 1) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDecrease(item.id);
      });
    } else {
      onDecrease(item.id);
    }
  };

  return (
    <Animated.View
      style={[
        styles.itemCard,
        {
          opacity: fadeAnim,
          transform: [{scale: scaleAnim}],
        },
      ]}>
      <Image
        source={item.image}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.itemTotalPrice}>₹{item.price * item.quantity}</Text>
        </View>

        <Text style={styles.itemDescription} numberOfLines={1}>
          {item.description || `Fresh ${item.name} prepared to order.`}
        </Text>

        <View style={styles.itemBottomRow}>
          <Text style={styles.itemUnitPrice}>₹{item.price} each</Text>

          <View style={styles.quantitySelector}>
            <Pressable
              onPress={handleDecrease}
              style={styles.quantityBtn}
              accessibilityRole="button"
              accessibilityLabel={`Decrease ${item.name} quantity`}>
              <Text style={styles.quantityBtnText}>−</Text>
            </Pressable>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <Pressable
              onPress={() => onIncrease(item.id)}
              style={styles.quantityBtn}
              accessibilityRole="button"
              accessibilityLabel={`Increase ${item.name} quantity`}>
              <Text style={styles.quantityBtnText}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default function Cart({navigation}) {
  const dispatch = useDispatch();
  const {cartItems, totalAmount} = useSelector(state => state.cart);
  const nextOrderNumberByUser = useSelector(
    state => state.orders.nextOrderNumberByUser,
  );

  // Bill Calculations via Redux state
  const subtotal = totalAmount || 0;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const serviceCharge = subtotal > 0 ? 15 : 0; // ₹15 Packaging & Service Fee
  const grandTotal = subtotal + gst + serviceCharge;

  const handleCheckout = async () => {
    let userId = null;
    let username = null;
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        userId = userObj.id;
        username = userObj.username;
      }
    } catch (error) {
      console.log('Error reading user session in checkout:', error);
    }

    if (userId == null || username == null) {
      return;
    }

    const nextOrderNumber =
      nextOrderNumberByUser[String(userId)] || 1001;
    const placedAt = new Date().toISOString();
    dispatch(createOrder({
      items: cartItems,
      total: grandTotal,
      placedAt,
      subtotal,
      tax: gst,
      serviceCharge,
      userId,
      username,
    }));
    const createdOrder = {
      id: `ORD-${nextOrderNumber}`,
      items: cartItems.map(({id, name, price, quantity}) => ({id, name, price, quantity})),
      total: grandTotal,
      placedAt,
      subtotal,
      tax: gst,
      serviceCharge,
      userId,
      username,
    };
    dispatch(createBill({order: createdOrder}));
    dispatch(clearCart());
    navigation.navigate(Routes.SUCCESS, {placedAt});
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrease = itemId => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = itemId => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#005BAC" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Image
            source={require('../../assets/icons/back arrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          My Cart
        </Text>

        <Pressable
          onPress={handleClearCart}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Clear cart">
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.deleteCartIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* BODY / CONTENT */}
      {cartItems.length === 0 ? (
        /* EMPTY CART STATE */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIllustrationWrapper}>
            <Image
              source={require('../../assets/icons/cart.png')}
              style={styles.emptyIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet. Explore our delicious menu items!
          </Text>

          <Pressable
            onPress={() => navigation.navigate(Routes.MENU)}
            style={({pressed}) => [
              styles.continueButton,
              pressed && {opacity: 0.88},
            ]}
            accessibilityRole="button"
            accessibilityLabel="Continue Shopping">
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </Pressable>
        </View>
      ) : (
        /* POPULATED CART CONTENT */
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}>
            {/* CART ITEMS */}
            {cartItems.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}

            {/* BILL SUMMARY */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Bill Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Item Subtotal</Text>
                <Text style={styles.summaryValue}>₹{subtotal}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>GST (5%)</Text>
                <Text style={styles.summaryValue}>₹{gst}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service & Packaging</Text>
                <Text style={styles.summaryValue}>₹{serviceCharge}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
              </View>
            </View>
          </ScrollView>

          {/* STICKY BOTTOM CHECKOUT BAR */}
          <View style={styles.bottomBar}>
            <View style={styles.bottomLeft}>
              <Text style={styles.bottomTotalLabel}>Grand Total</Text>
              <Text style={styles.bottomTotalPrice}>₹{grandTotal}</Text>
            </View>

            <Pressable
              onPress={handleCheckout}
              style={({pressed}) => [
                styles.checkoutButton,
                pressed && {opacity: 0.88},
              ]}
              accessibilityRole="button"
              accessibilityLabel="Proceed to Checkout">
              <Text style={styles.checkoutButtonText}>Proceed to Checkout →</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
