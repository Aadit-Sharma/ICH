import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ordersByUser: {},
  nextOrderNumberByUser: {},
  latestOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const {items, total, placedAt, subtotal, tax, serviceCharge, userId, username} = action.payload;

      if (userId == null || username == null) {
        return;
      }

      const userKey = String(userId);
      const nextOrderNumber = state.nextOrderNumberByUser[userKey] || 1001;
      const order = {
        id: `ORD-${nextOrderNumber}`,
        placedAt,
        items: items.map(({id, name, price, quantity}) => ({id, name, price, quantity})),
        total,
        subtotal,
        tax,
        serviceCharge,
        status: 'Preparing',
        userId,
        username,
      };

      if (!state.ordersByUser[userKey]) {
        state.ordersByUser[userKey] = [];
      }

      state.ordersByUser[userKey].unshift(order);
      state.latestOrder = order;
      state.nextOrderNumberByUser[userKey] = nextOrderNumber + 1;
    },
    resetOrders: () => ({...initialState}),
  },
});

export const {createOrder, resetOrders} = ordersSlice.actions;
export default ordersSlice.reducer;
