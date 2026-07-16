import React from "react";

import {
  View,
  Text,
  Pressable,
} from "react-native";

import styles from "./AppHeaderStyles";

const AppHeader = ({

  greeting = "Good Morning",

  username = "Employee",

  rightIcon = "🔔",

  onRightPress,

}) => {

  return (

    <View style={styles.container}>

      <View style={styles.row}>

        <View>

          <Text style={styles.greeting}>
            {greeting}
          </Text>

          <Text style={styles.username}>
            {username}
          </Text>

        </View>

        <Pressable
          onPress={onRightPress}
          style={styles.iconContainer}
        >

          <Text style={styles.icon}>
            {rightIcon}
          </Text>

        </Pressable>

      </View>

    </View>

  );

};

export default AppHeader;