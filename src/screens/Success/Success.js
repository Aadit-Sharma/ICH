import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import Routes from '../../navigation/Routes';

export default function Success({navigation}) {
  const order = useSelector(state => state.orders.latestOrder);
  const orderedAt = order ? new Date(order.placedAt) : new Date();
  const checkScale = useRef(new Animated.Value(0.7)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(16)).current;

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
  }, [checkOpacity, checkScale, contentOpacity, contentTranslate]);

  const goHome = () => navigation.reset({index: 0, routes: [{name: Routes.HOME}]});

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Confirmation</Text>
      </View>

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.checkCircle,
            {opacity: checkOpacity, transform: [{scale: checkScale}]},
          ]}>
          <Text style={styles.checkmark}>✓</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: contentOpacity,
              transform: [{translateY: contentTranslate}],
            },
          ]}>
          <Text style={styles.title}>Order Placed Successfully!</Text>
          <Text style={styles.message}>
            Your order has been placed successfully and is being prepared.
          </Text>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order ID</Text>
              <Text style={styles.orderId}>{order?.id || 'Order confirmed'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated preparation</Text>
              <Text style={styles.detailValue}>15–20 mins</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order placed</Text>
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

          <Pressable onPress={goHome} style={styles.primaryButton} accessibilityRole="button">
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.reset({index: 0, routes: [{name: Routes.HOME, params: {screen: 'Orders'}}]})}
            style={styles.secondaryButton}
            accessibilityRole="button">
            <Text style={styles.secondaryButtonText}>View My Orders</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#005BAC'},
  header: {height: 64, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: '#005BAC'},
  headerTitle: {color: '#FFFFFF', fontSize: 19, fontWeight: '800', textAlign: 'center'},
  container: {flex: 1, alignItems: 'center', paddingHorizontal: 22, paddingTop: 44, backgroundColor: '#F5F7FA'},
  checkCircle: {width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: '#24A148', shadowColor: '#155724', shadowOffset: {width: 0, height: 7}, shadowOpacity: 0.2, shadowRadius: 12, elevation: 7},
  checkmark: {color: '#FFFFFF', fontSize: 52, fontWeight: '700', lineHeight: 58},
  content: {width: '100%', alignItems: 'center'},
  title: {marginTop: 22, color: '#102A43', fontSize: 23, fontWeight: '900', textAlign: 'center'},
  message: {maxWidth: 330, marginTop: 10, color: '#627D98', fontSize: 14, lineHeight: 21, textAlign: 'center'},
  detailsCard: {width: '100%', marginTop: 28, padding: 17, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E9F0', shadowColor: '#102A43', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4},
  detailRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  detailLabel: {flex: 1, paddingRight: 12, color: '#627D98', fontSize: 12, fontWeight: '600'},
  detailValue: {color: '#102A43', fontSize: 12, fontWeight: '800', textAlign: 'right'},
  orderId: {color: '#005BAC', fontSize: 13, fontWeight: '900'},
  divider: {height: 1, marginVertical: 14, backgroundColor: '#E4E9F0'},
  primaryButton: {width: '100%', height: 50, marginTop: 26, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#005BAC', shadowColor: '#102A43', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4},
  primaryButtonText: {color: '#FFFFFF', fontSize: 14, fontWeight: '900'},
  secondaryButton: {width: '100%', height: 48, marginTop: 10, borderRadius: 24, borderWidth: 1.5, borderColor: '#005BAC', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF'},
  secondaryButtonText: {color: '#005BAC', fontSize: 14, fontWeight: '800'},
});
