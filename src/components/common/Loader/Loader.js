import React from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import styles from "./LoaderStyles";

import { Colors } from "../../../theme";

const Loader = ({
  size = "large",
  color = Colors.primary,
}) => {

  return (

    <View style={styles.container}>

      <ActivityIndicator
        size={size}
        color={color}
      />

    </View>

  );
};

export default Loader;