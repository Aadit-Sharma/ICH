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
  createMigrate,
  createTransform,
} from 'redux-persist';
import {clearCart} from './slices/cartSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';
import billsReducer from './slices/billsSlice';
import profileReducer from './slices/profileSlice';
import addressReducer from './slices/addressSlice';
const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  bills: billsReducer,
  profile: profileReducer,
  addresses:addressReducer,
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

const migrateHistoryByUser = (history, legacyRecordsKey, recordsKey, counterKey) => {
  if (!history || history[recordsKey]) {
    return history;
  }

  const recordsByUser = {};
  const nextNumberByUser = {};

  (history[legacyRecordsKey] || []).forEach(record => {
    if (!record || record.userId == null || record.username == null) {
      return;
    }

    const userKey = String(record.userId);
    if (!recordsByUser[userKey]) {
      recordsByUser[userKey] = [];
      nextNumberByUser[userKey] = 1001;
    }

    recordsByUser[userKey].push(record);
    const recordNumber = Number(String(record.id).replace(/\D/g, ''));
    if (Number.isFinite(recordNumber)) {
      nextNumberByUser[userKey] = Math.max(
        nextNumberByUser[userKey],
        recordNumber + 1,
      );
    }
  });

  const migratedHistory = {...history};
  delete migratedHistory[legacyRecordsKey];
  delete migratedHistory.nextOrderNumber;
  delete migratedHistory.nextBillNumber;

  return {
    ...migratedHistory,
    [recordsKey]: recordsByUser,
    [counterKey]: nextNumberByUser,
  };
};

const migrations = {
  2: state => {
    if (!state) {
      return state;
    }

    return {
      ...state,
      orders: migrateHistoryByUser(
        state.orders,
        'orders',
        'ordersByUser',
        'nextOrderNumberByUser',
      ),
      bills: migrateHistoryByUser(
        state.bills,
        'bills',
        'billsByUser',
        'nextBillNumberByUser',
      ),
    };
  },
};

const persistConfig = {
  key: 'ich',
  version: 2,
  storage: AsyncStorage,
  whitelist: [
  'cart',
  'orders',
  'bills',
  'profile',
  'addresses',
],
  transforms: [removeTransientCheckoutState],
  migrate: createMigrate(migrations, {debug: false}),
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
  await AsyncStorage.removeItem('isLoggedIn');
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('user');
  await persistor.flush();
};
