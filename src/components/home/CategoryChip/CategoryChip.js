import React from "react";

import {

Pressable,

Text

} from "react-native";

import styles from "./CategoryChipStyles";

const CategoryChip=({

title,

selected,

onPress

})=>{

return(

<Pressable

onPress={onPress}

style={[

styles.container,

selected && styles.selected

]}

>

<Text

style={[

styles.text,

selected && styles.selectedText

]}

>

{title}

</Text>

</Pressable>

);

};

export default CategoryChip;