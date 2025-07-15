import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  isLoggedIn: false,
  userImageLink: '',
  userRole: 'customer',
  _id: '',
  name: '',
  email: '',
  userName: '',
  role: '',
  createdAt: '',
  updatedAt: '',
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState: userInitialState,
  reducers: {
    setUserDetails: (state, action) => {
      const tempState = { ...state };
      console.log(action.payload);
      const { userImageLink, userRole, _id, name, email, userName, role, createdAt, updatedAt } = action.payload;
      tempState.isLoggedIn = true;
      tempState.userImageLink = userImageLink;
      tempState.userRole = userRole;
      tempState._id = _id;
      tempState.name = name;
      tempState.email = email;
      tempState.userName = userName;
      tempState.role = role;
      tempState.createdAt = createdAt;
      tempState.updatedAt = updatedAt;
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
