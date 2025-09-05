import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";
import { Product } from "@/lib/types";

interface WishlistState {
  items: Product[];
  animationType: "shake" | null;
}

const initialState: WishlistState = {
  items: [],
  animationType: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
        state.animationType = "shake";
      }
    },
    resetAnimation: (state) => {
      state.animationType = null;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.animationType = null;
    },
  },
});

export const { addToWishlist, toggleWishlist, resetAnimation, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

export const toggleWishlistWithAnimation =
  (product: Product) => (dispatch: AppDispatch) => {
    dispatch(toggleWishlist(product));
    setTimeout(() => {
      dispatch(resetAnimation());
    }, 820);
  };
