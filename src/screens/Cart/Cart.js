import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/cartSlice';
import Routes from '../../navigation/Routes';

export default function Cart({navigation}) {
  const dispatch = useDispatch();
  const {cartItems, totalAmount, totalItems} = useSelector(state => state.cart);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    navigation.navigate(Routes.SUCCESS);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={['#005BAC', '#1976D2']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}>
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
        <Text style={styles.title}>My Cart</Text>
        <Pressable
          onPress={handleClearCart}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Clear cart">
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.clearCartIcon}
            resizeMode="contain"
          />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </LinearGradient>

      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}>
              {cartItems.map(item => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={item.image} style={styles.image} resizeMode="cover" />
                  <View style={styles.itemDetails}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>Rs. {item.price}</Text>
                    <View style={styles.quantitySelector}>
                      <Pressable
                        onPress={() => dispatch(decreaseQuantity(item.id))}
                        style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </Pressable>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <Pressable
                        onPress={() => dispatch(increaseQuantity(item.id))}
                        style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                  <Text style={styles.itemTotal}>Rs. {item.price * item.quantity}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalAmount}>Rs. {totalAmount}</Text>
              </View>
              <Pressable onPress={handlePlaceOrder} style={styles.placeOrderButton}>
                <Text style={styles.placeOrderText}>PLACE ORDER</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#7cb3e3'},
  header: {height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, shadowColor: '#003A70', shadowOffset: {width: 0, height: 7}, shadowOpacity: 0.18, shadowRadius: 14, elevation: 8},
  headerButton: {width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center'},
  backIcon: {width: 30, height: 30, tintColor: '#FFFFFF'},
  clearCartIcon: {width: 25, height: 25, tintColor: '#FFFFFF'},
  title: {position: 'absolute', left: 70, right: 70, color: '#FFFFFF', fontSize: 21, fontWeight: '900', textAlign: 'center'},
  badge: {position: 'absolute', top: 0, right: 0, minWidth: 19, height: 19, borderRadius: 10, backgroundColor: '#F9A826', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4},
  badgeText: {color: '#FFFFFF', fontSize: 10, fontWeight: '900'},
  container: {flex: 1, backgroundColor: '#F5F7FA', padding: 18},
  emptyState: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  emptyText: {color: '#52606D', fontSize: 16, fontWeight: '700'},
  list: {paddingBottom: 16},
  itemCard: {backgroundColor: '#FFFFFF', borderRadius: 18, padding: 10, marginBottom: 14, flexDirection: 'row', alignItems: 'center', shadowColor: '#102A43', shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4},
  image: {width: 78, height: 78, borderRadius: 14},
  itemDetails: {flex: 1, marginLeft: 12},
  name: {color: '#102A43', fontSize: 15, fontWeight: '800'},
  price: {color: '#005BAC', fontSize: 13, fontWeight: '800', marginTop: 5},
  quantitySelector: {width: 102, height: 32, borderRadius: 16, backgroundColor: '#F9A826', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, overflow: 'hidden'},
  quantityButton: {width: 32, height: '100%', alignItems: 'center', justifyContent: 'center'},
  quantityButtonText: {color: '#FFFFFF', fontSize: 20, fontWeight: '900', lineHeight: 22},
  quantityText: {color: '#FFFFFF', fontSize: 14, fontWeight: '900'},
  itemTotal: {alignSelf: 'flex-start', color: '#102A43', fontSize: 13, fontWeight: '900'},
  footer: {backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, shadowColor: '#102A43', shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4},
  totalRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14},
  totalLabel: {color: '#102A43', fontSize: 17, fontWeight: '800'},
  totalAmount: {color: '#005BAC', fontSize: 19, fontWeight: '900'},
  placeOrderButton: {height: 48, borderRadius: 24, backgroundColor: '#F9A826', alignItems: 'center', justifyContent: 'center'},
  placeOrderText: {color: '#FFFFFF', fontSize: 14, fontWeight: '900'},
});
