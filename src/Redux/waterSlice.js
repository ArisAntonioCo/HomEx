// waterSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

// Async Thunks

// Fetch all water expenses
export const fetchWaterExpenses = createAsyncThunk(
  'water/fetchWaterExpenses', 
  async ({ startDate, endDate }, thunkAPI) => { 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${config.apiUrl}/water-expenses`, 
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

// Add a new water expense
export const addWaterExpense = createAsyncThunk(
  "water/addWaterExpense",
  async (expenseData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${config.apiUrl}/water`, expenseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing water expense
export const updateWaterExpense = createAsyncThunk(
  "water/updateWaterExpense",
  async ({ expenseId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${config.apiUrl}/water/${expenseId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete an water expense
export const deleteWaterExpense = createAsyncThunk(
  "water/deleteWaterExpense",
  async (expenseId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.apiUrl}/water/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return expenseId; // Return the expenseId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const waterSlice = createSlice({
  name: "water",
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
      // Get all water expenses
      .addCase(fetchWaterExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.totalBillAmount = action.payload.totalBillAmount;
      })
      .addCase(fetchWaterExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new water expense
      .addCase(addWaterExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })

      // Update an existing water expense
      .addCase(updateWaterExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.waterExpenseId === action.meta.arg.expenseId
        );
        if (index !== -1) {
          state.expenses[index] = {
            ...state.expenses[index],
            ...action.meta.arg.updatedData,
          };
        }
      })

      // Delete an water expense
      .addCase(deleteWaterExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.waterExpenseId !== action.payload
        );
      });
  },
});

export default waterSlice.reducer;
