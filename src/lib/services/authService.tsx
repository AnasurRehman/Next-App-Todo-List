import api from "../store/api";
import { setToken, setUserId } from "../store/AuthSlice";

export const AuthService = api.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<any, any>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // Step 1: Authenticate user and get token
          const loggedInUser: any = await fetchWithBQ({
            url: "auth/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { username: _arg.username, password: _arg.password },
          });

          if (loggedInUser.error) {
            throw loggedInUser.error; // Handle authentication error
          }

          // Step 2: Get user details using the obtained token
          const getUser: any = await fetchWithBQ({
            url: "auth/me",
            method: "GET",
            headers: {
              Authorization: `Bearer ${loggedInUser.data.token}`,
            },
          });

          if (getUser.error) {
            throw getUser.error; // Handle user details fetching error
          }

          // Step 3: Dispatch the user ID to the Redux store
          _queryApi.dispatch(setUserId(loggedInUser.data.id));
          _queryApi.dispatch(setToken(loggedInUser.data.token));
          document.cookie = `userToken=${loggedInUser?.data?.token}; path=/`;
          // Step 4: Return the data in the expected format
          return { data: getUser };
        } catch (error: any) {
          // Handle any other errors here
          return error.status ? error : { error: { status: 400, data: error } };
        }
      },
      invalidatesTags: ["USERS"],
    }),

    signup: build.mutation<any, any>({
      query: (body) => ({
        url: "users/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
  overrideExisting: false,
});

export const { useSigninMutation, useSignupMutation } = AuthService;
