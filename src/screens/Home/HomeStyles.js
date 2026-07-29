import {StyleSheet} from 'react-native';
import {Spacing} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    backgroundColor: '#005BAC',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingBottom: Spacing.xxl,
  },
  searchSection: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  offerSection: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
    marginBottom: 24,
    borderRadius: 24,
    shadowColor: '#005BAC',
    shadowOffset: {width: 0, height: 9},
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 5,
  },
  categoriesSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Spacing.sm,
  },
  categoryList: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingRight: 32,
    paddingBottom: 8,
  },
  categoryListViewport: {marginHorizontal: -16},
  categoryAnimation: {
    marginRight: 0,
  },
  categoryCardSpacing: {marginRight: 16},
  categoryCard: {width: 96},
  recommendedSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Spacing.lg,
  },
});

export default styles;
