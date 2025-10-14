import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartBasket: [],
  totalProducts: 0,
  subtotal: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const found = state.cartBasket.find(
        (p) => p.id === action.payload.product.id
      );
      if (!found) {
        state.cartBasket.push({
          ...action.payload.product,
          quantity: action.payload.quantity,
        });
      } else {
        found.quantity += action.payload.quantity;
      }
      state.totalProducts = state.cartBasket.length;
      state.subtotal = state.cartBasket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeProduct(state, action) {
      state.cartBasket = state.cartBasket.filter(
        (p) => p.id !== action.payload.id
      );
      state.totalProducts = state.cartBasket.length;
      state.subtotal = state.cartBasket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    incQuantity(state, action) {
      const product = state.cartBasket.find(
        (p) => p.id === action.payload.id
      );
      if (product) {
        product.quantity += 1;
      }

      state.subtotal = state.cartBasket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    decQuantity(state, action) {
      const product = state.cartBasket.find(
        (p) => p.id === action.payload.id
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else if (product && product.quantity === 1) {
    
        state.cartBasket = state.cartBasket.filter(
          (p) => p.id !== action.payload.id
        );
      }
      state.totalProducts = state.cartBasket.length;
      state.subtotal = state.cartBasket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart(state) {
      state.cartBasket = [];
      state.totalProducts = 0;
      state.subtotal = 0;
    },
  },
});
export const {
  addProduct,
  removeProduct,
  clearCart,
  decQuantity,
  incQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
