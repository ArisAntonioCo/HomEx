import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config"; // Import your config.js
// Async Thunks (for API calls)
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${config.apiUrl}/login`, userData); // Assuming your backend endpoint is '/login'
      return response.data; // Expected: { token: '...' }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Return error data from the backend
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${config.apiUrl}/signup`, userData);
      return response.data; // Expected: { token: '...' }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getUserData = createAsyncThunk("user/getUserData", async (_, thunkAPI) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) { 
          return thunkAPI.rejectWithValue({ error: "Unauthorized" });
      }
      
      const response = await axios.get(`${config.apiUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response from /user:", response.data); // Log the response data
      
      return response.data;
  } catch (error) {
      console.error("Error in getUserData:", error); // Log the error for debugging
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          thunkAPI.dispatch(logoutUser());
          return thunkAPI.rejectWithValue({ error: "Unauthorized" });
      }
      return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice Definition
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    credentials: {}, // Store user data here
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.credentials = {};
      state.loading = false; // Reset loading state
      state.error = null; // Clear any previous errors
      localStorage.removeItem("token"); // Remove token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.credentials = action.payload; // Save user info // Store the token in local storage upon successful login
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Similar patterns for signupUser and getUserData
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.credentials = action.payload.credentials; // Assuming credentials is an object with handle
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
