/*
-----------------------------------------
File: FoodCardStyles.js

Purpose:
Styles reusable food cards.

Concepts Used:
- StyleSheet
- Card shadows
- Image sizing
- Typography
- Button styling
-----------------------------------------
*/

// React Native StyleSheet import.
import {StyleSheet} from 'react-native';

// StyleSheet object for FoodCard.js.
const styles = StyleSheet.create({
  animatedContainer: {
    // Makes card fill the grid column width.
    width: '100%',
  },
  card: {
    // White card background.
    backgroundColor: '#FFFFFF',
    // Rounded card corners.
    borderRadius: 18,
    // Internal spacing.
    padding: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
  image: {
    // Image fills card width.
    width: '100%',
    // Image height.
    height: 98,
    // Rounded image corners.
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
  },
  content: {
    minHeight: 90,
  },
  name: {
    color: '#102A43',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    // NTPC blue price color.
    color: '#005BAC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    width: 13,
    height: 13,
  },
  ratingText: {
    color: '#52606D',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 3,
    letterSpacing: 0,
  },
  addButton: {
    // Full-width ADD button height.
    height: 33,
    // Rounded button corners.
    borderRadius: 17,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  quantitySelector: {
    height: 33,
    borderRadius: 17,
    backgroundColor: '#005BAC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 36,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
});

export default styles;
