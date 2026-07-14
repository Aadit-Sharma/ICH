import React from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './SearchBarStyles';

export default function SearchBar({value, onChangeText}) {
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={21} color="#8A98A8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search food..."
        placeholderTextColor="#8A98A8"
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}
