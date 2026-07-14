import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './HeaderStyles';

export default function Header({cartCount = 0, onCartPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.employeeName}>Aadit Sharma</Text>
        <Text style={styles.subtitle}>Indian Coffee House</Text>
      </View>

      <Pressable
        onPress={onCartPress}
        style={styles.cartButton}
        accessibilityRole="button"
        accessibilityLabel="Open cart">
        <Icon name="cart-outline" size={25} color="#005BAC" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      </Pressable>
    </View>
  );
}
