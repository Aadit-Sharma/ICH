/*
-----------------------------------------
File: categories.js

Purpose:
Stores category data for the Home screen.

Concepts Used:
- JavaScript array
- JavaScript objects
- Static image require()
- Export

Used By:
Home.js -> CategoryCard.js
-----------------------------------------
*/

// JavaScript array
// Each object represents one category card.
const categories = [
  {
    // Unique ID used as React list key.
    id: 1,
    // Category label shown to the user.
    name: 'Breakfast',
    // Static image import for category icon.
    icon: require('../assets/icons/breakfast.png'),
  },
  {
    id: 2,
    name: 'Snacks',
    icon: require('../assets/icons/fast-food.png'),
  },
  {
    id: 3,
    name: 'Lunch',
    icon: require('../assets/icons/lunch-time.png'),
  },
  {
    id: 4,
    name: 'Beverages',
    icon: require('../assets/icons/fast-food.png'),
  },
  {
    id: 5,
    name: 'South Indian',
    icon: require('../assets/icons/breakfast.png'),
  },
  {
    id: 6,
    name: 'North Indian',
    icon: require('../assets/icons/lunch-time.png'),
  },
  {
    id: 7,
    name: 'Desserts',
    icon: require('../assets/icons/fast-food.png'),
  },
];

// Export
// Allows Home.js to import the category list.
export default categories;
