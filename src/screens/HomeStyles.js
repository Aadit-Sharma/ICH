/*
-----------------------------------------
File: HomeStyles.js

Purpose:
Stores layout styles for the Home screen.

Concepts Used:
- StyleSheet
- Flexbox
- Spacing
- Grid layout using flexWrap
-----------------------------------------
*/

// React Native StyleSheet import.
import {StyleSheet} from 'react-native';

// StyleSheet object for Home.js.
const styles = StyleSheet.create({
  container: {
    // flex: 1 makes Home fill the screen.
    flex: 1,
    // App background color.
    backgroundColor: '#F5F7FA',
  },
  content: {
    // Space from top of screen before header.
    paddingTop: 34,
    // Left/right screen padding.
    paddingHorizontal: 18,
    // Bottom space so last cards do not touch bottom edge.
    paddingBottom: 40,
  },
  categoryColumn: {
    // Small spacing between category columns.
    marginRight: 4,
  },
  categoriesList: {
    // Adds tiny left/right padding inside category list.
    paddingHorizontal: 1,
    // Prevents right-side clipping at end of category list.
    paddingRight: 18,
    // Bottom space after category list.
    paddingBottom: 10,
  },
  section: {
    // Space above section.
    marginTop: 30,
  },
  sectionTitle: {
    // Section title color.
    color: '#102A43',
    // Section title size.
    fontSize: 20,
    // Section title weight.
    fontWeight: '800',
    // Space below title.
    marginBottom: 14,
    letterSpacing: 0,
  },
  foodGrid: {
    // Flexbox row places cards side by side.
    flexDirection: 'row',
    // Allows cards to wrap to the next row.
    flexWrap: 'wrap',
    // Creates space between two columns.
    justifyContent: 'space-between',
    // Bottom space for grid.
    paddingBottom: 10,
  },
  foodGridItem: {
    // Each card takes 48% width, leaving gap between two columns.
    width: '48%',
    // Space below each card.
    marginBottom: 20,
  },
});

export default styles;
