import api from "@/lib/store/api";
import { setToken } from "../store/AuthSlice";

export const AuthService = api.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<any, any>({
      query: ({ username, password }) => ({
        url: "auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { username, password },
      }),
      transformResponse: (rawResponse: any) => {
        return rawResponse;
      },
    }),
  }),
});

export const { useSigninMutation } = AuthService;
