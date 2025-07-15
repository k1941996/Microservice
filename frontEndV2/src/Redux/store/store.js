import userSliceReducer from '@slice/UserSlice';
import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from '@redux/Misc';

const store = configureStore({
  reducer: {
    userDetails: userSliceReducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
});

export default store;

