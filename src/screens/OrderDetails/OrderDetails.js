import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Routes from '../../navigation/Routes';
export default function OrderDetails({navigation, route}) {
  const order = route.params?.order;

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Order Details
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Order not found
          </Text>

          <Text style={styles.emptyText}>
            The selected order could not be loaded.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const orderedAt = new Date(order.placedAt);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Order Details
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ORDER HEADER */}
        <View style={styles.orderHeaderCard}>
          <View>
            <Text style={styles.orderLabel}>
              Order ID
            </Text>

            <Text style={styles.orderId}>
              {order.id}
            </Text>

            <Text style={styles.orderDate}>
              {orderedAt.toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {order.status}
            </Text>
          </View>
        </View>

        {/* ITEMS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Items
          </Text>

          {order.items.map(item => (
            <View
              key={item.id}
              style={styles.itemRow}>
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
        </View>

        {/* PRICING */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Bill Summary
          </Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal
            </Text>

            <Text style={styles.summaryValue}>
              ₹{order.subtotal}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              GST
            </Text>

            <Text style={styles.summaryValue}>
              ₹{order.tax}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Service & Packaging
            </Text>

            <Text style={styles.summaryValue}>
              ₹{order.serviceCharge}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              ₹{order.total}
            </Text>
          </View>
        </View>

        {/* DELIVERY ADDRESS */}
        {order.address && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Delivery Address
            </Text>

            <Text style={styles.addressName}>
              {order.address.fullName}
            </Text>

            <Text style={styles.addressText}>
              {order.address.addressLine1}
            </Text>

            <Text style={styles.addressText}>
              {order.address.city},{' '}
              {order.address.state} -{' '}
              {order.address.pincode}
            </Text>

            {order.address.landmark ? (
              <Text style={styles.addressText}>
                Landmark: {order.address.landmark}
              </Text>
            ) : null}

            <Text style={styles.addressPhone}>
              Phone: {order.address.phone}
            </Text>

            {order.address.deliveryInstructions ? (
              <Text style={styles.instructions}>
                Instructions: {order.address.deliveryInstructions}
              </Text>
            ) : null}
          </View>
        )}

        {/* PAYMENT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Payment
          </Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Method
            </Text>

            <Text style={styles.summaryValue}>
              {order.paymentMethod || 'Not available'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Transaction ID
            </Text>

            <Text
              style={styles.transactionId}
              numberOfLines={1}>
              {order.paymentId || 'Not available'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Status
            </Text>

            <Text style={styles.paidStatus}>
              {order.paymentStatus === 'SUCCESS'
                ? '✓ Paid'
                : order.paymentStatus || 'Unknown'}
            </Text>
          </View>
        </View>

        {/* TRACK ORDER */}
        <Pressable
          onPress={() =>
            navigation.navigate(Routes.ORDER_TRACKING, {
              order,
            })
          }
          style={styles.trackButton}>
          <Text style={styles.trackButtonText}>
            Track Order
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
    fontWeight: '300',
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
    paddingBottom: 32,
  },

  orderHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E9F0',
    marginBottom: 14,
  },

  orderLabel: {
    color: '#627D98',
    fontSize: 12,
    fontWeight: '600',
  },

  orderId: {
    marginTop: 3,
    color: '#005BAC',
    fontSize: 19,
    fontWeight: '900',
  },

  orderDate: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 12,
  },

  statusBadge: {
    backgroundColor: '#EAF4FF',
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  statusText: {
    color: '#005BAC',
    fontSize: 12,
    fontWeight: '800',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E9F0',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    color: '#243B53',
    fontSize: 14,
    fontWeight: '700',
  },

  itemQuantity: {
    marginTop: 3,
    color: '#627D98',
    fontSize: 12,
  },

  itemPrice: {
    color: '#102A43',
    fontSize: 14,
    fontWeight: '800',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },

  summaryLabel: {
    flex: 1,
    color: '#627D98',
    fontSize: 13,
  },

  summaryValue: {
    color: '#243B53',
    fontSize: 13,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E9F0',
    marginVertical: 10,
  },

  totalLabel: {
    color: '#102A43',
    fontSize: 15,
    fontWeight: '800',
  },

  totalValue: {
    color: '#005BAC',
    fontSize: 18,
    fontWeight: '900',
  },

  addressName: {
    color: '#243B53',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },

  addressText: {
    color: '#627D98',
    fontSize: 13,
    lineHeight: 19,
  },

  addressPhone: {
    color: '#52606D',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 7,
  },

  instructions: {
    color: '#627D98',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  transactionId: {
    maxWidth: 180,
    color: '#005BAC',
    fontSize: 12,
    fontWeight: '800',
  },

  paidStatus: {
    color: '#1E8E3E',
    fontSize: 13,
    fontWeight: '800',
  },

  trackButton: {
    backgroundColor: '#F9A826',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 2,
  },

  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  emptyTitle: {
    color: '#102A43',
    fontSize: 20,
    fontWeight: '800',
  },

  emptyText: {
    color: '#627D98',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});