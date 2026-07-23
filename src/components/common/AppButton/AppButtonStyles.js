import { StyleSheet } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../../../theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    ...Typography.button,
    color: Colors.white,
  },

  disabled: {
    backgroundColor: Colors.textLight,
  },
});

export default styles;