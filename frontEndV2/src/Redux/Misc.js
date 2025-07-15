import { eCommRTKBaseQuery } from '@api/EcommApiInterceptor';
import { createApi } from '@reduxjs/toolkit/query/react';
import { setUserDetails } from '@slice/UserSlice';
import { setAccountId, setToken } from '@utils/tokenUtil';

export const userAPI = createApi({
  reducerPath: 'Auth',
  baseQuery: eCommRTKBaseQuery,
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (userDetails) => ({
        url: '/signup/admin',
        method: 'POST',
        body: userDetails, // ✅ RTK Query expects `body`, not `data`
      }),
      transformResponse: (response) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setUserDetails(data));
        } catch (err) {
          console.error('Error creating user:', err);
        }
      },
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
      }),
      transformResponse: (response) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { userData, token } = data;
          setToken(token);
          setAccountId(userData._id);
          dispatch(setUserDetails(userData));
        } catch (err) {
          console.error('Error creating user:', err);
          return err;
        }
      },
    }),

    authorize: build.query({
      query: () => ({
        url: '/token',
        method: 'GET',
      }),
      transformResponse: (response) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data.user);
          dispatch(setUserDetails(data.user));
        } catch (error) {
          // console.error('Error authorizing user:', err);
          setAccountId('');
          setToken('');
        }
      },
    }),
  }),
});

export const { useCreateUserMutation, useAuthorizeQuery, useLoginMutation } = userAPI;
