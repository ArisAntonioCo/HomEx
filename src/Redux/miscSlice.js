// miscellaneousSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

// Async Thunks

// Fetch all miscellaneous expenses
export const fetchMiscellaneousExpenses = createAsyncThunk(
  "miscellaneous/fetchMiscellaneousExpenses",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${config.apiUrl}/miscellaneous-expenses`,
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

// Add a new miscellaneous expense
export const addMiscellaneousExpense = createAsyncThunk(
  "miscellaneous/addMiscellaneousExpense",
  async (expenseData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.apiUrl}/miscellaneous`,
        expenseData,
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

// Update an existing miscellaneous expense
export const updateMiscellaneousExpense = createAsyncThunk(
  "miscellaneous/updateMiscellaneousExpense",
  async ({ expenseId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${config.apiUrl}/miscellaneous/${expenseId}`,
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

// Delete an miscellaneous expense
export const deleteMiscellaneousExpense = createAsyncThunk(
  "miscellaneous/deleteMiscellaneousExpense",
  async (expenseId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.apiUrl}/miscellaneous/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return expenseId; // Return the expenseId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const miscellaneousSlice = createSlice({
  name: "miscellaneous",
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
      // Get all miscellaneous expenses
      .addCase(fetchMiscellaneousExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiscellaneousExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.totalBillAmount = action.payload.totalBillAmount;
      })
      .addCase(fetchMiscellaneousExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new miscellaneous expense
      .addCase(addMiscellaneousExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })

      // Update an existing miscellaneous expense
      .addCase(updateMiscellaneousExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) =>
            expense.miscellaneousExpenseId === action.meta.arg.expenseId
        );
        if (index !== -1) {
          state.expenses[index] = {
            ...state.expenses[index],
            ...action.meta.arg.updatedData,
          };
        }
      })

      // Delete a miscellaneous expense
      .addCase(deleteMiscellaneousExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.miscellaneousExpenseId !== action.payload
        );
      });
  },
});

export default miscellaneousSlice.reducer;
