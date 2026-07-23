import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({
  container: {
    height: 58,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: 29,

    paddingHorizontal: 18,

    marginBottom: Spacing.lg,

    ...Shadows.small,
  },

  icon: {
    width: 21,

    height: 21,

    opacity: 0.58,

    marginRight: 10,
  },

  input: {
    flex: 1,

    ...Typography.body,

    color: Colors.textPrimary,

    fontSize: 16,

    paddingVertical: Spacing.md,

    letterSpacing: 0,
  },

  clearButton: {
    paddingLeft: Spacing.sm,
  },

  clearText: {
    fontSize: 18,

    color: Colors.textSecondary,

    fontWeight: "700",
  },
});

export default styles;