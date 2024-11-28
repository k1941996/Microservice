import userSliceReducer from '$redux/Slice/UserSlice.js';
// import { userAPI } from '$redux/Misc.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userDetails: userSliceReducer,
  },
});

export default store;
