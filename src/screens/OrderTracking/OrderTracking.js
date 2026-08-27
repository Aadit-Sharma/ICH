import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {useSelector} from 'react-redux';
const STEPS = [
  {
    key: 'Placed',
    title: 'Order Placed',
    description: 'Your order has been received.',
  },
  {
    key: 'Preparing',
    title: 'Preparing',
    description: 'The kitchen is preparing your order.',
  },
  {
    key: 'Ready',
    title: 'Ready for Pickup',
    description: 'Your order is ready.',
  },
  {
    key: 'Delivered',
    title: 'Delivered',
    description: 'Order delivered successfully.',
  },
];

const getStepIndex = status => {
  const index = STEPS.findIndex(
    step => step.key === status,
  );

  return index === -1 ? 1 : index;
};

export default function OrderTracking({
  navigation,
  route,
}) {
  const passedOrder = route.params?.order;
  const insets = useSafeAreaInsets();

  const topPadding =
    (Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top) + 12;

const ordersByUser = useSelector(
  state => state.orders.ordersByUser,
);

const order = passedOrder
  ? ordersByUser[String(passedOrder.userId)]?.find(
      item => item.id === passedOrder.id,
    ) || passedOrder
  : null;
  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
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
            Track Order
          </Text>

          <View style={styles.headerSpacer} />

        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Order not found
          </Text>

          <Text style={styles.emptyText}>
            Tracking information is unavailable.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentStep = getStepIndex(order.status);

  const orderedAt = new Date(order.placedAt);

  return (
    <SafeAreaView
    style={styles.safeArea}
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
          Track Order
        </Text>

        <View style={styles.headerSpacer} />

      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ORDER SUMMARY */}

        <View style={styles.orderCard}>
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

        {/* CURRENT STATUS */}

        <View style={styles.currentStatusCard}>
          <Text style={styles.currentStatusLabel}>
            Current Status
          </Text>

          <Text style={styles.currentStatus}>
            {order.status === 'Ready'
              ? 'Ready for Pickup'
              : order.status}
          </Text>

          <Text style={styles.currentStatusDescription}>
            {
              STEPS[currentStep]?.description
            }
          </Text>

          {order.status === 'Preparing' && (
            <Text style={styles.estimatedTime}>
              Estimated preparation time: 15–20 mins
            </Text>
          )}
        </View>

        {/* TRACKING TIMELINE */}

        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>
            Order Progress
          </Text>

          {STEPS.map((step, index) => {
            const completed =
              index < currentStep;

            const active =
              index === currentStep;

            const isLast =
              index === STEPS.length - 1;

            return (
              <View
                key={step.key}
                style={styles.stepRow}>

                <View style={styles.timelineColumn}>
                  <View
                    style={[
                      styles.stepCircle,
                      (completed || active) &&
                        styles.completedCircle,
                      active &&
                        styles.activeCircle,
                    ]}>
                    <Text
                      style={[
                        styles.stepCircleText,
                        (completed || active) &&
                          styles.completedCircleText,
                      ]}>
                      {completed || active
                        ? '✓'
                        : ''}
                    </Text>
                  </View>

                  {!isLast && (
                    <View
                      style={[
                        styles.verticalLine,
                        completed &&
                          styles.completedLine,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      (completed || active) &&
                        styles.activeStepTitle,
                    ]}>
                    {step.title}
                  </Text>

                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>

                  {active && (
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>
                        Current
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* ORDER TOTAL */}

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>
            Order Total
          </Text>

          <Text style={styles.totalValue}>
            ₹{order.total}
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backToDetailsButton}>
          <Text style={styles.backToDetailsText}>
            Back to Order Details
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
    padding: 16,
    paddingBottom: 32,
  },

  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  currentStatusCard: {
    backgroundColor: '#005BAC',
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },

  currentStatusLabel: {
    color: '#D9ECFF',
    fontSize: 12,
    fontWeight: '700',
  },

  currentStatus: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
  },

  currentStatusDescription: {
    color: '#E7F3FF',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },

  estimatedTime: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
  },

  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4E9F0',
    marginBottom: 14,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 18,
  },

  stepRow: {
    flexDirection: 'row',
    minHeight: 82,
  },

  timelineColumn: {
    width: 36,
    alignItems: 'center',
  },

  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  completedCircle: {
    backgroundColor: '#24A148',
    borderColor: '#24A148',
  },

  activeCircle: {
    borderWidth: 3,
    borderColor: '#005BAC',
  },

  stepCircleText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '900',
  },

  completedCircleText: {
    color: '#FFFFFF',
  },

  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },

  completedLine: {
    backgroundColor: '#24A148',
  },

  stepContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 15,
  },

  stepTitle: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
  },

  activeStepTitle: {
    color: '#102A43',
    fontWeight: '900',
  },

  stepDescription: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },

  activeBadge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#EAF4FF',
  },

  activeBadgeText: {
    color: '#005BAC',
    fontSize: 10,
    fontWeight: '800',
  },

  totalCard: {
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

  totalLabel: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '700',
  },

  totalValue: {
    color: '#005BAC',
    fontSize: 19,
    fontWeight: '900',
  },

  backToDetailsButton: {
    borderWidth: 1.5,
    borderColor: '#005BAC',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  backToDetailsText: {
    color: '#005BAC',
    fontSize: 14,
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