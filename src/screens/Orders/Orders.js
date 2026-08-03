import React, {useEffect, useState} from 'react';
import {Alert, Image, Platform, Pressable, ScrollView, StatusBar, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {exportDocumentPdf} from '../../utils/pdfExport';
import styles from './OrdersStyles';

export default function Orders({navigation}) {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const ordersByUser = useSelector(state => state.orders.ordersByUser);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isFocused) {
      const loadUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem('user');
          if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
          } else {
            setCurrentUser(null);
          }
        } catch (error) {
          console.log('Error loading user session in Orders:', error);
        }
      };
      loadUser();
    }
  }, [isFocused]);

  const orders = currentUser?.id == null
    ? []
    : ordersByUser[String(currentUser.id)] || [];

  const [selectedId, setSelectedId] = useState(null);
  const selectedOrder = orders.find(order => order.id === selectedId) || orders[0];
  const topPadding = (Platform.OS === 'android' ? StatusBar.currentHeight || insets.top : insets.top) + 12;

  const downloadSelectedOrder = async () => {
    if (!selectedOrder) {
      Alert.alert('No data available to export.');
      return;
    }
    try {
      const file = await exportDocumentPdf(selectedOrder, 'order');
      Alert.alert('Order summary saved', `Saved locally to ${file.filePath}`);
    } catch (error) {
      Alert.alert('Download failed', 'The order summary could not be saved. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={[styles.header, {height: Math.max(92, topPadding + 56), paddingTop: topPadding}]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton} accessibilityRole="button" accessibilityLabel="Go back">
          <Image source={require('../../assets/icons/back arrow.png')} style={styles.backIcon} resizeMode="contain" />
        </Pressable>
        <Text style={styles.headerTitle}>Orders</Text>
        <Pressable onPress={downloadSelectedOrder} style={styles.downloadButton} accessibilityRole="button" accessibilityLabel="Download selected order summary">
          <Image source={require('../../assets/icons/direct-download.png')} style={styles.downloadIcon} resizeMode="contain" />
        </Pressable>
      </View>
      {orders.length ? (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {orders.map(order => (
            <Pressable key={order.id} onPress={() => setSelectedId(order.id)} style={[styles.orderCard, selectedOrder?.id === order.id && styles.selectedCard]} accessibilityRole="button" accessibilityLabel={`Select ${order.id}`}>
              <View style={styles.cardHeader}><View><Text style={styles.orderId}>{order.id}</Text><Text style={styles.date}>{new Date(order.placedAt).toLocaleString('en-IN', {day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})}</Text></View><View style={styles.statusBadge}><Text style={styles.statusText}>{order.status}</Text></View></View>
              <View style={styles.divider} />
              {order.items.map(item => <View key={item.id} style={styles.itemRow}><Text style={styles.itemName} numberOfLines={1}>{item.name}</Text><Text style={styles.itemQuantity}>x{item.quantity}</Text></View>)}
              <View style={styles.totalRow}><Text style={styles.totalLabel}>Total Price</Text><Text style={styles.totalValue}>₹{order.total}</Text></View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.container}><View style={styles.emptyState}><Image source={require('../../assets/icons/not-allowed.png')} style={styles.emptyIcon} resizeMode="contain" /><Text style={styles.title}>No Orders Yet</Text><Text style={styles.subtitle}>Your placed food orders will appear here.</Text></View></View>
      )}
    </SafeAreaView>
  );
}
