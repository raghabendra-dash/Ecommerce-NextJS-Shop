import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/lib/types";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";

interface CartState {
  items: CartItem[];
  animationType: "shake" | null;
}

const initialState: CartState = {
  items: [],
  animationType: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setAnimation: (state, action: PayloadAction<"shake" | null>) => {
      state.animationType = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setAnimation,
} = cartSlice.actions;
export default cartSlice.reducer;

export const addToCartWithAnimation =
  (product: Product) => (dispatch: AppDispatch) => {
    dispatch(addToCart(product));
    dispatch(setAnimation("shake"));
    setTimeout(() => {
      dispatch(setAnimation(null));
    }, 820);
  };

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
