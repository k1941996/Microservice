import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  isLoggedIn: false,
  userDetails: {},
  userImageLink: '',
  userRole: 'customer',
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState: userInitialState,
  reducers: {
    setUserDetails: (state, action) => {
      const tempState = { ...state };
      tempState.userDetails = action.payload.data;
      tempState.isLoggedIn = true;
      return tempState;
    },
    logOut: () => {
      return userInitialState;
    },
  },
});

export const { setUserDetails, logOut } = userSlice.actions;
const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
