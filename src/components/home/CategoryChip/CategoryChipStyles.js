import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({
  container: {
    height: 40,

    paddingHorizontal: 18,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.white,

    borderWidth: 1,

    borderColor: Colors.border,

    marginRight: 10,
  },

  selected: {
    backgroundColor: Colors.primary,

    borderColor: Colors.primary,
  },

  text: {
    ...Typography.bodySmall,

    color: Colors.textPrimary,

    fontSize: 14,

    fontWeight: "700",

    letterSpacing: 0,
  },

  selectedText: {
    color: Colors.white,
  },
});

export default styles;