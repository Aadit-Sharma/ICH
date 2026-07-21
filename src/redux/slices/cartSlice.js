import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
};

const calculateTotals = state => {
  state.totalItems = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  state.totalAmount = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        cartItem => cartItem.id === item.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        cartItem => cartItem.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }

      calculateTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        cartItem => cartItem.id === action.payload,
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          cartItem => cartItem.id !== action.payload,
        );
      }

      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );

      calculateTotals(state);
    },

    clearCart: state => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;