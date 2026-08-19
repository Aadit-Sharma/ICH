import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  addressesByUser: {},
  selectedAddressByUser: {},
};

const addressSlice = createSlice({
  name: 'addresses',

  initialState,

  reducers: {
    addAddress: (state, action) => {
      const {userId, address} = action.payload;

      if (userId == null || !address) {
        return;
      }

      const userKey = String(userId);

      if (!state.addressesByUser[userKey]) {
        state.addressesByUser[userKey] = [];
      }

      const newAddress = {
        ...address,
        id: `ADDR-${Date.now()}`,
      };

      state.addressesByUser[userKey].push(newAddress);

      if (!state.selectedAddressByUser[userKey]) {
        state.selectedAddressByUser[userKey] =
          newAddress.id;
      }
    },

    selectAddress: (state, action) => {
      const {userId, addressId} = action.payload;

      if (userId == null || !addressId) {
        return;
      }

      const userKey = String(userId);

      const addresses =
        state.addressesByUser[userKey] || [];

      const exists = addresses.some(
        address => address.id === addressId,
      );

      if (exists) {
        state.selectedAddressByUser[userKey] =
          addressId;
      }
    },

    deleteAddress: (state, action) => {
      const {userId, addressId} = action.payload;

      if (userId == null || !addressId) {
        return;
      }

      const userKey = String(userId);

      const addresses =
        state.addressesByUser[userKey] || [];

      state.addressesByUser[userKey] =
        addresses.filter(
          address => address.id !== addressId,
        );

      if (
        state.selectedAddressByUser[userKey] ===
        addressId
      ) {
        const remaining =
          state.addressesByUser[userKey];

        state.selectedAddressByUser[userKey] =
          remaining.length
            ? remaining[0].id
            : null;
      }
    },

    clearAddresses: state => {
      state.addressesByUser = {};
      state.selectedAddressByUser = {};
    },
  },
});

export const {
  addAddress,
  selectAddress,
  deleteAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;