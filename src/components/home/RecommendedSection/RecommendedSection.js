import React from "react";
import { FlatList } from "react-native";

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

  const renderItem = ({ item }) => (
    <FoodCard
      item={item}
      onPress={() => onFoodPress(item)}
      onAdd={() => onAdd(item)}
    />
  );

  return (
    <FlatList
      data={filteredItems}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RecommendedSection;