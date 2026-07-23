
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
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
  CategoryList,
  RecommendedSection,
} from '../../components/home';

import Routes from '../../navigation/Routes';

export default function Home({navigation}) {
  const [searchText, setSearchText] = useState('');
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

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: screenOpacity,
      }}>
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
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            onClear={() => setSearchText('')}
            placeholder="Search food..."
          />

          <OfferBanner />

          <SectionTitle
            title="Categories"
            actionText="View All"
          />

          <CategoryList />

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
        </ScrollView>
      </ScreenContainer>
    </Animated.View>
  );
}
