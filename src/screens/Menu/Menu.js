import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar';
import {popularItems} from '../../data/foodData';
import Routes from '../../navigation/Routes';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/cartSlice';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getDescription = item => `Freshly prepared ${item.name} from Indian Coffee House.`;

export default function Menu({navigation, route}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalItems = useSelector(state => state.cart.totalItems);
  const [searchText, setSearchText] = useState('');
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenTranslateY = useRef(new Animated.Value(18)).current;
  const category = route.params?.category;
  const categoryName = category?.name || 'Menu';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(screenTranslateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [screenOpacity, screenTranslateY]);

  const menuItems = popularItems.filter(item => item.category === categoryName);
  const visibleItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  const getCartItem = itemId =>
    cartItems.find(cartItem => cartItem.id === itemId);

  const updateQuantity = action => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(action);
  };

  const handleAdd = (event, item) => {
    event.stopPropagation();
    updateQuantity(addToCart(item));
  };

  const handleQuantityChange = (event, action, itemId) => {
    event.stopPropagation();
    updateQuantity(action(itemId));
  };

  const handleFoodPress = item => {
    navigation.navigate(Routes.FOOD_DETAILS, {food: item});
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {opacity: screenOpacity, transform: [{translateY: screenTranslateY}]},
      ]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.title}>{categoryName}</Text>
        <Pressable
          onPress={() => navigation.navigate(Routes.CART)}
          style={styles.cartButton}
          accessibilityRole="button"
          accessibilityLabel="Open cart">
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.cartIcon}
            resizeMode="contain"
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        </Pressable>
      </View>

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <View style={styles.filterRow}>
        <View style={styles.allChip}>
          <Text style={styles.allChipText}>All</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}>
        {visibleItems.map(item => {
          const cartItem = getCartItem(item.id);
          const isVeg = item.isVeg !== false;

          return (
            <Pressable
              key={item.id}
              onPress={() => handleFoodPress(item)}
              style={({pressed}) => [styles.foodCard, pressed && styles.foodCardPressed]}>
              <Image source={item.image} style={styles.foodImage} resizeMode="cover" />
              <View style={styles.foodContent}>
                <View style={styles.nameRow}>
                  <Text style={styles.foodName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View
                    style={[styles.foodTypeIcon, isVeg ? styles.vegIcon : styles.nonVegIcon]}>
                    <View style={[styles.foodTypeDot, isVeg ? styles.vegDot : styles.nonVegDot]} />
                  </View>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description || getDescription(item)}
                </Text>
                <View style={styles.bottomRow}>
                  <Text style={styles.price}>Rs. {item.price}</Text>
                  {cartItem ? (
                    <View style={styles.quantitySelector}>
                      <Pressable
                        onPress={event =>
                          handleQuantityChange(event, decreaseQuantity, item.id)
                        }
                        style={styles.quantityButton}
                        accessibilityRole="button"
                        accessibilityLabel={`Decrease ${item.name} quantity`}>
                        <Text style={styles.quantityButtonText}>−</Text>
                      </Pressable>
                      <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                      <Pressable
                        onPress={event =>
                          handleQuantityChange(event, increaseQuantity, item.id)
                        }
                        style={styles.quantityButton}
                        accessibilityRole="button"
                        accessibilityLabel={`Increase ${item.name} quantity`}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      onPress={event => handleAdd(event, item)}
                      style={styles.addButton}
                      accessibilityRole="button"
                      accessibilityLabel={`Add ${item.name} to cart`}>
                      <Text style={styles.addButtonText}>ADD</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
        {visibleItems.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No items found in this category.</Text>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F7FA', paddingHorizontal: 18, paddingTop: 48},
  header: {height: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18},
  backButton: {width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#102A43', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.08, shadowRadius: 10},
  backText: {color: '#005BAC', fontSize: 36, fontWeight: '500', lineHeight: 38, marginTop: -3},
  title: {flex: 1, color: '#102A43', fontSize: 23, fontWeight: '900', marginHorizontal: 16},
  cartButton: {width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#102A43', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.08, shadowRadius: 10},
  cartIcon: {width: 23, height: 23},
  badge: {position: 'absolute', top: -4, right: -4, minWidth: 19, height: 19, borderRadius: 10, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9A826'},
  badgeText: {color: '#FFFFFF', fontSize: 10, fontWeight: '900'},
  filterRow: {flexDirection: 'row', marginTop: -8, marginBottom: 16},
  allChip: {height: 34, paddingHorizontal: 18, borderRadius: 17, backgroundColor: '#005BAC', alignItems: 'center', justifyContent: 'center'},
  allChipText: {color: '#FFFFFF', fontSize: 13, fontWeight: '800'},
  listContent: {paddingBottom: 32},
  foodCard: {backgroundColor: '#FFFFFF', borderRadius: 18, padding: 10, marginBottom: 14, flexDirection: 'row', shadowColor: '#102A43', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.09, shadowRadius: 16, elevation: 5},
  foodCardPressed: {transform: [{scale: 0.98}]},
  foodImage: {width: 100, height: 100, borderRadius: 14},
  foodContent: {flex: 1, marginLeft: 12, justifyContent: 'space-between'},
  nameRow: {flexDirection: 'row', alignItems: 'center'},
  foodName: {flex: 1, color: '#102A43', fontSize: 16, fontWeight: '900', paddingRight: 8},
  description: {color: '#52606D', fontSize: 12, lineHeight: 17, marginTop: 5},
  foodTypeIcon: {width: 16, height: 16, borderRadius: 2, alignItems: 'center', justifyContent: 'center'},
  vegIcon: {borderWidth: 1, borderColor: '#1E8E3E'},
  nonVegIcon: {borderWidth: 1, borderColor: '#D93025'},
  foodTypeDot: {width: 8, height: 8, borderRadius: 4},
  vegDot: {backgroundColor: '#1E8E3E'},
  nonVegDot: {backgroundColor: '#D93025'},
  bottomRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8},
  price: {color: '#005BAC', fontSize: 14, fontWeight: '900'},
  addButton: {height: 32, minWidth: 78, borderRadius: 16, backgroundColor: '#F9A826', alignItems: 'center', justifyContent: 'center'},
  addButtonText: {color: '#FFFFFF', fontSize: 12, fontWeight: '900'},
  quantitySelector: {height: 32, minWidth: 94, borderRadius: 16, backgroundColor: '#F9A826', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden'},
  quantityButton: {width: 30, height: '100%', alignItems: 'center', justifyContent: 'center'},
  quantityButtonText: {color: '#FFFFFF', fontSize: 19, fontWeight: '900', lineHeight: 21},
  quantityText: {color: '#FFFFFF', fontSize: 13, fontWeight: '900'},
  emptyState: {alignItems: 'center', paddingTop: 72},
  emptyText: {color: '#52606D', fontSize: 15, fontWeight: '700'},
});
