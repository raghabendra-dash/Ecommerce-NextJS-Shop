"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/slices/cartSlice";
import wishlistReducer from "../features/slices/wishlistSlice";
import authReducer, { hydrateAuth } from "../features/slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

store.dispatch(hydrateAuth());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
