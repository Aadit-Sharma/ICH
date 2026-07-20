import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
} from "react-native";

import styles from "./SearchBarStyles";
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search food...",
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="search"
        size={20}
        color="#8A94A6"
        style={styles.icon}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8A98A8"
        returnKeyType="search"
      />

      {value ? (
        <Pressable
          style={styles.clearButton}
          onPress={onClear}
        >
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default SearchBar;