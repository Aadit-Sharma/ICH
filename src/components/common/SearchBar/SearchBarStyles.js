import { StyleSheet } from "react-native";

import {
  Colors,
  Shadows,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({
  container: {
    height: 54,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: 16,

    paddingHorizontal: 18,

    marginBottom: 0,

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
