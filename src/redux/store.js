import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
} from 'redux-persist';
import {clearCart} from './slices/cartSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';
import billsReducer from './slices/billsSlice';
import profileReducer from './slices/profileSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  bills: billsReducer,
  profile: profileReducer,
});

// Checkout feedback is session-only. Durable records and cart contents persist.
const removeTransientCheckoutState = createTransform(
  (inboundState, key) => {
    if (key === 'orders') {
      return {...inboundState, latestOrder: null};
    }
    if (key === 'bills') {
      return {...inboundState, latestBill: null};
    }
    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'orders') {
      return {...outboundState, latestOrder: null};
    }
    if (key === 'bills') {
      return {...outboundState, latestBill: null};
    }
    return outboundState;
  },
  {whitelist: ['orders', 'bills']},
);

const persistConfig = {
  key: 'ich',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['cart', 'orders', 'bills', 'profile'],
  transforms: [removeTransientCheckoutState],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// This is intentionally used only by the logout flow. It deliberately keeps
// order and bill history available after a subsequent sign-in.
export const clearApplicationData = async () => {
  store.dispatch(clearCart());
  await persistor.flush();
};
