import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/events';


export const fetchAllEvents = createAsyncThunk(
  'events/fetchAllEvents',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`, { params: { page, limit } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addEvent = createAsyncThunk('events/addEvent', async ({ eventData, token }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('description', eventData.description);
    formData.append('date', eventData.date);
    formData.append('location', eventData.location);
    formData.append('companyName', eventData.companyName);

    if (eventData.logo) {
      formData.append('logo', eventData.logo);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, eventData, token }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateEventLogo = createAsyncThunk('events/updateEventLogo', async ({ id, logo, token }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('logo', logo);

    const response = await axios.patch(`${API_URL}/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async ({ id, token }, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for filtering events
export const filterEvents = createAsyncThunk(
  'events/filterEvents',
  async ({ title, location, company, date, page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/filter`, {
        params: { title, location, company, date, page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllEvents.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllEvents.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.events = action.payload.events;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    })
    .addCase(fetchAllEvents.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Failed to fetch events';
    })
      .addCase(addEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateEventLogo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEventLogo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEventLogo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = state.events.filter(event => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    

      .addCase(filterEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload.events;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(filterEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch events';
      });
  },
});

export default eventsSlice.reducer;
