import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
  const res = await API.get("/orders");
  return res.data;
});

// Create new order
export const createOrder = createAsyncThunk("orders/create", async (data) => {
  const res = await API.post("/orders", data);
  return res.data;
});

// Update order status
export const updateOrderStatus = createAsyncThunk("orders/updateStatus", async ({ id, status }) => {
  const res = await API.patch(`/orders/${id}/status`, { status });
  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export default orderSlice.reducer;
