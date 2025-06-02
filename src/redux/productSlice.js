import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProductInState(state, action) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProductFromState(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProductInState,
  deleteProductFromState,
} = productSlice.actions;

export default productSlice.reducer;
