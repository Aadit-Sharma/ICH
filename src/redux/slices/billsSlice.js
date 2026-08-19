import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  billsByUser: {},
  nextBillNumberByUser: {},
  latestBill: null,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    createBill: (state, action) => {
      const {order} = action.payload;

      if (!order || order.userId == null || order.username == null) {
        return;
      }

      const userKey = String(order.userId);
      const nextBillNumber = state.nextBillNumberByUser[userKey] || 1001;
      const bill = {
        id: `BILL-${nextBillNumber}`,
        orderId: order.id,
        placedAt: order.placedAt,
        items: order.items,
        total: order.total,
        subtotal: order.subtotal,
        tax: order.tax,
        serviceCharge: order.serviceCharge,
        paymentStatus: order.paymentStatus || 'Paid',
paymentId: order.paymentId,
paymentMethod: order.paymentMethod,
userId: order.userId,
username: order.username,
address: order.address,
      };

      if (!state.billsByUser[userKey]) {
        state.billsByUser[userKey] = [];
      }

      state.billsByUser[userKey].unshift(bill);
      state.latestBill = bill;
      state.nextBillNumberByUser[userKey] = nextBillNumber + 1;
    },
    resetBills: () => ({...initialState}),
  },
});

export const {createBill, resetBills} = billsSlice.actions;
export default billsSlice.reducer;
