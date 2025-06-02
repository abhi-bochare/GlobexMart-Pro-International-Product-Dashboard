import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // { uid, email }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// ✅ Thunk to handle Firebase signOut and Redux cleanup
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
