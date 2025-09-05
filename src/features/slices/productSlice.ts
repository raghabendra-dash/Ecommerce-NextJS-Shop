import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/types";

interface ProductsState {
  items: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = productsSlice.actions;
export default productsSlice.reducer;
