import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Routes from '../../navigation/Routes';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/cartSlice';

const getDescription = item =>
  item.description || `Freshly prepared ${item.name} from Indian Coffee House.`;

export default function FoodDetails({navigation, route}) {
  const item = route.params?.food;
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.cartItems.find(currentItem => currentItem.id === item?.id),
  );
  const totalItems = useSelector(state => state.cart.totalItems);
  const quantity = cartItem?.quantity || 0;
  const pageOpacity = useRef(new Animated.Value(0)).current;
  const pageTranslate = useRef(new Animated.Value(14)).current;
  const imageScale = useRef(new Animated.Value(0.94)).current;
  const controlOpacity = useRef(new Animated.Value(1)).current;
  const controlScale = useRef(new Animated.Value(1)).current;
  const hasMounted = useRef(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(pageOpacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(pageTranslate, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 7,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageScale, pageOpacity, pageTranslate]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
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
  }, [controlOpacity, controlScale, quantity]);

  if (!item) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Food item is unavailable.</Text>
      </View>
    );
  }

  const isVeg = item.isVeg !== false;
  const rating = Number(item.rating || 4.5).toFixed(1);
  const calories = item.calories || '320 kcal';
  const ingredients = item.ingredients || 'Fresh ingredients, aromatic spices and house seasoning.';
  const itemTotal = item.price * quantity;
  const updateQuantity = action => dispatch(action(item.id));

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerTitle}>Food Details</Text>
        <Pressable
          onPress={() => navigation.navigate(Routes.CART)}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Open cart">
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.cartIcon}
            resizeMode="contain"
          />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.animatedPage,
          {opacity: pageOpacity, transform: [{translateY: pageTranslate}]},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <Animated.View style={[styles.imageCard, {transform: [{scale: imageScale}]}]}>
            <Image source={item.image} style={styles.foodImage} resizeMode="cover" />
          </Animated.View>

          <View style={styles.detailsCard}>
            <View style={styles.nameRow}>
              <Text style={styles.foodName}>{item.name}</Text>
              <View style={[styles.vegIcon, !isVeg && styles.nonVegIcon]}>
                <View style={[styles.vegDot, !isVeg && styles.nonVegDot]} />
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.rating}>⭐ {rating}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>

            <Text style={styles.description}>{getDescription(item)}</Text>

            <View style={styles.infoDivider} />
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.sectionText}>{ingredients}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoPill}>
                <Text style={styles.infoLabel}>Preparation time</Text>
                <Text style={styles.infoValue}>15-20 mins</Text>
              </View>
              <View style={styles.infoPill}>
                <Text style={styles.infoLabel}>Calories</Text>
                <Text style={styles.infoValue}>{calories}</Text>
              </View>
            </View>

            <Animated.View
              style={{
                opacity: controlOpacity,
                transform: [{scale: controlScale}],
              }}>
              {quantity > 0 ? (
                <View style={styles.quantitySelector}>
                  <Pressable
                    onPress={() => updateQuantity(decreaseQuantity)}
                    style={styles.quantityButton}
                    accessibilityRole="button"
                    accessibilityLabel={`Decrease ${item.name} quantity`}>
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <Pressable
                    onPress={() => updateQuantity(increaseQuantity)}
                    style={styles.quantityButton}
                    accessibilityRole="button"
                    accessibilityLabel={`Increase ${item.name} quantity`}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => dispatch(addToCart(item))}
                  style={styles.addButton}
                  accessibilityRole="button"
                  accessibilityLabel={`Add ${item.name} to cart`}>
                  <Text style={styles.addButtonText}>ADD</Text>
                </Pressable>
              )}
            </Animated.View>
          </View>
        </ScrollView>
      </Animated.View>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>₹{itemTotal}</Text>
        </View>
        <Pressable
          onPress={() =>
            quantity > 0 ? navigation.navigate(Routes.CART) : dispatch(addToCart(item))
          }
          style={[styles.bottomButton, quantity === 0 && styles.bottomAddButton]}
          accessibilityRole="button"
          accessibilityLabel={quantity > 0 ? 'Go to cart' : `Add ${item.name} to cart`}>
          <Text style={styles.bottomButtonText}>
            {quantity > 0 ? 'Go to Cart' : 'Add to Cart'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F7FA'},
  fallback: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7FA'},
  fallbackText: {color: '#52606D', fontSize: 15, fontWeight: '600'},
  header: {minHeight: 104, paddingTop: 42, paddingHorizontal: 18, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: '#005BAC', shadowColor: '#102A43', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5},
  headerButton: {width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center'},
  backIcon: {width: 19, height: 19, tintColor: '#005BAC'},
  cartIcon: {width: 22, height: 22},
  headerTitle: {flex: 1, marginHorizontal: 14, color: '#FFFFFF', fontSize: 21, fontWeight: '800'},
  badge: {position: 'absolute', top: -5, right: -5, minWidth: 19, height: 19, paddingHorizontal: 4, borderRadius: 10, backgroundColor: '#F9A826', alignItems: 'center', justifyContent: 'center'},
  badgeText: {color: '#FFFFFF', fontSize: 10, fontWeight: '900'},
  animatedPage: {flex: 1},
  scrollContent: {padding: 18, paddingBottom: 116},
  imageCard: {height: 260, borderRadius: 20, overflow: 'hidden', backgroundColor: '#EAF1F8', shadowColor: '#102A43', shadowOffset: {width: 0, height: 7}, shadowOpacity: 0.1, shadowRadius: 16, elevation: 5},
  foodImage: {width: '100%', height: '100%'},
  detailsCard: {marginTop: 18, padding: 18, borderRadius: 20, backgroundColor: '#FFFFFF', shadowColor: '#102A43', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.07, shadowRadius: 14, elevation: 3},
  nameRow: {flexDirection: 'row', alignItems: 'center'},
  foodName: {flex: 1, color: '#102A43', fontSize: 23, fontWeight: '900', paddingRight: 12},
  vegIcon: {width: 18, height: 18, borderWidth: 1.5, borderColor: '#1E8E3E', borderRadius: 3, alignItems: 'center', justifyContent: 'center'},
  vegDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#1E8E3E'},
  nonVegIcon: {borderColor: '#D93025'},
  nonVegDot: {backgroundColor: '#D93025'},
  metaRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12},
  rating: {color: '#52606D', fontSize: 14, fontWeight: '700'},
  price: {color: '#005BAC', fontSize: 21, fontWeight: '900'},
  description: {marginTop: 14, color: '#627D98', fontSize: 14, lineHeight: 21},
  infoDivider: {height: 1, backgroundColor: '#E4E9F0', marginVertical: 18},
  sectionTitle: {color: '#102A43', fontSize: 16, fontWeight: '800'},
  sectionText: {marginTop: 6, color: '#627D98', fontSize: 13, lineHeight: 19},
  infoRow: {flexDirection: 'row', marginTop: 18, marginHorizontal: -4},
  infoPill: {flex: 1, marginHorizontal: 4, padding: 12, borderRadius: 12, backgroundColor: '#EDF5FC'},
  infoLabel: {color: '#627D98', fontSize: 11, fontWeight: '600'},
  infoValue: {marginTop: 4, color: '#005BAC', fontSize: 13, fontWeight: '800'},
  addButton: {height: 44, marginTop: 22, borderRadius: 22, backgroundColor: '#F9A826', alignItems: 'center', justifyContent: 'center'},
  addButtonText: {color: '#FFFFFF', fontSize: 14, fontWeight: '900', letterSpacing: 0.3},
  quantitySelector: {height: 44, marginTop: 22, borderRadius: 22, backgroundColor: '#005BAC', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden'},
  quantityButton: {width: 56, height: '100%', alignItems: 'center', justifyContent: 'center'},
  quantityButtonText: {color: '#FFFFFF', fontSize: 24, fontWeight: '900', lineHeight: 27},
  quantityText: {color: '#FFFFFF', fontSize: 16, fontWeight: '900'},
  bottomBar: {position: 'absolute', right: 0, bottom: 0, left: 0, minHeight: 82, paddingHorizontal: 18, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E4E9F0', shadowColor: '#102A43', shadowOffset: {width: 0, height: -4}, shadowOpacity: 0.08, shadowRadius: 12, elevation: 10},
  totalLabel: {color: '#627D98', fontSize: 12, fontWeight: '600'},
  totalPrice: {marginTop: 2, color: '#005BAC', fontSize: 20, fontWeight: '900'},
  bottomButton: {minWidth: 132, height: 44, paddingHorizontal: 18, borderRadius: 22, backgroundColor: '#005BAC', alignItems: 'center', justifyContent: 'center'},
  bottomAddButton: {backgroundColor: '#F9A826'},
  bottomButtonText: {color: '#FFFFFF', fontSize: 13, fontWeight: '900'},
});
