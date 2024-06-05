// electricitySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all electricity expenses
export const fetchElectricityExpenses = createAsyncThunk(
  'electricity/fetchElectricityExpenses', 
  async ({ startDate, endDate }, thunkAPI) => { 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${config.apiUrl}/electricity-expenses`, 
        { 
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate }
        }
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);
// Add a new electricity expense
export const addElectricityExpense = createAsyncThunk(
  'electricity/addElectricityExpense',
  async (expenseData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiUrl}/electricity`, expenseData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing electricity expense
export const updateElectricityExpense = createAsyncThunk(
  'electricity/updateElectricityExpense',
  async ({ expenseId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${config.apiUrl}/electricity/${expenseId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete an electricity expense
export const deleteElectricityExpense = createAsyncThunk(
  'electricity/deleteElectricityExpense',
  async (expenseId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/electricity/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return expenseId; // Return the expenseId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const electricitySlice = createSlice({
  name: 'electricity',
  initialState: {
    expenses: [],
    totalBillAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add any synchronous reducers here if needed (e.g., to filter expenses)
  },
  extraReducers: (builder) => {
    builder
      // Get all electricity expenses
      .addCase(fetchElectricityExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchElectricityExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.totalBillAmount = action.payload.totalBillAmount;
      })
      .addCase(fetchElectricityExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new electricity expense
      .addCase(addElectricityExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload.electricityExpenseId);
      })

      // Update an existing electricity expense
      .addCase(updateElectricityExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.expensesId === action.meta.arg.expenseId
        );
        if (index !== -1) {
          state.expenses[index] = action.meta.arg.updatedData;
        }
      })

      // Delete an electricity expense
      .addCase(deleteElectricityExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((expense) => expense.expensesId !== action.payload);
      });
  },
});

export default electricitySlice.reducer;