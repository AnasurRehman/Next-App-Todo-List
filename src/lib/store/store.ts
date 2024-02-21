import { combineReducers, configureStore } from "@reduxjs/toolkit";
import api, { MAIN_API_REDUCER_KEY } from "./api";
import AuthReducer from "./AuthSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  auth: AuthReducer,
  [MAIN_API_REDUCER_KEY]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([api.middleware]);
    },
  });
};

export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
