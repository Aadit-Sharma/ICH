import React from "react";
import { ScrollView } from "react-native";

import styles from "./HomeStyles";

import {
  ScreenContainer,
  AppHeader,
  SearchBar,
  SectionTitle,
} from "../../components/common";

import {
  OfferBanner,
  CategoryList,
  RecommendedSection,
} from "../../components/home";

import { Spacing } from "../../theme";

const Home = ({ navigation }) => {

  return (

    <ScreenContainer>

      <AppHeader
        greeting="Good Morning"
        username="Anushi"
        rightIcon="🔔"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <SearchBar
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
        />

      </ScrollView>

    </ScreenContainer>

  );

};


export default Home;
