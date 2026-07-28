import { StyleSheet } from "react-native";

import {
  Colors,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({
  container: {
    height: 155,

    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    paddingHorizontal: Spacing.xl,
    paddingVertical: 0,

    marginTop: 0,
    marginBottom: 0,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 10,
  },

  row: {
    flex: 1,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  copy: {
    flex: 1,

    paddingRight: Spacing.lg,
  },

  greeting: {
    ...Typography.body,

    color: "#DCEBFA",
  },

  username: {
    ...Typography.h2,

    color: Colors.white,

    marginTop: Spacing.xs,

    fontSize: 28,

    fontWeight: "800",
  },

  subtitle: {
    color: "#F9D78A",

    marginTop: Spacing.sm,

    fontSize: 14,

    fontWeight: "700",
  },

  cartButton: {
    width: 56,

    height: 56,

    borderRadius: 28,

    backgroundColor: "transparent",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#003A70",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.12,

    shadowRadius: 18,

    elevation: 8,
  },

  cartIcon: {
    width: 25,
    height: 25,
    tintColor: Colors.white,
  },

  cartBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",

    top: -4,

    right: -4,

    minWidth: 20,

    height: 20,

    borderRadius: 10,

    backgroundColor: "#D64545",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 5,
  },

  badgeText: {
    color: Colors.white,

    fontSize: 11,

    fontWeight: "800",
  },

  iconContainer: {
    width: 56,

    height: 56,

    borderRadius: 28,

    backgroundColor: "rgba(255,255,255,0.20)",

    justifyContent: "center",

    alignItems: "center",
  },

  icon: {
    fontSize: 24,

    color: Colors.white,
  },
});

export default styles;
