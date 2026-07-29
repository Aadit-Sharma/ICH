import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "./SectionTitleStyles";

const SectionTitle = ({
  title,
  actionText,
  onPress,
}) => {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

      {actionText ? (
        <TouchableOpacity onPress={onPress} accessibilityRole="button" accessibilityLabel={actionText}>
          <Text style={styles.action}>
            {actionText}
          </Text>
        </TouchableOpacity>
      ) : null}

    </View>

  );
};

export default SectionTitle;
