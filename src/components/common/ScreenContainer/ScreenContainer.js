import React from "react";
import {
  SafeAreaView,
  StatusBar,
} from "react-native";

import styles from "./ScreenContainerStyles";
import { Colors } from "../../../theme";

const ScreenContainer = ({ children, style }) => {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />

      <SafeAreaView
        style={[styles.container, style]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenContainer;