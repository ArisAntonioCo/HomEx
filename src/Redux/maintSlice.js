// maintenanceSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all maintenance expenses
export const fetchMaintenanceExpenses = createAsyncThunk(
  'maintenance/fetchMaintenanceExpenses', 
  async ({ startDate, endDate }, thunkAPI) => { 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${config.apiUrl}/maintenance-expenses`, 
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

// Add a new maintenance expense
export const addMaintenanceExpense = createAsyncThunk(
  'maintenance/addMaintenanceExpense',
  async (expenseData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiUrl}/maintenance`, expenseData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing maintenance expense
export const updateMaintenanceExpense = createAsyncThunk(
  'maintenance/updateMaintenanceExpense',
  async ({ expenseId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${config.apiUrl}/maintenance/${expenseId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete an maintenance expense
export const deleteMaintenanceExpense = createAsyncThunk(
  'maintenance/deleteMaintenanceExpense',
  async (expenseId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/maintenance/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return expenseId; // Return the expenseId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const maintenanceSlice = createSlice({
  name: 'maintenance',
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
      // Get all maintenance expenses
      .addCase(fetchMaintenanceExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.totalBillAmount = action.payload.totalBillAmount;
      })
      .addCase(fetchMaintenanceExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new maintenance expense
.addCase(addMaintenanceExpense.fulfilled, (state, action) => {
  state.expenses.push(action.payload);
})

// Update an existing maintenance expense
.addCase(updateMaintenanceExpense.fulfilled, (state, action) => {
  const index = state.expenses.findIndex(
    (expense) => expense.maintenanceExpenseId === action.meta.arg.expenseId
  );
  if (index !== -1) {
    state.expenses[index] = { ...state.expenses[index], ...action.meta.arg.updatedData };
  }
})

// Delete a maintenance expense
.addCase(deleteMaintenanceExpense.fulfilled, (state, action) => {
  state.expenses = state.expenses.filter((expense) => expense.maintenanceExpenseId !== action.payload);
});
  },
});

export default maintenanceSlice.reducer;