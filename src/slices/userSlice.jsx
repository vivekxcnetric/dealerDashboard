// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL  ;


export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/dealer/login`, credentials);
    const { token, 'dealer-token': dealerToken } = response.data;

    // Save tokens to local storage
    localStorage.setItem('token', token);
    localStorage.setItem('dealer-token', dealerToken);

    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk('user/signup', async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/dealer/signup`, userInfo);
    // toast.success("Resgistration Successful")
    console.log(response)
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success:null
  },
  reducers: {
    logout: (state) => {
      // Clear tokens from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('dealer-token');
      
      // Reset the user state
      state.user = null;
      state.error = null;
      state.loading = false;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.success= null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success= action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.msg : action.error.msg;
        state.success= null;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
