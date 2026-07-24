import {StyleSheet} from 'react-native';
import {Spacing} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  searchSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Spacing.sm,
  },
  offerSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Spacing.sm,
  },
  categoriesSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Spacing.sm,
  },
  categoryList: {
    paddingTop: 12,
    paddingRight: 12,
  },
  categoryCardSpacing: {marginRight: 12},
  recommendedSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Spacing.lg,
  },
});

export default styles;
