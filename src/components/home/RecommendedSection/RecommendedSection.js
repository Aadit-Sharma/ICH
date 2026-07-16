import React from "react";
import { View, FlatList } from "react-native";

import styles from "./RecommendedSectionStyles";
import FoodCard from "../FoodCard/FoodCard";

const FOOD_DATA = [
  {
    id: "1",
    name: "Veg Burger",
    description: "Fresh veggie burger with fries",
    price: 120,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  {
    id: "2",
    name: "Masala Dosa",
    description: "South Indian crispy dosa",
    price: 90,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500",
  },
  {
    id: "3",
    name: "Cold Coffee",
    description: "Creamy chilled coffee",
    price: 80,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
  {
    id: "4",
    name: "Paneer Roll",
    description: "Stuffed paneer wrap",
    price: 110,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
  },
];

const RecommendedSection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={FOOD_DATA}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() =>
              navigation.navigate("FoodDetails", {
                food: item,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default RecommendedSection;