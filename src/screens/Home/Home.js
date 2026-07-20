
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';

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
  const [cartCount, setCartCount] = useState(0);

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

  const handleAddToCart = () => {
    setCartCount(currentCount => currentCount + 1);
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: screenOpacity,
      }}>
      <ScreenContainer>
        <AppHeader
          greeting="Good Morning"
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
{/*
          <RecommendedSection
            navigation={navigation}
            searchText={searchText}
            onFoodPress={handleFoodPress}
            onAdd={handleAddToCart}
          />
        */}
        </ScrollView>
      </ScreenContainer>
    </Animated.View>
  );
}