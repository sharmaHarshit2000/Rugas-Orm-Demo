import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customerReducer from "./customerSlice";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";
import sidebarReducer from "./sidebarSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    products: productReducer,
    orders: orderReducer,
    sidebar: sidebarReducer,
  },
});
