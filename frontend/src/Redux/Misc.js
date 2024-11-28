import { eCommBaseQuery } from '$apis/EcommApiInterceptor.js';
import { setUserDetails } from '$redux/Slice/UserSlice.js';
import { createApi } from '@reduxjs/toolkit/query';

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: eCommBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userDetails) => ({
        url: '',
        transformResponse: (response) => response,
        method: 'POST',
        data: userDetails,
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            // When the users are fetched, dispatch an action to save them into the custom userDetails slice
            console.log(data);
            dispatch(setUserDetails(data));
          } catch (err) {
            console.error('Error fetching users:', err);
          }
        },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userAPI;
