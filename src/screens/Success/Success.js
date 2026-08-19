import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import Routes from '../../navigation/Routes';

export default function Success({navigation}) {
  const order = useSelector(state => state.orders.latestOrder);

  const orderedAt = order
    ? new Date(order.placedAt)
    : new Date();

  const checkScale = useRef(
    new Animated.Value(0.7),
  ).current;

  const checkOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const contentOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const contentTranslate = useRef(
    new Animated.Value(16),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(checkOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.spring(checkScale, {
        toValue: 1,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),

      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        delay: 120,
        useNativeDriver: true,
      }),

      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 300,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    checkOpacity,
    checkScale,
    contentOpacity,
    contentTranslate,
  ]);

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: Routes.HOME}],
    });
  };

  const viewOrders = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: Routes.HOME,
          params: {screen: 'Orders'},
        },
      ],
    });
  };

 const viewOrderDetails = () => {
  viewOrders();
};

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Order Confirmation
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.checkCircle,
              {
                opacity: checkOpacity,
                transform: [{scale: checkScale}],
              },
            ]}>
            <Text style={styles.checkmark}>✓</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: contentOpacity,
                transform: [
                  {translateY: contentTranslate},
                ],
              },
            ]}>
            <Text style={styles.title}>
              Order Placed!
            </Text>

            <Text style={styles.message}>
              Your order has been confirmed and is being
              prepared.
            </Text>

            {order && (
              <>
                <View style={styles.detailsCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      Order ID
                    </Text>

                    <Text style={styles.orderId}>
                      {order.id}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      Amount Paid
                    </Text>

                    <Text style={styles.amountValue}>
                      ₹{order.total}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      Estimated preparation
                    </Text>

                    <Text style={styles.detailValue}>
                      15–20 mins
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      Order placed
                    </Text>

                    <Text style={styles.detailValue}>
                      {orderedAt.toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>

                {order.address && (
                  <View style={styles.addressCard}>
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
                  </View>
                )}

                <Pressable
                  onPress={viewOrderDetails}
                  style={styles.primaryButton}
                  accessibilityRole="button">
                  <Text style={styles.primaryButtonText}>
                    View Order
                  </Text>
                </Pressable>
              </>
            )}

            <Pressable
              onPress={goHome}
              style={[
                styles.secondaryButton,
                order && styles.secondaryButtonSpacing,
              ]}
              accessibilityRole="button">
              <Text style={styles.secondaryButtonText}>
                Continue Shopping
              </Text>
            </Pressable>

            <Pressable
              onPress={viewOrders}
              style={styles.ordersButton}
              accessibilityRole="button">
              <Text style={styles.ordersButtonText}>
                View My Orders
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#005BAC',
  },

  header: {
    height: 64,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#005BAC',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 36,
    paddingBottom: 32,
    backgroundColor: '#F5F7FA',
  },

  checkCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24A148',
    shadowColor: '#155724',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 7,
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '700',
    lineHeight: 58,
  },

  content: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    marginTop: 20,
    color: '#102A43',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
  },

  message: {
    maxWidth: 330,
    marginTop: 8,
    color: '#627D98',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  detailsCard: {
    width: '100%',
    marginTop: 24,
    padding: 17,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E9F0',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailLabel: {
    flex: 1,
    paddingRight: 12,
    color: '#627D98',
    fontSize: 12,
    fontWeight: '600',
  },

  detailValue: {
    color: '#102A43',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },

  orderId: {
    color: '#005BAC',
    fontSize: 13,
    fontWeight: '900',
  },

  amountValue: {
    color: '#005BAC',
    fontSize: 16,
    fontWeight: '900',
  },

  divider: {
    height: 1,
    marginVertical: 14,
    backgroundColor: '#E4E9F0',
  },

  addressCard: {
    width: '100%',
    marginTop: 14,
    padding: 17,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E9F0',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },

  addressName: {
    color: '#243B53',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 3,
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

  primaryButton: {
    width: '100%',
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005BAC',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  secondaryButton: {
    width: '100%',
    height: 48,
    marginTop: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#005BAC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  secondaryButtonSpacing: {
    marginTop: 10,
  },

  secondaryButtonText: {
    color: '#005BAC',
    fontSize: 14,
    fontWeight: '800',
  },

  ordersButton: {
    paddingVertical: 12,
    marginTop: 4,
  },

  ordersButtonText: {
    color: '#627D98',
    fontSize: 13,
    fontWeight: '700',
  },
};