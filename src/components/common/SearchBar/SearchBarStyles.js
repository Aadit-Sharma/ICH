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

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    paddingHorizontal: Spacing.md,

    marginVertical: Spacing.md,

    ...Shadows.small,
  },

  icon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },

  input: {

    flex: 1,

    ...Typography.body,

    color: Colors.textPrimary,

    paddingVertical: Spacing.md,
  },

  clearButton: {

    paddingLeft: Spacing.sm,
  },

  clearText: {

    fontSize: 18,

    color: Colors.textSecondary,
  },

});

export default styles;
