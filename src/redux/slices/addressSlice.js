import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  addressesByUser: {},
  selectedAddressByUser: {},
};

const addressSlice = createSlice({
  name: 'addresses',

  initialState,

  reducers: {
    /*
     * Add an address for a user.
     *
     * If the address came from the backend,
     * preserve its existing ID.
     *
     * If it is a new local address without an ID,
     * generate a temporary ID.
     */
    addAddress: (state, action) => {
      const {userId, address} = action.payload;

      if (userId == null || !address) {
        return;
      }

      const userKey = String(userId);

      if (!state.addressesByUser[userKey]) {
        state.addressesByUser[userKey] = [];
      }

      /*
       * Prevent duplicate addresses from being
       * added when loading data from MongoDB.
       */
      const existingAddress =
        state.addressesByUser[userKey].find(
          item => item.id === address.id,
        );

      if (existingAddress) {
        return;
      }

      /*
       * Preserve the MongoDB/backend ID.
       * Only generate one when no ID exists.
       */
      const newAddress = {
        ...address,
        id: address.id || `ADDR-${Date.now()}`,
      };

      state.addressesByUser[userKey].push(
        newAddress,
      );

      /*
       * Automatically select the first address.
       */
      if (!state.selectedAddressByUser[userKey]) {
        state.selectedAddressByUser[userKey] =
          newAddress.id;
      }
    },

    /*
     * Select an address for a user.
     */
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

    /*
     * Delete an address for a user.
     */
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

      /*
       * If the deleted address was selected,
       * select the first remaining address.
       */
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

    /*
     * Clear all addresses for all users.
     */
    clearAddresses: state => {
      state.addressesByUser = {};
      state.selectedAddressByUser = {};
    },

    /*
     * Clear addresses for only one user.
     *
     * Used before loading that user's latest
     * addresses from MongoDB.
     */
    clearUserAddresses: (state, action) => {
      const {userId} = action.payload;

      if (userId == null) {
        return;
      }

      const userKey = String(userId);

      state.addressesByUser[userKey] = [];
      state.selectedAddressByUser[userKey] = null;
    },
  },
});

export const {
  addAddress,
  selectAddress,
  deleteAddress,
  clearAddresses,
  clearUserAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;