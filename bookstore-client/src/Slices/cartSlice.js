import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        state.totalQuantity -= 1;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
    updateCartQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    }
  },
});

export const { addItem, removeItem, clearCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
