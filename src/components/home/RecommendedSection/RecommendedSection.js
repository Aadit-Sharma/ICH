import React from "react";
import { View } from "react-native";

import FoodCard from "../FoodCard/FoodCard";
import { popularItems } from "../../../data/foodData";
import styles from "./RecommendedSectionStyles";

const RecommendedSection = ({
  searchText = "",
  onFoodPress,
  onAdd,
}) => {

  const filteredItems = popularItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.list}>
      {filteredItems.map(item => (
        <FoodCard
          key={item.id}
          item={item}
          onPress={() => onFoodPress(item)}
          onAdd={() => onAdd(item)}
        />
      ))}
    </View>
  );
};

export default RecommendedSection;
