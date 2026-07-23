import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";

import styles from "./AppButtonStyles";
import { Colors } from "../../../theme";

const AppButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

export default AppButton;