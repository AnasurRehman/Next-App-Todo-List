import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { userId: null },
  reducers: {
    
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {  setUserId } = AuthSlice.actions;
export const getUserId = (state: RootState) => state.auth.userId;
export default AuthSlice.reducer;
