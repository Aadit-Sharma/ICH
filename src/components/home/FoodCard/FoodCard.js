import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../../redux/slices/cartSlice";

const getDescription = item =>
  item.description || `Freshly prepared ${item.name} from Indian Coffee House.`;

export default function FoodCard({item, onPress, onAdd}) {
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.cartItems.find(currentItem => currentItem.id === item.id),
  );

  const updateQuantity = action => dispatch(action(item.id));
  const handleAdd = event => {
    event.stopPropagation();
    dispatch(addToCart(item));
    onAdd?.(item);
  };

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({pressed}) => [styles.foodCard, pressed && styles.pressed]}>
      <Image source={item.image} style={styles.foodImage} resizeMode="cover" />
      <View style={styles.foodContent}>
        <View style={styles.nameRow}>
          <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.foodTypeIcon}><View style={styles.foodTypeDot} /></View>
        </View>
        <Text style={styles.description} numberOfLines={2}>{getDescription(item)}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rs. {item.price}</Text>
          {cartItem ? (
            <View style={styles.quantitySelector}>
              <Pressable onPress={event => { event.stopPropagation(); updateQuantity(decreaseQuantity); }} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>−</Text>
              </Pressable>
              <Text style={styles.quantityText}>{cartItem.quantity}</Text>
              <Pressable onPress={event => { event.stopPropagation(); updateQuantity(increaseQuantity); }} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  foodCard: {width: '100%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 10, marginBottom: 16, flexDirection: 'row', shadowColor: '#102A43', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.09, shadowRadius: 16, elevation: 5},
  pressed: {transform: [{scale: 0.98}]},
  foodImage: {width: 100, height: 100, borderRadius: 14},
  foodContent: {flex: 1, marginLeft: 12, justifyContent: 'space-between'},
  nameRow: {flexDirection: 'row', alignItems: 'center'},
  foodName: {flex: 1, color: '#102A43', fontSize: 16, fontWeight: '900', paddingRight: 8},
  description: {color: '#52606D', fontSize: 12, lineHeight: 17, marginTop: 5},
  foodTypeIcon: {width: 16, height: 16, borderRadius: 2, borderWidth: 1, borderColor: '#1E8E3E', alignItems: 'center', justifyContent: 'center'},
  foodTypeDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#1E8E3E'},
  bottomRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8},
  price: {color: '#005BAC', fontSize: 14, fontWeight: '900'},
  addButton: {height: 32, minWidth: 78, borderRadius: 16, backgroundColor: '#F9A826', alignItems: 'center', justifyContent: 'center'},
  addButtonText: {color: '#FFFFFF', fontSize: 12, fontWeight: '900'},
  quantitySelector: {height: 32, minWidth: 94, borderRadius: 16, backgroundColor: '#F9A826', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden'},
  quantityButton: {width: 30, height: '100%', alignItems: 'center', justifyContent: 'center'},
  quantityButtonText: {color: '#FFFFFF', fontSize: 19, fontWeight: '900', lineHeight: 21},
  quantityText: {color: '#FFFFFF', fontSize: 13, fontWeight: '900'},
});
