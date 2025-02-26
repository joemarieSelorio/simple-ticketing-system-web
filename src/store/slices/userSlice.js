import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.instance";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = createAsyncThunk(
  "users",
  async ({ role }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosInstance.get(
        `${API_URL}/users?roles=${encodeURIComponent(role)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("dataa: ", JSON.stringify(data.users));
      return data.users;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message.message);
      } else if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Failed to fetch user list");
      }
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.users = [];
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userList = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
