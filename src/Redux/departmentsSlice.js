
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all departments
export const fetchDepartments = createAsyncThunk(
  'departments/fetchDepartments', 
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.apiUrl}/departments`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

// Add a new department
export const addDepartment = createAsyncThunk(
  'departments/addDepartment',
  async (departmentData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiUrl}/department`, departmentData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing department
export const updateDepartment = createAsyncThunk(
  'departments/updateDepartment',
  async ({ deptId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${config.apiUrl}/department/${deptId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a department
export const deleteDepartment = createAsyncThunk(
  'departments/deleteDepartment',
  async (deptId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/department/${deptId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return deptId; // Return the deptId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const departmentsSlice = createSlice({
  name: 'departments',
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add any synchronous reducers here if needed (e.g., to filter departments)
  },
  extraReducers: (builder) => {
    builder
      // Get all departments
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.departments;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new department
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload.department);
      })

      // Update an existing department
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex(
          (department) => department.deptId === action.meta.arg.deptId
        );
        if (index !== -1) {
          state.departments[index] = action.meta.arg.updatedData;
        }
      })

      // Delete a department
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter((department) => department.deptId !== action.payload);
      });
  },
});

export default departmentsSlice.reducer;