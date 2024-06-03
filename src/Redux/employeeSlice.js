// employeeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees', 
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${config.apiUrl}/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // Add other headers here
        },
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

// Add a new employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employeeData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${config.apiUrl}/employee`, employeeData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // Add other headers here
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing employee
export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ employeeId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${config.apiUrl}/employee/${employeeId}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // Add other headers here
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (employeeId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`${config.apiUrl}/employee/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // Add other headers here
        },
      });
      return employeeId; // Return the employeeId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    totalEmployees: 0,
    departmentCounts: {},
    jobTitleCounts: {},
    loading: false,
    error: null,
  },
  reducers: {
    // You can add any synchronous reducers here if needed (e.g., to filter employees)
  },
  extraReducers: (builder) => {
    builder
      // Get all employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.totalEmployees = action.payload.totalEmployees;
        state.departmentCounts = action.payload.departmentCounts;
        state.jobTitleCounts = action.payload.jobTitleCounts;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // Update an existing employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee.employee_id === action.meta.arg.employeeId
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      // Delete an employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee.employee_id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;