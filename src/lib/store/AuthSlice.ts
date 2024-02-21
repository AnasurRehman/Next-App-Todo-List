import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { token: null, userId: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  },
});

export const { setToken, setUserId } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.token;
export const getUserId = (state: RootState) => state.auth.userId;
export default AuthSlice.reducer;
