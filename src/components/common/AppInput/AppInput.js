import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
} from "react-native";

import styles from "./AppInputStyles";

const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error = "",
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style,
}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>

      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          isFocused && styles.focused,
          error && styles.error,
          style,
        ]}
        placeholder={placeholder}
        value={value}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

    </View>
  );
};

export default AppInput;