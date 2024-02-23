import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MAIN_API_REDUCER_KEY = "mainApi";

const api = createApi({
  reducerPath: MAIN_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: () => ({}),
  tagTypes: ["TODOS", "USERS"],
});

export default api;
