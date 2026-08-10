import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {PaymentMethod} from '../../types/payment';
import {processPayment} from '../../services/paymentService';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createOrder,
} from '../../redux/slices/ordersSlice';
import {
  createBill,
} from '../../redux/slices/billsSlice';
import {clearCart} from '../../redux/slices/cartSlice';
import type {CartItem} from '../../types/cart';
import type {DeliveryAddress} from '../../types/address';
import {store} from '../../redux/store';
type PaymentStackParamList = {
  Payment: {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  address: DeliveryAddress;
};
  Success: {
    placedAt: string;
  };
};

type PaymentProps = NativeStackScreenProps<
  PaymentStackParamList,
  'Payment'
>;



export default function Payment({navigation, route}: 
PaymentProps) {
  const {
  cartItems,
  subtotal,
  tax,
  serviceCharge,
  total,
  address,
} = route.params;
	const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>('UPI');

  const [processing, setProcessing] = useState(false);
const [paymentError, setPaymentError] = useState('');
  const handlePayment = async () => {
  setProcessing(true);
 setPaymentError('');

  try {
    const payment = await processPayment({
      orderId: `TEMP-${Date.now()}`,
      amount: total,
      method: selectedMethod,
    });

    if (payment.status === 'FAILED') {
  setPaymentError(
    'Your payment could not be completed. Please try again.',
  );
  return;
}

if (payment.status !== 'SUCCESS') {
  setPaymentError(
    'Payment could not be completed. Please try again.',
  );
  return;
}

    const savedUser = await AsyncStorage.getItem('user');

    if (!savedUser) {
      throw new Error('Logged-in user session not found.');
    }

    const user = JSON.parse(savedUser);

    dispatch(
  createOrder({
    items: cartItems,
    total,
    placedAt: payment.createdAt,
    subtotal,
    tax,
    serviceCharge,
    userId: user.id,
    username: user.username,
    address,
  }),
);

const createdOrder = store.getState().orders.latestOrder;

if (!createdOrder) {
  throw new Error('Order creation failed.');
}

dispatch(createBill({order: createdOrder}));

dispatch(clearCart());
    navigation.navigate('Success', {
      placedAt: payment.createdAt,
    });
  } catch (error) {
    console.error('Payment processing failed:', error);
  } finally {
    setProcessing(false);
  }
};
   return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Payment</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Payment Method</Text>

        <Pressable
          onPress={() => setSelectedMethod('UPI')}
          style={[
            styles.methodCard,
            selectedMethod === 'UPI' && styles.selectedCard,
          ]}>
          <View>
            <Text style={styles.methodTitle}>UPI</Text>
            <Text style={styles.methodSubtitle}>
              Google Pay, PhonePe, Paytm
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'UPI' ? '●' : '○'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedMethod('CARD')}
          style={[
            styles.methodCard,
            selectedMethod === 'CARD' && styles.selectedCard,
          ]}>
          <View>
            <Text style={styles.methodTitle}>Card</Text>
            <Text style={styles.methodSubtitle}>
              Credit or Debit Card
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'CARD' ? '●' : '○'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedMethod('NET_BANKING')}
          style={[
            styles.methodCard,
            selectedMethod === 'NET_BANKING' && styles.selectedCard,
          ]}>
          <View>
            <Text style={styles.methodTitle}>Net Banking</Text>
            <Text style={styles.methodSubtitle}>
              Pay using your bank account
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'NET_BANKING' ? '●' : '○'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedMethod('COD')}
          style={[
            styles.methodCard,
            selectedMethod === 'COD' && styles.selectedCard,
          ]}>
          <View>
            <Text style={styles.methodTitle}>
              Cash on Delivery
            </Text>
            <Text style={styles.methodSubtitle}>
              Pay when your order arrives
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'COD' ? '●' : '○'}
          </Text>
        </Pressable>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Amount to Pay</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>

       {paymentError ? (
  <View style={styles.failureCard}>
    <Text style={styles.failureIcon}>!</Text>

    <Text style={styles.failureTitle}>
      Payment Failed
    </Text>

    <Text style={styles.failureMessage}>
      {paymentError}
    </Text>

    <Pressable
      onPress={handlePayment}
      disabled={processing}
      style={styles.retryButton}>
      <Text style={styles.retryButtonText}>
        Try Again
      </Text>
    </Pressable>

    <Pressable
      onPress={() => navigation.goBack()}
      disabled={processing}
      style={styles.backToCheckoutButton}>
      <Text style={styles.backToCheckoutText}>
        Back to Checkout
      </Text>
    </Pressable>
  </View>
) : (
  <Pressable
    onPress={handlePayment}
    disabled={processing}
    style={[
      styles.payButton,
      processing && styles.disabledButton,
    ]}>
    {processing ? (
      <View style={styles.processingRow}>
        <ActivityIndicator color="#FFFFFF" />
        <Text style={styles.payButtonText}>
          Processing...
        </Text>
      </View>
    ) : (
      <Text style={styles.payButtonText}>
        Pay ₹{total}
      </Text>
    )}
  </Pressable>
)} 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    height: 60,
    backgroundColor: '#005BAC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  back: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 36,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  headerSpacer: {
    width: 30,
  },

  content: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 16,
  },

  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EB',
  },

  selectedCard: {
    borderColor: '#005BAC',
    borderWidth: 2,
  },

  methodTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102A43',
  },

  methodSubtitle: {
    fontSize: 12,
    color: '#627D98',
    marginTop: 4,
  },

  radio: {
    fontSize: 22,
    color: '#005BAC',
  },

  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102A43',
  },

  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#005BAC',
  },

  payButton: {
    backgroundColor: '#F9A826',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
  },

  disabledButton: {
    opacity: 0.7,
  },

  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
failureCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  marginTop: 22,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#F5C2C7',
},

failureIcon: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: '#FDECEC',
  color: '#D32F2F',
  fontSize: 25,
  fontWeight: '900',
  textAlign: 'center',
  lineHeight: 42,
  marginBottom: 10,
},

failureTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#102A43',
},

failureMessage: {
  fontSize: 13,
  color: '#627D98',
  textAlign: 'center',
  lineHeight: 19,
  marginTop: 6,
},

retryButton: {
  width: '100%',
  backgroundColor: '#F9A826',
  borderRadius: 12,
  paddingVertical: 14,
  alignItems: 'center',
  marginTop: 18,
},

retryButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '800',
},

backToCheckoutButton: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#005BAC',
  borderRadius: 12,
  paddingVertical: 13,
  alignItems: 'center',
  marginTop: 10,
},

backToCheckoutText: {
  color: '#005BAC',
  fontSize: 15,
  fontWeight: '800',
},
});