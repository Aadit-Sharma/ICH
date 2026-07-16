import React from "react";

import {
  View,
  Text,
} from "react-native";

import styles from "./EmptyStateStyles";

const EmptyState = ({
  title = "Nothing Here",
  subtitle = "No data available.",
}) => {

  return (

    <View style={styles.container}>

      <Text style={{fontSize:60}}>
        📦
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

    </View>

  );

};

export default EmptyState;