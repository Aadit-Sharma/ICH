import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RazorpayCheckout from 'react-native-razorpay';
import type {PaymentMethod} from '../../types/payment';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {CartItem} from '../../types/cart';
import type {DeliveryAddress} from '../../types/address';
import {createOrder} from '../../redux/slices/ordersSlice';
import {createBill} from '../../redux/slices/billsSlice';
import {clearCart} from '../../redux/slices/cartSlice';

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

// Android emulator -> Windows host machine
const BACKEND_URL = 'http://192.168.231.143:5000';

export default function Payment({
  navigation,
  route,
}: PaymentProps) {
  const {
    cartItems,
    subtotal,
    tax,
    serviceCharge,
    total,
    address,
  } = route.params;
  const insets = useSafeAreaInsets();

    const topPadding =
      (Platform.OS === 'android'
        ? StatusBar.currentHeight || insets.top
        : insets.top) + 12;

  const dispatch = useDispatch();

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>('UPI');

  const [processing, setProcessing] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState('');

  const handlePayment = async () => {
    setProcessing(true);
    setPaymentError('');

    try {
      /*
       * Get the logged-in user
       */
      const savedUser =
        await AsyncStorage.getItem('user');

      let user: any = null;

      if (savedUser) {
        user = JSON.parse(savedUser);
      }

      if (!user?.id) {
        throw new Error(
          'Please login again before placing an order.',
        );
      }

      /*
       * CASH ON DELIVERY
       *
       * COD does not use Razorpay.
       * We directly create the order on our backend.
       */
      if (selectedMethod === 'COD') {
        const placedAt =
          new Date().toISOString();

        const orderResponse = await fetch(
          `${BACKEND_URL}/api/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,

              username:
                user.username ||
                user.name ||
                '',

              items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              })),

              subtotal,
              tax,
              serviceCharge,
              total,

              address,

              paymentMethod:
                'Cash on Delivery',

              razorpayOrderId: '',
              razorpayPaymentId: '',
            }),
          },
        );

        const orderData =
          await orderResponse.json();

        if (
          !orderResponse.ok ||
          !orderData.success ||
          !orderData.order
        ) {
          throw new Error(
            orderData.message ||
              'Unable to create COD order.',
          );
        }

        const backendOrder =
          orderData.order;

        console.log(
          'COD order created:',
          backendOrder,
        );

        /*
         * Store the backend-created order in Redux
         */
        dispatch(
          createOrder({
            orderId: backendOrder.id,

            items: backendOrder.items,

            total: backendOrder.total,

            subtotal:
              backendOrder.subtotal,

            tax: backendOrder.tax,

            serviceCharge:
              backendOrder.serviceCharge,

            placedAt:
              backendOrder.placedAt,

            userId:
              backendOrder.userId,

            username:
              backendOrder.username,

            address:
              backendOrder.address,

            paymentStatus:
              backendOrder.paymentStatus,

            paymentMethod:
              backendOrder.paymentMethod,

            razorpayOrderId:
              backendOrder.razorpayOrderId,

            razorpayPaymentId:
              backendOrder.razorpayPaymentId,
          }),
        );

        /*
         * Create bill after backend order
         * has been successfully created.
         */
        dispatch(
          createBill({
            order: backendOrder,
          }),
        );

        /*
         * Clear cart only after order
         * and bill have been created.
         */
        dispatch(clearCart());

        /*
         * Go to Success screen.
         */
        navigation.replace('Success', {
          placedAt:
            backendOrder.placedAt ||
            placedAt,
        });

        return;
      }

      /*
       * RAZORPAY PAYMENT
       */

      /*
       * STEP 1:
       * Ask our backend to create a Razorpay order.
       */
      const response = await fetch(
        `${BACKEND_URL}/api/payment/create-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            amount: total,
          }),
        },
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.order
      ) {
        throw new Error(
          data.message ||
            'Unable to create payment order.',
        );
      }

      const razorpayOrder =
        data.order;

      /*
       * STEP 2:
       * Open Razorpay Checkout.
       */
      const options = {
        key: data.keyId || '',
        amount: String(
          razorpayOrder.amount,
        ),
        currency:
          razorpayOrder.currency,
        name: 'ICH',
        description:
          'ICH Food Order',
        order_id:
          razorpayOrder.id,

        prefill: {
          name:
            address?.fullName ||
            user?.name ||
            user?.username ||
            '',

          contact:
            address?.phone || '',

          email:
            user?.email || '',
        },

        theme: {
          color: '#005BAC',
        },
      };

      const paymentResponse =
        await RazorpayCheckout.open(
          options,
        );

      console.log(
        'Razorpay checkout success:',
        paymentResponse,
      );

      /*
       * STEP 3:
       * Verify Razorpay payment
       * with our backend.
       */
      const verificationResponse =
        await fetch(
          `${BACKEND_URL}/api/payment/verify`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id:
                paymentResponse.razorpay_order_id,

              razorpay_payment_id:
                paymentResponse.razorpay_payment_id,

              razorpay_signature:
                paymentResponse.razorpay_signature,
            }),
          },
        );

      const verificationData =
        await verificationResponse.json();

      if (
        !verificationResponse.ok ||
        !verificationData.success
      ) {
        throw new Error(
          verificationData.message ||
            'Payment verification failed.',
        );
      }

      /*
       * STEP 4:
       * Create the ICH order.
       */
      const orderResponse =
        await fetch(
          `${BACKEND_URL}/api/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              userId: user.id,

              username:
                user.username ||
                user.name ||
                '',

              items: cartItems.map(
                item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity:
                    item.quantity,
                }),
              ),

              subtotal,
              tax,
              serviceCharge,
              total,

              address,

              paymentMethod:
                'Razorpay',

              razorpayOrderId:
                paymentResponse.razorpay_order_id,

              razorpayPaymentId:
                paymentResponse.razorpay_payment_id,
            }),
          },
        );

      const orderData =
        await orderResponse.json();

      if (
        !orderResponse.ok ||
        !orderData.success ||
        !orderData.order
      ) {
        throw new Error(
          orderData.message ||
            'Unable to create ICH order.',
        );
      }

      const backendOrder =
        orderData.order;

      console.log(
        'ICH order created:',
        backendOrder,
      );

      /*
       * STEP 5:
       * Store backend-created order in Redux.
       */
      dispatch(
        createOrder({
          orderId:
            backendOrder.id,

          items:
            backendOrder.items,

          total:
            backendOrder.total,

          subtotal:
            backendOrder.subtotal,

          tax:
            backendOrder.tax,

          serviceCharge:
            backendOrder.serviceCharge,

          placedAt:
            backendOrder.placedAt,

          userId:
            backendOrder.userId,

          username:
            backendOrder.username,

          address:
            backendOrder.address,

          paymentStatus:
            backendOrder.paymentStatus,

          paymentMethod:
            backendOrder.paymentMethod,

          razorpayOrderId:
            backendOrder.razorpayOrderId,

          razorpayPaymentId:
            backendOrder.razorpayPaymentId,
        }),
      );

      /*
       * STEP 6:
       * Create bill.
       */
      dispatch(
        createBill({
          order: backendOrder,
        }),
      );

      /*
       * STEP 7:
       * Clear cart.
       */
      dispatch(clearCart());

      /*
       * STEP 8:
       * Go to Success screen.
       */
      navigation.replace(
        'Success',
        {
          placedAt:
            backendOrder.placedAt,
        },
      );
    } catch (error: any) {
      console.error(
        'Payment/order failed:',
        error,
      );

      const message =
        error?.description ||
        error?.message ||
        'Payment could not be completed. Please try again.';

      setPaymentError(message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={[]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1565C0"
      />

      <View
        style={[
          styles.header,
          {
            height: Math.max(92, topPadding + 56),
            paddingTop: topPadding,
          },
        ]}>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">

          <Image
            source={require('../../assets/icons/back arrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />

        </Pressable>

        <Text style={styles.headerTitle}>
          Payment
        </Text>

        <View style={styles.headerSpacer} />

      </View>

      <View style={styles.content}>
        <Text
          style={styles.sectionTitle}>
          Choose Payment Method
        </Text>

        <Pressable
          onPress={() =>
            setSelectedMethod('UPI')
          }
          style={[
            styles.methodCard,
            selectedMethod === 'UPI' &&
              styles.selectedCard,
          ]}>
          <View>
            <Text
              style={styles.methodTitle}>
              UPI
            </Text>

            <Text
              style={styles.methodSubtitle}>
              Google Pay, PhonePe, Paytm
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'UPI'
              ? '●'
              : '○'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            setSelectedMethod('CARD')
          }
          style={[
            styles.methodCard,
            selectedMethod === 'CARD' &&
              styles.selectedCard,
          ]}>
          <View>
            <Text
              style={styles.methodTitle}>
              Card
            </Text>

            <Text
              style={styles.methodSubtitle}>
              Credit or Debit Card
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'CARD'
              ? '●'
              : '○'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            setSelectedMethod(
              'NET_BANKING',
            )
          }
          style={[
            styles.methodCard,
            selectedMethod ===
              'NET_BANKING' &&
              styles.selectedCard,
          ]}>
          <View>
            <Text
              style={styles.methodTitle}>
              Net Banking
            </Text>

            <Text
              style={styles.methodSubtitle}>
              Pay using your bank account
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod ===
            'NET_BANKING'
              ? '●'
              : '○'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            setSelectedMethod('COD')
          }
          style={[
            styles.methodCard,
            selectedMethod === 'COD' &&
              styles.selectedCard,
          ]}>
          <View>
            <Text
              style={styles.methodTitle}>
              Cash on Delivery
            </Text>

            <Text
              style={styles.methodSubtitle}>
              Pay when your order arrives
            </Text>
          </View>

          <Text style={styles.radio}>
            {selectedMethod === 'COD'
              ? '●'
              : '○'}
          </Text>
        </Pressable>

        <View
          style={styles.totalCard}>
          <Text
            style={styles.totalLabel}>
            Amount to Pay
          </Text>

          <Text
            style={styles.totalValue}>
            ₹{total}
          </Text>
        </View>

        {paymentError ? (
          <View
            style={styles.failureCard}>
            <Text
              style={styles.failureIcon}>
              !
            </Text>

            <Text
              style={styles.failureTitle}>
              Payment Failed
            </Text>

            <Text
              style={
                styles.failureMessage
              }>
              {paymentError}
            </Text>

            <Pressable
              onPress={handlePayment}
              disabled={processing}
              style={styles.retryButton}>
              <Text
                style={
                  styles.retryButtonText
                }>
                Try Again
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                navigation.goBack()
              }
              disabled={processing}
              style={
                styles.backToCheckoutButton
              }>
              <Text
                style={
                  styles.backToCheckoutText
                }>
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
              processing &&
                styles.disabledButton,
            ]}>
            {processing ? (
              <View
                style={
                  styles.processingRow
                }>
                <ActivityIndicator
                  color="#FFFFFF"
                />

                <Text
                  style={
                    styles.payButtonText
                  }>
                  {selectedMethod === 'COD'
                    ? 'Placing Order...'
                    : 'Opening Razorpay...'}
                </Text>
              </View>
            ) : (
              <Text
                style={
                  styles.payButtonText
                }>
                {selectedMethod === 'COD'
                  ? `Place Order • ₹${total}`
                  : `Pay ₹${total}`}
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
    backgroundColor: '#1565C0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  headerSpacer: {
    width: 44,
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