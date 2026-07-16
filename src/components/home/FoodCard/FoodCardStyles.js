import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  animatedContainer: {
    width: 168,
    marginRight: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  imagePlaceholder: {
    height: 104,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  foodMark: {
    width: 54,
    height: 54,
    borderRadius: 27,
    opacity: 0.9,
  },
  imageOrange: {
    backgroundColor: '#FFE8D6',
  },
  accentOrange: {
    backgroundColor: '#F97316',
  },
  imageGreen: {
    backgroundColor: '#DCFCE7',
  },
  accentGreen: {
    backgroundColor: '#16A34A',
  },
  imageAmber: {
    backgroundColor: '#FEF3C7',
  },
  accentAmber: {
    backgroundColor: '#B45309',
  },
  imageSky: {
    backgroundColor: '#E0F2FE',
  },
  accentSky: {
    backgroundColor: '#0284C7',
  },
  imagePink: {
    backgroundColor: '#FCE7F3',
  },
  accentPink: {
    backgroundColor: '#DB2777',
  },
  imageLime: {
    backgroundColor: '#ECFCCB',
  },
  accentLime: {
    backgroundColor: '#65A30D',
  },
  imageViolet: {
    backgroundColor: '#EDE9FE',
  },
  accentViolet: {
    backgroundColor: '#7C3AED',
  },
  imageRed: {
    backgroundColor: '#FEE2E2',
  },
  accentRed: {
    backgroundColor: '#DC2626',
  },
  content: {
    minHeight: 92,
  },
  name: {
    color: '#102A43',
    fontSize: 15,
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
    color: '#005BAC',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#52606D',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 3,
    letterSpacing: 0,
  },
  addButton: {
    height: 34,
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
});

export default styles;
