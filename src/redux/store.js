import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});
