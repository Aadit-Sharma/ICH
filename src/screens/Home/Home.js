
import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './HomeStyles';

import {
  ScreenContainer,
  AppHeader,
  SearchBar,
  SectionTitle,
} from '../../components/common';

import {
  OfferBanner,
  RecommendedSection,
} from '../../components/home';

import Routes from '../../navigation/Routes';
import CategoryCard from '../../components/CategoryCard';
import categories from '../../data/categories';

const HOME_CATEGORY_NAMES = ['Breakfast', 'Lunch', 'Snacks', 'Beverages', 'Desserts'];

export default function Home({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cartCount = useSelector(state => state.cart.totalItems);

  // Screen fade animation
  const screenOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(screenOpacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [screenOpacity]);

  const handleCartPress = () => {
    navigation.navigate(Routes.CART);
  };

  const handleFoodPress = food => {
    navigation.navigate(Routes.FOOD_DETAILS, {
      food,
    });
  };

  const hour = new Date().getHours();
  const greeting = hour >= 5 && hour < 12
    ? 'Good Morning'
    : hour >= 12 && hour < 17
      ? 'Good Afternoon'
      : hour >= 17 && hour < 21
        ? 'Good Evening'
        : 'Good Night';
  const homeCategories = categories.filter(category =>
    HOME_CATEGORY_NAMES.includes(category.name),
  );

  const handleCategoryPress = category => {
    setSelectedCategory(category.name);
    navigation.navigate(Routes.MENU, {category});
  };

  return (
    <Animated.View
      style={[styles.mainContainer, {opacity: screenOpacity}]}>
      <ScreenContainer>
        <AppHeader
          greeting={greeting}
          username="Anushi"
          subtitle="Indian Coffee House"
          cartCount={cartCount}
          onCartPress={handleCartPress}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.searchSection}>
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              onClear={() => setSearchText('')}
              placeholder="Search food..."
            />
          </View>

          <View style={styles.offerSection}>
            <OfferBanner />
          </View>

          <View style={styles.categoriesSection}>
            <SectionTitle
              title="Categories"
              actionText="View All"
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              data={homeCategories}
              keyExtractor={category => String(category.id)}
              renderItem={({item}) => (
                <CategoryCard
                  category={item}
                  selected={item.name === selectedCategory}
                  containerStyle={styles.categoryCardSpacing}
                  onPress={handleCategoryPress}
                />
              )}
            />
          </View>

          <View style={styles.recommendedSection}>
            <SectionTitle
              title="Recommended For You"
              actionText="See More"
            />
            <RecommendedSection
              navigation={navigation}
              searchText={searchText}
              onFoodPress={handleFoodPress}
              onAdd={() => {}}
            />
          </View>
        </ScrollView>
      </ScreenContainer>
    </Animated.View>
  );
}
