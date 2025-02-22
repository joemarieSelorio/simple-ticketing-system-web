import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
      const accessToken = data?.data?.access_token;
      localStorage.setItem("token", accessToken); // Store token
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message.message);
      } else if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Failed to login user");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: !!localStorage.getItem("token"),
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.isSignedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isSignedIn = false;
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isSignedIn = true;
      state.isLoading = false;
      state.error = null;
      state.email = null;
      state.password = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;
