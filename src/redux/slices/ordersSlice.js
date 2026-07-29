import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  nextOrderNumber: 1001,
  latestOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const {items, total, placedAt, subtotal, tax, serviceCharge} = action.payload;
      const order = {
        id: `ORD-${state.nextOrderNumber}`,
        placedAt,
        items: items.map(({id, name, price, quantity}) => ({id, name, price, quantity})),
        total,
        subtotal,
        tax,
        serviceCharge,
        status: 'Preparing',
      };

      state.orders.unshift(order);
      state.latestOrder = order;
      state.nextOrderNumber += 1;
    },
    resetOrders: () => ({...initialState}),
  },
});

export const {createOrder, resetOrders} = ordersSlice.actions;
export default ordersSlice.reducer;
