import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../../navigation/Routes';

import {SafeAreaView} from 'react-native-safe-area-context';
export default function Checkout({navigation}: any) {
  const {cartItems, totalAmount} = useSelector(
    (state: any) => state.cart,
  );

  const addressesByUser = useSelector(
    (state: any) => state.addresses.addressesByUser,
  );

  const selectedAddressByUser = useSelector(
    (state: any) => state.addresses.selectedAddressByUser,
  );

  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');

        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log(
          'Error loading user in Checkout:',
          error,
        );
      }
    };

    loadUser();
  }, []);

  const userKey =
    currentUser?.id == null
      ? null
      : String(currentUser.id);

  const addresses = userKey
    ? addressesByUser[userKey] || []
    : [];

  const selectedAddressId = userKey
    ? selectedAddressByUser[userKey]
    : null;

  const selectedAddress = addresses.find(
    (address: any) =>
      address.id === selectedAddressId,
  );

  const subtotal = totalAmount || 0;
  const gst = Math.round(subtotal * 0.05);
  const serviceCharge = subtotal > 0 ? 15 : 0;
  const grandTotal =
    subtotal + gst + serviceCharge;

  const continueToPayment = () => {
    if (!selectedAddress) {
      return;
    }

    navigation.navigate(Routes.PAYMENT, {
      cartItems,
      subtotal,
      tax: gst,
      serviceCharge,
      total: grandTotal,
      address: selectedAddress,
    });
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}>

      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Checkout
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ORDER SUMMARY */}

        <Text style={styles.sectionTitle}>
          Order Summary
        </Text>

        {cartItems.map((item: any) => (
          <View
            style={styles.itemRow}
            key={item.id}>

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>
                {item.name}
              </Text>

              <Text style={styles.itemQuantity}>
                Qty: {item.quantity}
              </Text>
            </View>

            <Text style={styles.itemPrice}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        ))}

        {/* DELIVERY ADDRESS */}

        <View style={styles.addressHeader}>
          <Text style={styles.sectionTitle}>
            Delivery Address
          </Text>

          <Pressable
            onPress={() =>
              navigation.navigate(
                Routes.ADDRESS_BOOK,
              )
            }>
            <Text style={styles.changeText}>
              {selectedAddress
                ? 'Change'
                : 'Add Address'}
            </Text>
          </Pressable>
        </View>

        {selectedAddress ? (
          <View style={styles.addressCard}>
            <View style={styles.addressCardHeader}>
              <Text style={styles.addressName}>
                {selectedAddress.fullName}
              </Text>

              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>
                  Selected
                </Text>
              </View>
            </View>

            <Text style={styles.addressText}>
              {selectedAddress.addressLine1}
            </Text>

            <Text style={styles.addressText}>
              {selectedAddress.city},{' '}
              {selectedAddress.state} -{' '}
              {selectedAddress.pincode}
            </Text>

            {selectedAddress.landmark ? (
              <Text style={styles.addressText}>
                Landmark: {selectedAddress.landmark}
              </Text>
            ) : null}

            <Text style={styles.phoneText}>
              Phone: {selectedAddress.phone}
            </Text>

            {selectedAddress.deliveryInstructions ? (
              <Text style={styles.instructions}>
                Instructions:{' '}
                {selectedAddress.deliveryInstructions}
              </Text>
            ) : null}
          </View>
        ) : (
          <Pressable
            onPress={() =>
              navigation.navigate(Routes.ADDRESS_BOOK)
            }
            style={styles.noAddressCard}>

            <Text style={styles.noAddressTitle}>
              No delivery address selected
            </Text>

            <Text style={styles.noAddressText}>
              Add or select an address to continue.
            </Text>
          </Pressable>
        )}

        {/* BILL SUMMARY */}

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>GST (5%)</Text>
            <Text>₹{gst}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>Service & Packaging</Text>
            <Text>₹{serviceCharge}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>
              Grand Total
            </Text>

            <Text style={styles.totalValue}>
              ₹{grandTotal}
            </Text>
          </View>
        </View>

        {/* PAYMENT BUTTON */}

        <Pressable
          onPress={continueToPayment}
          disabled={!selectedAddress}
          style={[
            styles.continueButton,
            !selectedAddress &&
              styles.disabledButton,
          ]}>

          <Text style={styles.continueButtonText}>
            Continue to Payment
          </Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    height: 64,
    backgroundColor: '#005BAC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 38,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  headerSpacer: {
    width: 42,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 14,
  },

  itemRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '700',
  },

  itemQuantity: {
    marginTop: 4,
    color: '#627D98',
    fontSize: 13,
  },

  itemPrice: {
    color: '#005BAC',
    fontSize: 16,
    fontWeight: '800',
  },

  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  changeText: {
    color: '#005BAC',
    fontSize: 13,
    fontWeight: '800',
  },

  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    borderWidth: 1.5,
    borderColor: '#005BAC',
    marginBottom: 14,
  },

  addressCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  addressName: {
    flex: 1,
    color: '#102A43',
    fontSize: 16,
    fontWeight: '800',
  },

  selectedBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  selectedBadgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '800',
  },

  addressText: {
    color: '#627D98',
    fontSize: 13,
    lineHeight: 19,
  },

  phoneText: {
    color: '#52606D',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 7,
  },

  instructions: {
    color: '#52606D',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },

  noAddressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    marginBottom: 14,
  },

  noAddressTitle: {
    color: '#102A43',
    fontSize: 15,
    fontWeight: '800',
  },

  noAddressText: {
    color: '#627D98',
    fontSize: 13,
    marginTop: 5,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 4,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E7EB',
    marginVertical: 10,
  },

  totalLabel: {
    color: '#102A43',
    fontSize: 17,
    fontWeight: '800',
  },

  totalValue: {
    color: '#005BAC',
    fontSize: 19,
    fontWeight: '900',
  },

  continueButton: {
    backgroundColor: '#F9A826',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
  },

  disabledButton: {
    opacity: 0.45,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});