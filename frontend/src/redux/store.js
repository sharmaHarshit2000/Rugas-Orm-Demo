import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customerReducer from "./customerSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
     products: productReducer,
  },
});
