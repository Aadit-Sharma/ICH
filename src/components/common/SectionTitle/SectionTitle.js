import React from "react";
import {
  View,
  Text,
  Pressable,
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
        <Pressable onPress={onPress}>
          <Text style={styles.action}>
            {actionText}
          </Text>
        </Pressable>
      ) : null}

    </View>

  );
};

export default SectionTitle;