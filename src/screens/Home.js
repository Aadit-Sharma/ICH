/*
-----------------------------------------
File: Home.js

Purpose:
Shows the main cafeteria home screen after login.

Concepts Used:
- React component
- Hooks: useEffect, useRef, useState
- React Native Animated API
- FlatList
- ScrollView
- Reusable components
- Local cart count state
- React Navigation

Flow:
Login -> Home -> FoodDetails / Cart
-----------------------------------------
*/

// React + Hooks
// useEffect starts Home entry animations.
// useRef stores Animated.Value objects.
// useState stores search text.
import React, {useEffect, useRef, useState} from 'react';

// React Native components
// Animated enables fade/stagger animations.
// FlatList renders scrolling category columns.
// ScrollView allows the whole page to scroll vertically.
// Text displays labels.
// View groups layout sections.
import {Animated, FlatList, ScrollView, Text, View} from 'react-native';

// Reusable component
// CategoryCard displays one category tile.
import CategoryCard from '../components/CategoryCard';

// Reusable component
// FoodCard displays one food item.
import FoodCard from '../components/FoodCard';

// Reusable component
// Header displays greeting and cart button.
import Header from '../components/Header';

// Reusable component
// SearchBar displays the search input.
import SearchBar from '../components/SearchBar';

// Data import
// categories is an array of category objects with name and icon.
import categories from '../data/categories';

// Data import
// popularItems is an array of food objects used in the food grid.
import {popularItems} from '../data/foodData';

// Navigation constants
// Routes.FOOD_DETAILS and Routes.CART are used for navigation.
import Routes from '../navigation/Routes';

// StyleSheet object for Home.
import styles from './HomeStyles';

// JavaScript constant
// This tells Home to arrange categories into 2 rows.
const CATEGORY_ROWS = 2;

