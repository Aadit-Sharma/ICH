import { StyleSheet } from "react-native";
import {
  Colors,
  Radius,
  Typography,
  Spacing,
} from "../../../theme";
const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },

  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,

    color: Colors.textPrimary,

    ...Typography.body,
  },

  focused: {
    borderColor: Colors.primary,
  },

  error: {
    borderColor: Colors.danger,
  },

  errorText: {
    color: Colors.danger,
    marginTop: Spacing.xs,
    ...Typography.caption,
  },
});

export default styles;