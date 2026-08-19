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
      const {
        items,
        total,
        placedAt,
        subtotal,
        tax,
        serviceCharge,
        userId,
        username,
        address,
        orderId,
        paymentStatus,
        razorpayOrderId,
        razorpayPaymentId,
      } = action.payload;

      if (userId == null || username == null) {
        return;
      }

      const userKey = String(userId);

      const nextOrderNumber =
        state.nextOrderNumberByUser[userKey] || 1001;

      const order = {
        id: orderId || `ORD-${nextOrderNumber}`,

        placedAt: placedAt || new Date().toISOString(),

        items: (items || []).map(
          ({id, name, price, quantity}) => ({
            id,
            name,
            price,
            quantity,
          }),
        ),

        subtotal,
        tax,
        serviceCharge,
        total,

        status: 'Preparing',
        paymentStatus: paymentStatus || 'Paid',

        razorpayOrderId,
        razorpayPaymentId,

        userId,
        username,
        address,
      };

      if (!state.ordersByUser[userKey]) {
        state.ordersByUser[userKey] = [];
      }

      state.ordersByUser[userKey].unshift(order);

      state.latestOrder = order;

      state.nextOrderNumberByUser[userKey] =
        nextOrderNumber + 1;
    },

    updateOrderStatus: (state, action) => {
      const {
        orderId,
        userId,
        status,
      } = action.payload;

      if (
        userId == null ||
        !orderId ||
        !status
      ) {
        return;
      }

      const userKey = String(userId);

      const userOrders =
        state.ordersByUser[userKey];

      if (!userOrders) {
        return;
      }

      const order = userOrders.find(
        item => item.id === orderId,
      );

      if (!order) {
        return;
      }

      order.status = status;

      if (
        state.latestOrder &&
        state.latestOrder.id === orderId
      ) {
        state.latestOrder = order;
      }
    },

    resetOrders: () => ({
      ...initialState,
    }),
  },
});

export const {
  createOrder,
  updateOrderStatus,
  resetOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;