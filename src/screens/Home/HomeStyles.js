import {StyleSheet} from 'react-native';

import { Spacing } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: Spacing.lg,
    paddingBottom: 120,
  },
  content: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  categoriesList: {
    paddingBottom: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#102A43',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: 0,
  },
  foodList: {
    paddingBottom: 8,
  },
});

export default styles;
