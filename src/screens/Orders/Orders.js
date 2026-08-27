import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {exportDocumentPdf} from '../../utils/pdfExport';
import styles from './OrdersStyles';
import Routes from '../../navigation/Routes';

const BACKEND_URL = 'http://192.168.231.143:5000';

export default function Orders({navigation}) {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const ordersByUser = useSelector(
    state => state.orders.ordersByUser,
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  /*
   * Load logged-in user
   */
  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const loadUser = async () => {
      try {
        const savedUser =
          await AsyncStorage.getItem('user');

        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        } else {
          setCurrentUser(null);
          setOrders([]);
        }
      } catch (error) {
        console.log(
          'Error loading user session in Orders:',
          error,
        );
      }
    };

    loadUser();
  }, [isFocused]);

  /*
   * Fetch orders from MongoDB through backend
   */
  useEffect(() => {
    if (!isFocused || currentUser?.id == null) {
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${BACKEND_URL}/api/orders/user/${currentUser.id}`,
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Unable to fetch orders.',
          );
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.log(
          'Error fetching orders from backend:',
          error,
        );

        /*
         * Temporary fallback to Redux.
         *
         * This keeps the existing app working if
         * the backend is temporarily unavailable.
         */
        setOrders(
          ordersByUser[String(currentUser.id)] || [],
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [
    isFocused,
    currentUser,
    ordersByUser,
  ]);

  const selectedOrder =
    orders.find(order => order.id === selectedId) ||
    orders[0];

  const topPadding =
    (Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top) + 12;

  const downloadSelectedOrder = async () => {
    if (!selectedOrder) {
      Alert.alert('No data available to export.');
      return;
    }

    try {
      const file = await exportDocumentPdf(
        selectedOrder,
        'order',
      );

      Alert.alert(
        'Order summary saved',
        `Saved locally to ${file.filePath}`,
      );
    } catch (error) {
      Alert.alert(
        'Download failed',
        'The order summary could not be saved. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom']}>
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
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Image
            source={require('../../assets/icons/back arrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Orders
        </Text>

        <Pressable
          onPress={downloadSelectedOrder}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Download order summary">
          <Image
            source={require('../../assets/icons/direct-download.png')}
            style={styles.downloadIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              Loading Orders...
            </Text>
          </View>
        ) : orders.length ? (
          orders.map(order => (
            <Pressable
              key={order.id}
              onPress={() => {
                setSelectedId(order.id);

                navigation.navigate(
                  Routes.ORDER_DETAILS,
                  {
                    order,
                  },
                );
              }}
              style={[
                styles.orderCard,
                selectedOrder?.id === order.id &&
                  styles.selectedCard,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Select ${order.id}`}>

              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>
                  {order.id}
                </Text>

                <Text style={styles.orderDate}>
                  {new Date(
                    order.placedAt,
                  ).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              <Text style={styles.orderStatus}>
                {order.status}
              </Text>

              <View style={styles.itemsContainer}>
                {order.items.map(item => (
                  <View
                    key={item.id}
                    style={styles.itemRow}>
                    <Text style={styles.itemName}>
                      {item.name}
                    </Text>

                    <Text style={styles.itemQuantity}>
                      ×{item.quantity}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  Total Price
                </Text>

                <Text style={styles.totalPrice}>
                  ₹{order.total}
                </Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={require('../../assets/icons/not-allowed.png')}
              style={styles.emptyIcon}
              resizeMode="contain"
            />

            <Text style={styles.emptyTitle}>
              No Orders Yet
            </Text>

            <Text style={styles.emptyText}>
              Your placed food orders will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}