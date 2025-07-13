import userSliceReducer from '$redux/Slice/UserSlice.js';
import { userAPI } from '$redux/Misc.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userDetails: userSliceReducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
});

export default store;

