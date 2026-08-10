import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function Checkout({navigation}: any) {
  const {cartItems, totalAmount} = useSelector(
    (state: any) => state.cart,
  );

  const subtotal = totalAmount || 0;
  const gst = Math.round(subtotal * 0.05);
  const serviceCharge = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal + gst + serviceCharge;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Checkout</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        {cartItems.map((item: any) => (
          <View style={styles.itemRow} key={item.id}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>
                Qty: {item.quantity}
              </Text>
            </View>

            <Text style={styles.itemPrice}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        ))}

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
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹{grandTotal}</Text>
          </View>
        </View>

<Pressable
  onPress={() =>
    navigation.navigate('Payment', {
      cartItems,
      subtotal,
      tax: gst,
      serviceCharge,
      total: grandTotal,
    })
  }
  style={styles.continueButton}
>
  <Text style={styles.continueButtonText}>
    Continue to Payment
  </Text>
</Pressable>
      </ScrollView>
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
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#102A43',
  },

  itemQuantity: {
    marginTop: 4,
    color: '#627D98',
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#005BAC',
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 12,
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
    fontSize: 17,
    fontWeight: '800',
    color: '#102A43',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#005BAC',
  },

  continueButton: {
    backgroundColor: '#F9A826',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});