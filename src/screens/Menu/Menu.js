import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import FoodCard from '../../components/FoodCard';
import SearchBar from '../../components/SearchBar';
import {popularItems} from '../../data/foodData';
import Routes from '../../navigation/Routes';

export default function Menu({navigation, route}) {
  const totalItems = useSelector(state => state.cart.totalItems);
  const [searchText, setSearchText] = useState('');
  const selectedCategory = route.params?.category?.name;
  const categoryName = selectedCategory || 'Menu';

  const visibleItems = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return popularItems.filter(
      item =>
      (!selectedCategory || item.category === selectedCategory) &&
        (item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)),
    );
  }, [searchText, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Image
            source={require('../../assets/icons/back arrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.title} numberOfLines={1}>
          {categoryName}
        </Text>

        <Pressable
          onPress={() => navigation.navigate(Routes.CART)}
          style={styles.headerButton}
          accessibilityRole="button"
          accessibilityLabel="Open cart">
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.cartIcon}
            resizeMode="contain"
          />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.content}>
        <SearchBar value={searchText} onChangeText={setSearchText} />

        <View style={styles.filterRow}>
          <View style={styles.allChip}>
            <Text style={styles.allChipText}>All</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}>
          {visibleItems.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate(Routes.FOOD_DETAILS, {food: item})}
            />
          ))}

          {visibleItems.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No items found in this category.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F7FA'},
  header: {
    minHeight: 104,
    paddingTop: 42,
    paddingHorizontal: 18,
    paddingBottom: 14,
    backgroundColor: '#005BAC',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#102A43',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {width: 19, height: 19, tintColor: '#005BAC'},
  cartIcon: {width: 22, height: 22},
  title: {
    flex: 1,
    marginHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 19,
    height: 19,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {color: '#FFFFFF', fontSize: 10, fontWeight: '900'},
  content: {flex: 1, paddingHorizontal: 18, paddingTop: 16},
  filterRow: {marginTop: 12, marginBottom: 14},
  allChip: {
    alignSelf: 'flex-start',
    minWidth: 56,
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 17,
    backgroundColor: '#005BAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allChipText: {color: '#FFFFFF', fontSize: 13, fontWeight: '800'},
  listContent: {paddingBottom: 44},
  emptyState: {alignItems: 'center', paddingTop: 64},
  emptyText: {color: '#52606D', fontSize: 15, fontWeight: '600'},
});
