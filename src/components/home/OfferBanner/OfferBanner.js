import React from "react";

import {
View,
Text,
Pressable
} from "react-native";

import styles from "./OfferBannerStyles";

const OfferBanner = ({onOrderNow}) => {

return(

<View style={styles.container}>

<Text style={styles.title}>
Today's Special
</Text>

<Text style={styles.subtitle}>
20% OFF on Lunch Combo
</Text>
<Pressable
  style={styles.button}
  onPress={() => {
    console.log("Order Now Pressed");
    onOrderNow && onOrderNow();
  }}>

<Text style={styles.buttonText}>
Order Now
</Text>

</Pressable>

</View>

);

};

export default OfferBanner;