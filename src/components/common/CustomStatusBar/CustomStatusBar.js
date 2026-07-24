import React from "react";

import { StatusBar } from "react-native";
import { Colors } from "../../../theme";

const CustomStatusBar = ({

  backgroundColor = Colors.primary,

  barStyle = "light-content",

}) => {

  return (

    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
    />

  );

};

export default CustomStatusBar;
