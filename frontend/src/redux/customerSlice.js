import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Fetch customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/customers");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add customer
export const addCustomer = createAsyncThunk(
  "customers/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/customers", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      });
  },
});

export default customerSlice.reducer;
