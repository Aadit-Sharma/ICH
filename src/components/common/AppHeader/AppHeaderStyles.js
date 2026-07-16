import { StyleSheet } from "react-native";

import {
  Colors,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.primary,

    paddingHorizontal: Spacing.lg,

    paddingTop: Spacing.xl,

    paddingBottom: Spacing.lg,

    borderBottomLeftRadius: 24,

    borderBottomRightRadius: 24,
  },

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  greeting: {

    ...Typography.body,

    color: Colors.white,
  },

  username: {

    ...Typography.h2,

    color: Colors.white,

    marginTop: Spacing.xs,
  },

  iconContainer: {

    width: 46,

    height: 46,

    borderRadius: 23,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.20)",
  },

  icon: {

    fontSize: 22,
  },

});

export default styles;