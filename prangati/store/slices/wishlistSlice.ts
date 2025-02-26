import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Product } from "@/config/interfaces";
interface WishlistState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const userUUID = localStorage.getItem("user_uuid");
    const data = JSON.stringify({ userId: userUUID });
    const response = await axios.get<Product[]>(
      `${process.env.NEXT_PUBLIC_SERVER}wishlist`,
      {
        data,
      },
    );

    return response.data;
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      state.items.push(action.payload);
    },
    removeItemFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch wishlist";
      });
  },
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
