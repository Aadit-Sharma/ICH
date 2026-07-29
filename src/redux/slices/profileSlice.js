import {createSlice} from '@reduxjs/toolkit';
import employeeProfile from '../../data/employeeProfile';

const initialState = {name: employeeProfile.name, phone: employeeProfile.phone};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
  },
});

export const {updateProfile} = profileSlice.actions;
export default profileSlice.reducer;
