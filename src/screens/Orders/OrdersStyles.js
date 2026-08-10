import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1565C0',
  },

  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  downloadIcon: {
    width: 22,
    height: 22,
  },

  content: {
    padding: 12,
    paddingBottom: 28,
    backgroundColor: '#F5F7FA',
  },

  orderCard: {
    width: '100%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },

  selectedCard: {
    borderColor: '#005BAC',
    borderWidth: 1.5,
  },

  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderId: {
    color: '#005BAC',
    fontSize: 16,
    fontWeight: '800',
  },

  orderDate: {
    color: '#64748B',
    fontSize: 12,
    marginLeft: 8,
  },

  orderStatus: {
    alignSelf: 'flex-end',
    marginTop: -22,
    borderRadius: 12,
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#005BAC',
    fontSize: 12,
    fontWeight: '700',
  },

  itemsContainer: {
    marginTop: 16,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  itemName: {
    flex: 1,
    paddingRight: 12,
    color: '#334155',
    fontSize: 14,
  },

  itemQuantity: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '700',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },

  totalLabel: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },

  totalPrice: {
    color: '#1E293B',
    fontSize: 17,
    fontWeight: '800',
  },

  addressSection: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E4E7EB',
  },

  addressTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 8,
  },

  addressName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#243B53',
    marginBottom: 3,
  },

  addressText: {
    fontSize: 13,
    color: '#627D98',
    lineHeight: 19,
  },

  addressPhone: {
    fontSize: 13,
    color: '#52606D',
    marginTop: 6,
    fontWeight: '600',
  },

  emptyState: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingVertical: 28,
    paddingHorizontal: 24,
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  emptyIcon: {
    width: 90,
    height: 90,
  },

  emptyTitle: {
    marginTop: 16,
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '800',
  },

  emptyText: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default styles;