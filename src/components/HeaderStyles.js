import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  copy: {
    flex: 1,
    paddingRight: 16,
  },
  greeting: {
    color: '#52606D',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
  },
  employeeName: {
    color: '#102A43',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0,
  },
  subtitle: {
    color: '#005BAC',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -2,
    right: -2,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
});

export default styles;
