import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, ScrollView, Text, View} from 'react-native';

import CategoryChip from '../components/CategoryChip';
import FoodCard from '../components/FoodCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {
  categories,
  popularItems,
  todaysSpecial,
} from '../data/foodData';
import Routes from '../navigation/Routes';
import styles from './HomeStyles';

export default function Home({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 550,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleFoodPress = item => {
    navigation.navigate(Routes.FOOD_DETAILS, {food: item});
  };

  const handleCartPress = () => {
    navigation.navigate(Routes.CART);
  };

  const renderCategory = ({item}) => <CategoryChip title={item} />;

  const renderFoodCard = ({item}) => (
    <FoodCard item={item} onPress={handleFoodPress} />
  );

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Header cartCount={0} onCartPress={handleCartPress} />

        <SearchBar value={searchText} onChangeText={setSearchText} />

        <FlatList
          data={categories}
          keyExtractor={item => item}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Special</Text>
          <FlatList
            data={todaysSpecial}
            keyExtractor={item => item.id}
            renderItem={renderFoodCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <FlatList
            data={popularItems}
            keyExtractor={item => item.id}
            renderItem={renderFoodCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodList}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
}
