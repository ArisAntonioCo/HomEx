// payrollSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all payrolls
export const fetchAllPayrolls = createAsyncThunk(
  'payroll/fetchAllPayrolls', 
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.apiUrl}/payrolls`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

// Add a new payroll
export const addPayroll = createAsyncThunk(
  'payroll/addPayroll',
  async (payrollData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiUrl}/payroll`, payrollData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing payroll
export const updatePayroll = createAsyncThunk(
  'payroll/updatePayroll',
  async ({ payId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${config.apiUrl}/payroll/${payId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a payroll
export const deletePayroll = createAsyncThunk(
  'payroll/deletePayroll',
  async (payId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/payroll/${payId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return payId; // Return the payId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const payrollSlice = createSlice({
  name: 'payroll',
  initialState: {
    payrolls: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add any synchronous reducers here if needed (e.g., to filter payrolls)
  },
  extraReducers: (builder) => {
    builder
      // Get all payrolls
      .addCase(fetchAllPayrolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayrolls.fulfilled, (state, action) => {
        state.loading = false;
        state.payrolls = action.payload.payrolls;
      })
      .addCase(fetchAllPayrolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new payroll
      .addCase(addPayroll.fulfilled, (state, action) => {
        state.payrolls.push(action.payload.payroll);
      })

      // Update an existing payroll
      .addCase(updatePayroll.fulfilled, (state, action) => {
        const index = state.payrolls.findIndex(
          (payroll) => payroll.payId === action.meta.arg.payId
        );
        if (index !== -1) {
          state.payrolls[index] = action.meta.arg.updatedData;
        }
      })

      // Delete a payroll
      .addCase(deletePayroll.fulfilled, (state, action) => {
        state.payrolls = state.payrolls.filter((payroll) => payroll.payId !== action.payload);
      });
  },
});

export default payrollSlice.reducer;