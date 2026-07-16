/*
-----------------------------------------
File: foodData.js

Purpose:
Stores dummy food data for the app.

Concepts Used:
- JavaScript arrays
- JavaScript objects
- Named exports
- Static image require()

Used By:
Home.js imports popularItems.
-----------------------------------------
*/

// Named export + array
// Older category list. Currently not used by Home.js.
export const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages'];

// Named export + array of objects
// Older "Today Special" data. Currently not rendered by Home.js.
export const todaysSpecial = [
  {
    id: 'special-1',
    name: 'Masala Dosa',
    price: 65,
    rating: 4.7,
    category: 'Breakfast',
    imageStyle: 'imageOrange',
    accentStyle: 'accentOrange',
  },
  {
    id: 'special-2',
    name: 'Veg Thali',
    price: 120,
    rating: 4.6,
    category: 'Lunch',
    imageStyle: 'imageGreen',
    accentStyle: 'accentGreen',
  },
  {
    id: 'special-3',
    name: 'Filter Coffee',
    price: 35,
    rating: 4.9,
    category: 'Beverages',
    imageStyle: 'imageAmber',
    accentStyle: 'accentAmber',
  },
  {
    id: 'special-4',
    name: 'Paneer Cutlet',
    price: 55,
    rating: 4.5,
    category: 'Snacks',
    imageStyle: 'imageSky',
    accentStyle: 'accentSky',
  },
];

// Named export + array of objects
// Active food list used by Home.js.
export const popularItems = [
  {
    // Unique ID used by React rendering and animations.
    id: 'popular-1',
    // Food name displayed in FoodCard.
    name: 'Idli Sambar',
    // Food price displayed in FoodCard.
    price: 45,
    // Rating displayed with star image.
    rating: 4.8,
    // Category label for future filtering.
    category: 'Breakfast',
    // Static image used by FoodCard.
    image: require('../assets/icons/idli dosa.png'),
  },
  {
    id: 'popular-2',
    name: 'Chole Bhature',
    price: 90,
    rating: 4.6,
    category: 'Lunch',
    image: require('../assets/icons/chole bhature.png'),
  },
  {
    id: 'popular-3',
    name: 'Masala Dosa',
    price: 65,
    rating: 4.7,
    category: 'South Indian',
    image: require('../assets/icons/idli dosa.png'),
  },
  {
    id: 'popular-4',
    name: 'Veg Sandwich',
    price: 50,
    rating: 4.4,
    category: 'Snacks',
    image: require('../assets/icons/fast-food.png'),
  },
  {
    id: 'popular-5',
    name: 'Tea',
    price: 20,
    rating: 4.5,
    category: 'Beverages',
    image: require('../assets/icons/lunch-time.png'),
  },
  {
    id: 'popular-6',
    name: 'Coffee',
    price: 35,
    rating: 4.9,
    category: 'Beverages',
    image: require('../assets/icons/breakfast.png'),
  },
  {
    id: 'popular-7',
    name: 'Upma',
    price: 45,
    rating: 4.5,
    category: 'South Indian',
    image: require('../assets/icons/idli dosa.png'),
  },
  {
    id: 'popular-8',
    name: 'Poha',
    price: 40,
    rating: 4.4,
    category: 'Breakfast',
    image: require('../assets/icons/breakfast.png'),
  },
  {
    id: 'popular-9',
    name: 'Paneer Paratha',
    price: 85,
    rating: 4.6,
    category: 'North Indian',
    image: require('../assets/icons/chole bhature.png'),
  },
  {
    id: 'popular-10',
    name: 'Veg Thali',
    price: 120,
    rating: 4.6,
    category: 'Lunch',
    image: require('../assets/icons/chole bhature.png'),
  },
];
