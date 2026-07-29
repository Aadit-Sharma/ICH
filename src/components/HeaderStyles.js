
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
   
    height: 165,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
  },
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    overflow: 'hidden',
  },
  copy: {
    flex: 1,
    paddingRight: 18,
  },
  greeting: {
    color: '#DCEBFA',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0,
  },
  employeeName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0,
  },
  subtitle: {
    color: '#F9A826',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 7,
    letterSpacing: 0,
  },
  cartButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#003A70',
    shadowOffset: {
      width: 10,
      height: 18,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 7,
  },
  watermark: {
    position: 'absolute',
    right: 80,
    bottom: -9,
    color: '#FFFFFF',
    fontSize: 104,
    opacity: 0.07,
    transform: [{rotate: '-12deg'}],
  },
  cartIcon: {
    width: 27,
    height: 27,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -3,
    right: -3,
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