// React component
// navigation is provided by React Navigation.
// Home returns the main screen UI.
export default function Home({navigation}) {
  // Animated API
  // screenOpacity fades the full Home screen in.
  const screenOpacity = useRef(new Animated.Value(0)).current;
  // Animated API
  // headerOpacity fades the header in.
  const headerOpacity = useRef(new Animated.Value(0)).current;
  // Animated API
  // searchOpacity fades the search bar in.
  const searchOpacity = useRef(new Animated.Value(0)).current;
  // Animated API
  // searchTranslateY moves the search bar upward into place.
  const searchTranslateY = useRef(new Animated.Value(16)).current;
  // Animated API
  // categoriesOpacity fades category cards in.
  const categoriesOpacity = useRef(new Animated.Value(0)).current;
  // Animated API + Array.map
  // Creates one Animated.Value for each food card.
  const popularCardAnims = useRef(
    popularItems.map(() => new Animated.Value(0)),
  ).current;
  // React State
  // Stores search input value.
  const [searchText, setSearchText] = useState('');

  // React Hook
  // Starts Home animations after first render.
  useEffect(() => {
    // JavaScript map + Animated API
    // Converts every animation value into a timing animation.
    const cardAnimations = popularCardAnims.map(animation =>
      Animated.timing(animation, {
        toValue: 1,
        duration: 360,
        useNativeDriver: true,
      }),
    );

    // Animated API
    // Runs full-screen fade and staged child animations together.
    Animated.parallel([
      // Fade in entire Home screen.
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      // Runs header, search, categories, and cards in order.
      Animated.sequence([
        // Header fade-in.
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
        // Search bar fades and slides up together.
        Animated.parallel([
          Animated.timing(searchOpacity, {
            toValue: 1,
            duration: 260,
            useNativeDriver: true,
          }),
          Animated.timing(searchTranslateY, {
            toValue: 0,
            duration: 260,
            useNativeDriver: true,
          }),
        ]),
        // Category section fade-in.
        Animated.timing(categoriesOpacity, {
          toValue: 1,
          duration: 240,
          useNativeDriver: true,
        }),
        // Stagger starts food card animations one after another.
        Animated.stagger(120, cardAnimations),
      ]),
    ]).start();
  }, [
    categoriesOpacity,
    headerOpacity,
    popularCardAnims,
    screenOpacity,
    searchOpacity,
    searchTranslateY,
  ]);

  // Function
  // Purpose: open FoodDetails with selected food.
  // Parameter: item is the food object.
  // Return value: none.
  // Called when a FoodCard is pressed.
  const handleFoodPress = item => {
    // React Navigation
    // navigate opens FoodDetails and passes the food object as params.
    navigation.navigate(Routes.FOOD_DETAILS, {food: item});
  };

  const handleCategoryPress = category => {
    navigation.navigate(Routes.MENU, {category});
  };

  // Function
  // Purpose: open Cart screen.
  // Parameters: none.
  // Return value: none.
  // Called when cart button is pressed.
  const handleCartPress = () => {
    navigation.navigate(Routes.CART);
  };

  // JavaScript array reduce
  // Groups categories into columns, with 2 category cards per column.
  const categoryColumns = categories.reduce((columns, category, index) => {
    // Math.floor creates a whole-number column index.
    const columnIndex = Math.floor(index / CATEGORY_ROWS);

    // If the column does not exist yet, create an empty array.
    if (!columns[columnIndex]) {
      columns[columnIndex] = [];
    }

    // Push current category into the correct column.
    columns[columnIndex].push(category);
    return columns;
  }, []);

  // Function
  // Purpose: render one column containing up to two categories.
  // Parameter: item is an array of category objects.
  // Return value: JSX.
  // Called by FlatList.
  const renderCategoryColumn = ({item}) => (
    <View style={styles.categoryColumn}>
      {item.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
          onPress={handleCategoryPress}
        />
      ))}
    </View>
  );

  // Function
  // Purpose: build animation style for a food card.
  // Parameter: animation is an Animated.Value.
  // Return value: style object.
  const getCardAnimatedStyle = animation => ({
    // Animated opacity changes from 0 to 1.
    opacity: animation,
    // transform applies movement and scale.
    transform: [
      {
        // interpolate maps 0->16 and 1->0 for vertical movement.
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
        }),
      },
      {
        // scale maps 0->0.96 and 1->1 for a small grow-in effect.
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  });

  // Function
  // Purpose: render one animated food card.
  // Parameters: item is food object, index selects matching animation value.
  // Return value: JSX.
  const renderPopularCard = (item, index) => (
    <Animated.View
      key={item.id}
      style={[styles.foodGridItem, getCardAnimatedStyle(popularCardAnims[index])]}>
      <FoodCard item={item} onPress={handleFoodPress} />
    </Animated.View>
  );

  return (
    // Animated.View
    // Root Home container with fade-in opacity.
    <Animated.View style={[styles.container, {opacity: screenOpacity}]}>
      {/* ScrollView
          Makes the whole Home page scroll vertically. */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* Animated.View
            Fades in the Header. */}
        <Animated.View style={{opacity: headerOpacity}}>
          <Header onCartPress={handleCartPress} />
        </Animated.View>

        {/* Animated.View
            Fades and slides the SearchBar into place. */}
        <Animated.View
          style={{
            opacity: searchOpacity,
            transform: [{translateY: searchTranslateY}],
          }}>
          <SearchBar value={searchText} onChangeText={setSearchText} />
        </Animated.View>

        {/* Animated.View
            Fades category section in. */}
        <Animated.View style={{opacity: categoriesOpacity}}>
          {/* FlatList
              Horizontally scrolls category columns. */}
          <FlatList
            data={categoryColumns}
            keyExtractor={item => item.map(category => category.id).join('-')}
            renderItem={renderCategoryColumn}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </Animated.View>

        {/* View
            Popular Items section. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          {/* View
              Two-column food grid inside the vertical ScrollView. */}
          <View style={styles.foodGrid}>
            {popularItems.map((item, index) => renderPopularCard(item, index))}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
