// jobTitleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config'; 

// Async Thunks

// Fetch all job titles
export const fetchJobTitles = createAsyncThunk(
  'jobTitle/fetchJobTitles', 
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.apiUrl}/job-titles`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

// Add a new job title
export const addJobTitle = createAsyncThunk(
  'jobTitle/addJobTitle',
  async (jobTitleData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiUrl}/job-title`, jobTitleData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update an existing job title
export const updateJobTitle = createAsyncThunk(
  'jobTitle/updateJobTitle',
  async ({ jobId, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${config.apiUrl}/job-title/${jobId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a job title
export const deleteJobTitle = createAsyncThunk(
  'jobTitle/deleteJobTitle',
  async (jobId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/job-title/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      return jobId; // Return the jobId to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice Definition
const jobTitleSlice = createSlice({
  name: 'jobTitle',
  initialState: {
    jobTitles: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add any synchronous reducers here if needed (e.g., to filter job titles)
  },
  extraReducers: (builder) => {
    builder
      // Get all job titles
      .addCase(fetchJobTitles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobTitles.fulfilled, (state, action) => {
        state.loading = false;
        state.jobTitles = action.payload.jobTitles;
      })
      .addCase(fetchJobTitles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // or a generic error message
      })

      // Add a new job title
      .addCase(addJobTitle.fulfilled, (state, action) => {
        state.jobTitles.push(action.payload.jobId);
      })

      // Update an existing job title
      .addCase(updateJobTitle.fulfilled, (state, action) => {
        const index = state.jobTitles.findIndex(
          (jobTitle) => jobTitle.jobId === action.meta.arg.jobId
        );
        if (index !== -1) {
          state.jobTitles[index] = action.meta.arg.updatedData;
        }
      })

      // Delete a job title
      .addCase(deleteJobTitle.fulfilled, (state, action) => {
        state.jobTitles = state.jobTitles.filter((jobTitle) => jobTitle.jobId !== action.payload);
      });
  },
});

export default jobTitleSlice.reducer;