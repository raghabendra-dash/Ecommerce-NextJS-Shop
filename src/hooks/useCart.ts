import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../features/slices/cartSlice";
import {
  toggleWishlist,
  clearWishlist,
} from "../features/slices/wishlistSlice";
import { login, logout } from "../features/slices/authSlice";
import { Product } from "@/lib/types";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const animationType = useSelector(
    (state: RootState) => state.cart.animationType
  );
  const wishlistAnimation = useSelector(
    (state: RootState) => state.wishlist.animationType
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return {
    cart,
    wishlist,
    animationType,
    wishlistAnimation,
    isAuthenticated,
    addToCart: (product: Product) => dispatch(addToCart(product)),
    removeFromCart: (productId: number) => dispatch(removeFromCart(productId)),
    incrementQuantity: (productId: number) =>
      dispatch(incrementQuantity(productId)),
    decrementQuantity: (productId: number) =>
      dispatch(decrementQuantity(productId)),
    toggleWishlist: (product: Product) => dispatch(toggleWishlist(product)),
    clearCart: () => dispatch(clearCart()),
    clearWishlist: () => dispatch(clearWishlist()),
    login: (email: string) => dispatch(login(email)),
    logout: () => dispatch(logout()),
    cartCount: cart.reduce((count, item) => count + item.quantity, 0),
    wishlistCount: wishlist.length,
    totalPrice: cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    isInWishlist: (productId: number) =>
      wishlist.some((item) => item.id === productId),
  };
};
