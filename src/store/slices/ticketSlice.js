import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.instance";

const API_URL = import.meta.env.VITE_API_URL;

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${API_URL}/tickets`, payload);
      return data;
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
        return rejectWithValue("Failed to login user");
      }
    }
  }
);

export const getUserSubmittedTickets = createAsyncThunk(
  "tickets/getUserSubmittedTickets",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${API_URL}/tickets/me`, {
        params: { page, limit },
      });
      return data;
    } catch (error) {
      if (error.response && error.response && error.response.message) {
        const message = error.response.data.message.message;
        Array.isArray(message)
          ? rejectWithValue(message[0])
          : rejectWithValue(message);
      } else if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Failed to create user");
      }
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    ticketId: null,
    createTicketError: null,
    getTicketListError: null,
    isLoading: false,
    successMessage: "",
    tickets: [],
    totaItems: [],
    currentPage: 1,
    limit: 5,
  },
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.createTicketError = null;
      state.getTicketListError = null;
      state.successMessage = "";
    },
    setPage: (state, action) => {
      state.currentPage = action.payload; // Update page number
    },
    setLimit: (state, action) => {
      state.limit = action.payload; // Update limit per page
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ticketId = action.payload;
      state.createTicketError = null;
      state.successMessage = "Ticket created successfully";
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.createTicketError = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserSubmittedTickets.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserSubmittedTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload.tickets; // Storing fetched tickets
      state.totalItems = action.payload.total; // Storing total tickets count
      state.currentPage = action.payload.page; // Storing current page from API
      state.limit = action.payload.limit; // Storing limit from API
      state.getTicketListError = null;
    })
    .addCase(getUserSubmittedTickets.rejected, (state, action) => {
      state.getTicketListError = action.payload;
      state.isLoading = false;
    });
  },
});

export const { resetStatus, setPage, setLimit } = ticketSlice.actions;
export default ticketSlice.reducer;
