import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: Spacing.xl,
  },

  icon: {
    fontSize: 60,
  },

  title: {
    ...Typography.h3,

    color: Colors.textPrimary,

    marginTop: Spacing.md,
  },

  subtitle: {
    ...Typography.body,

    color: Colors.textSecondary,

    marginTop: Spacing.sm,

    textAlign: "center",
  },

});

export default styles;
