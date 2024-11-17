import { User } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: 0,
    username: "",
    email: "",
    name: "",
    comments_count: 0,
    posts_count: 0,
    profile_image: "",
  },
  token: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    saveTokenAndUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    deleteTokenAndUser: (state) => {
      state.token = "";
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
  },
});

export const { saveTokenAndUser, deleteTokenAndUser } = authSlice.actions;

export default authSlice.reducer;
