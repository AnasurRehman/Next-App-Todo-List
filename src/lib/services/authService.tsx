import { LoggedInUserProps, SignInProps, SignUpProps } from "@/_helpers/types";
import api from "../store/api";
import { setUserId } from "../store/AuthSlice";

export const AuthService = api.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<LoggedInUserProps, SignInProps>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const loggedInUser: any = await fetchWithBQ({
            url: "auth/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { username: _arg.username, password: _arg.password },
          });

          if (loggedInUser.error) {
            throw loggedInUser.error;
          }

          _queryApi.dispatch(setUserId(loggedInUser.data.id));
          document.cookie = `userToken=${loggedInUser?.data?.token}; path=/`;

          return { data: loggedInUser };
        } catch (error: any) {
          return error.status ? error : { error: { status: 400, data: error } };
        }
      },
      invalidatesTags: ["USERS"],
    }),

    signup: build.mutation<LoggedInUserProps, SignUpProps>({
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
