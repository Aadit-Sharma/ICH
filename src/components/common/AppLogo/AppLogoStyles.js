import { StyleSheet } from "react-native";

import {
  Colors,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: Spacing.sm,
  },

  icon: {
    fontSize: 70,
  },

  title: {
    ...Typography.h2,
    color: Colors.primary,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

});

export default styles;
