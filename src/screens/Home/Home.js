
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

  const screenOpacity = useRef(new Animated.Value(0)).current;
  const searchTranslateY = useRef(new Animated.Value(-18)).current;
  const bannerOpacity = useRef(new Animated.Value(0)).current;
  const categoryAnimations = useRef(
    HOME_CATEGORY_NAMES.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(searchTranslateY, {
        toValue: 0,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(bannerOpacity, {
        toValue: 1,
        duration: 420,
        delay: 120,
        useNativeDriver: true,
      }),
      Animated.stagger(
        75,
        categoryAnimations.map(animation =>
          Animated.spring(animation, {
            toValue: 1,
            friction: 7,
            tension: 75,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  }, [bannerOpacity, categoryAnimations, screenOpacity, searchTranslateY]);

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
      <ScreenContainer style={styles.safeAreaContainer}>
        <AppHeader
          greeting={greeting}
          username="Anushi"
          subtitle="Indian Coffee House"
          cartCount={cartCount}
          onCartPress={handleCartPress}
        />

        <Animated.View
          style={[
            styles.searchSection,
            {transform: [{translateY: searchTranslateY}]},
          ]}>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            onClear={() => setSearchText('')}
            placeholder="Search food, beverages..."
          />
        </Animated.View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Animated.View style={[styles.offerSection, {opacity: bannerOpacity}]}>
            <OfferBanner />
          </Animated.View>

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
              renderItem={({item, index}) => {
                const categoryAnimation = categoryAnimations[index];

                return (
                  <Animated.View
                  style={[
                    styles.categoryAnimation,
                    {
                      opacity: categoryAnimation,
                      transform: [
                        {
                          translateY: categoryAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [18, 0],
                          }),
                        },
                        {
                          scale: categoryAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.94, 1],
                          }),
                        },
                      ],
                    },
                  ]}>
                  <CategoryCard
                    category={item}
                    selected={item.name === selectedCategory}
                    containerStyle={styles.categoryCardSpacing}
                    onPress={handleCategoryPress}
                  />
                  </Animated.View>
                );
              }}
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
