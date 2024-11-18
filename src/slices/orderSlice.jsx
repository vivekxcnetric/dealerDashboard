import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const AUTH_TOKEN = localStorage.getItem("token");
const DEALER_TOKEN = localStorage.getItem("dealer-token");

// Fetch all orders with an optional query
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (query = '') => {
    let url = `${API_URL}/api/v1/dealer/orders`;
    if (query) {
      url += `?q=${query}`;
    }
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'dealer-token': DEALER_TOKEN,
      }
    });
    return response.data;
  }
);

// Fetch a single order by ID
export const fetchSingleOrder = createAsyncThunk(
  'orders/fetchSingle',
  async (id) => {
    const response = await axios.get(`${API_URL}/api/v1/dealer/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'dealer-token': DEALER_TOKEN,
      }
    });
    return response.data;
  }
);

// Update order status by ID and query
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }) => {
    const url = `${API_URL}/api/v1/dealer/orders/${id}?q=${status}`;
    const response = await axios.put(url, null, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'dealer-token': DEALER_TOKEN,
      }
    });
    return response.data;
  }
);
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
