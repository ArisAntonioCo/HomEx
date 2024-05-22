// foodSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all food expenses
export const fetchFoodExpenses = createAsyncThunk(
  'food/fetchFoodExpenses', 
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.apiUrl}/food-expenses`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

// Add a new food expense
export const addFoodExpense = createAsyncThunk(
  'food/addFoodExpense',
  async (expenseData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiUrl}/food`, expenseData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing food expense
export const updateFoodExpense = createAsyncThunk(
  'food/updateFoodExpense',
  async ({ expenseId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${config.apiUrl}/food/${expenseId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete an food expense
export const deleteFoodExpense = createAsyncThunk(
  'food/deleteFoodExpense',
  async (expenseId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/food/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return expenseId; // Return the expenseId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const foodSlice = createSlice({
  name: 'food',
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
      // Get all food expenses
      .addCase(fetchFoodExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.totalBillAmount = action.payload.totalBillAmount;
      })
      .addCase(fetchFoodExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new food expense
.addCase(addFoodExpense.fulfilled, (state, action) => {
  state.expenses.push(action.payload);
})

// Update an existing food expense
.addCase(updateFoodExpense.fulfilled, (state, action) => {
  const index = state.expenses.findIndex(
    (expense) => expense.foodExpenseId === action.meta.arg.expenseId
  );
  if (index !== -1) {
    state.expenses[index] = { ...state.expenses[index], ...action.meta.arg.updatedData };
  }
})

// Delete a food expense
.addCase(deleteFoodExpense.fulfilled, (state, action) => {
  state.expenses = state.expenses.filter((expense) => expense.foodExpenseId !== action.payload);
});
  },
});

export default foodSlice.reducer;