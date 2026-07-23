import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
} from "react-native";

import styles from "./SearchBarStyles";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search food...",
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/icons/search.png")}
        style={styles.icon}
        resizeMode="contain"
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
