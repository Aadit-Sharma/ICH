import React from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
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

      <Text style={styles.icon}>
        🔍
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />

      {value ? (
        <Pressable
          onPress={onClear}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>
            ✕
          </Text>
        </Pressable>
      ) : null}

    </View>

  );
};

export default SearchBar;