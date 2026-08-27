import {createSlice} from '@reduxjs/toolkit';
import employeeProfile from '../../data/employeeProfile';

const initialState = {
  name: employeeProfile.name,
  firstName: '',
  lastName: '',
  email: employeeProfile.email,
  gender: '',
  age: '',
  birthDate: '',
  phone: employeeProfile.phone,
};

const profileSlice = createSlice({
  name: 'profile',

  initialState,

  reducers: {
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {updateProfile} =
  profileSlice.actions;

export default profileSlice.reducer;