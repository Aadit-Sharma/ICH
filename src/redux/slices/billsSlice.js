import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bills: [],
  nextBillNumber: 1001,
  latestBill: null,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    createBill: (state, action) => {
      const {order} = action.payload;
      const bill = {
        id: `BILL-${state.nextBillNumber}`,
        orderId: order.id,
        placedAt: order.placedAt,
        items: order.items,
        total: order.total,
        subtotal: order.subtotal,
        tax: order.tax,
        serviceCharge: order.serviceCharge,
        paymentStatus: 'Paid',
      };

      state.bills.unshift(bill);
      state.latestBill = bill;
      state.nextBillNumber += 1;
    },
    resetBills: () => ({...initialState}),
  },
});

export const {createBill, resetBills} = billsSlice.actions;
export default billsSlice.reducer;
