import { StyleSheet } from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from "../../../theme";

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.primary,
    borderRadius:Radius.lg,
    padding:Spacing.lg,
    marginVertical:Spacing.md,
    ...Shadows.medium

  },

  title:{
    ...Typography.h2,
    color:Colors.white,

  },

  subtitle:{

    ...Typography.body,

    color:Colors.white,

    marginTop:Spacing.sm,

  },

  button:{

    backgroundColor:Colors.secondary,

    alignSelf:"flex-start",

    marginTop:Spacing.md,

    paddingHorizontal:Spacing.md,

    paddingVertical:Spacing.sm,

    borderRadius:Radius.md,

  },

  buttonText:{
    color:Colors.white,
    ...Typography.button,
  }
});
export default styles;