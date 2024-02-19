import { configureStore } from "@reduxjs/toolkit";
import api, { MAIN_API_REDUCER_KEY } from "./api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [MAIN_API_REDUCER_KEY]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(api.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
