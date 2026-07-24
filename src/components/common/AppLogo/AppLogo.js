import React from "react";

import {
  View,
  Text,
} from "react-native";

import styles from "./AppLogoStyles";

const AppLogo = () => {

  return (

    <View style={styles.container}>

      <Text style={styles.icon}>
        ☕
      </Text>

      <Text style={styles.title}>
        Indian Coffee House
      </Text>

      <Text style={styles.subtitle}>
        Employee Ordering App
      </Text>

    </View>

  );

};

export default AppLogo;
