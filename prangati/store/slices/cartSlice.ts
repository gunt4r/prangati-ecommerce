import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  items: CartProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;