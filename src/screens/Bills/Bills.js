import React, {useState} from 'react';
import {Alert, Image, Platform, Pressable, ScrollView, StatusBar, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {exportDocumentPdf} from '../../utils/pdfExport';
import styles from './BillsStyles';

export default function Bills({navigation}) {
  const insets = useSafeAreaInsets();
  const bills = useSelector(state => state.bills.bills);
  const [selectedId, setSelectedId] = useState(null);
  const selectedBill = bills.find(bill => bill.id === selectedId) || bills[0];
  const topPadding = (Platform.OS === 'android' ? StatusBar.currentHeight || insets.top : insets.top) + 12;

  const downloadSelectedBill = async () => {
    if (!selectedBill) {
      Alert.alert('No data available to export.');
      return;
    }
    try {
      const file = await exportDocumentPdf(selectedBill, 'bill');
      Alert.alert('Invoice saved', `Saved locally to ${file.filePath}`);
    } catch (error) {
      Alert.alert('Download failed', 'The invoice could not be saved. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={[styles.header, {height: Math.max(92, topPadding + 56), paddingTop: topPadding}]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton} accessibilityRole="button" accessibilityLabel="Go back"><Image source={require('../../assets/icons/back arrow.png')} style={styles.backIcon} resizeMode="contain" /></Pressable>
        <Text style={styles.headerTitle}>Bills</Text>
        <Pressable onPress={downloadSelectedBill} style={styles.downloadButton} accessibilityRole="button" accessibilityLabel="Download selected invoice"><Image source={require('../../assets/icons/direct-download.png')} style={styles.downloadIcon} resizeMode="contain" /></Pressable>
      </View>
      {bills.length ? (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {bills.map(bill => (
            <Pressable key={bill.id} onPress={() => setSelectedId(bill.id)} style={[styles.billCard, selectedBill?.id === bill.id && styles.selectedCard]} accessibilityRole="button" accessibilityLabel={`Select ${bill.id}`}>
              <View style={styles.cardHeader}><View><Text style={styles.billId}>{bill.id}</Text><Text style={styles.orderId}>Order {bill.orderId}</Text></View><Text style={styles.date}>{new Date(bill.placedAt).toLocaleString('en-IN', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</Text></View>
              <View style={styles.divider} />
              {bill.items.map(item => <View key={item.id} style={styles.itemRow}><Text style={styles.itemName} numberOfLines={1}>{item.name}</Text><Text style={styles.itemQuantity}>x{item.quantity}</Text></View>)}
              <View style={styles.totalRow}><View><Text style={styles.totalLabel}>Total Amount</Text><Text style={styles.paymentStatus}>{bill.paymentStatus}</Text></View><Text style={styles.totalValue}>₹{bill.total}</Text></View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.container}><View style={styles.emptyState}><Image source={require('../../assets/icons/bill.png')} style={styles.emptyIcon} resizeMode="contain" /><Text style={styles.title}>No Bills Available</Text><Text style={styles.subtitle}>Your food order bills will appear here.</Text></View></View>
      )}
    </SafeAreaView>
  );
}
