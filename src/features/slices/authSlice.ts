import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userId = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", action.payload);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");
      }
    },
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        const userId = localStorage.getItem("userId");

        state.isAuthenticated = isAuthenticated;
        state.userId = userId;
      }
    },
  },
});

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUserId = (state: RootState) => state.auth.userId;

// Actions & reducer
export const { login, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
