import { StyleSheet } from "react-native";

import {
  Colors,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginVertical: Spacing.md,
  },

  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  action: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },

});

export default styles;