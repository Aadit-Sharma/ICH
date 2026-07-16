import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#005BAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    borderWidth: 4,
    borderColor: '#F9A826',
    shadowColor: '#005BAC',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0,
  },
  title: {
    color: '#102A43',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#52606D',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 0,
  },
  footer: {
    position: 'absolute',
    bottom: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
