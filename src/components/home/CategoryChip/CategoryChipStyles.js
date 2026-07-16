import {StyleSheet} from "react-native";

import {

Colors,

Radius,

Spacing,

Typography

} from "../../../theme";

const styles=StyleSheet.create({

container:{

paddingVertical:Spacing.sm,

paddingHorizontal:Spacing.md,

borderRadius:Radius.round,

backgroundColor:Colors.white,

borderWidth:1,

borderColor:Colors.border,

marginRight:Spacing.sm,

},

selected:{

backgroundColor:Colors.primary,

borderColor:Colors.primary,

},

text:{

...Typography.bodySmall,

color:Colors.textPrimary,

},

selectedText:{

color:Colors.white,

}

});

export default styles;