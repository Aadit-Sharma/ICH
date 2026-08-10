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

type PaymentStackParamList = {
  Payment: {
    total: number;
  };
  Success: {
    placedAt: string;
  };
};

type PaymentProps = NativeStackScreenProps<
  PaymentStackParamList,
  'Payment'
>;

export default function Payment({navigation, route}: PaymentProps) {
  const {total} = route.params;

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>('UPI');

  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);

    try {
      const payment = await processPayment({
        orderId: `TEMP-${Date.now()}`,
        amount: total,
        method: selectedMethod,
      });

      if (payment.status === 'SUCCESS') {
        navigation.navigate('Success', {
          placedAt: payment.createdAt,
        });
      }
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
});