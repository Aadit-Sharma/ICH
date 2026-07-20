import {StyleSheet} from 'react-native';
import {Spacing, Colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    paddingBottom: 120,
  },

  content: {
    paddingTop: 34,
    paddingBottom: 40,
  },

  categoriesList: {
    paddingRight: Spacing.lg,
    paddingBottom: 10,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },
});

export default styles;