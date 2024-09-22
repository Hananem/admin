// src/redux/slices/chartsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/charts'; // Adjust API URL if necessary

// Thunks for fetching chart data
export const fetchJobViewsByType = createAsyncThunk('charts/fetchJobViewsByType', async () => {
  const response = await axios.get(`${API_URL}/views/by-type`);
  return response.data;
});

export const fetchJobPostingsByCompany = createAsyncThunk('charts/fetchJobPostingsByCompany', async () => {
  const response = await axios.get(`${API_URL}/postings/by-company`);
  console.log(response.data)
  return response.data;
});

export const fetchJobApplicationsByType = createAsyncThunk('charts/fetchJobApplicationsByType', async () => {
  const response = await axios.get(`${API_URL}/applications-by-job-type`);
  return response.data;
});

export const fetchUserRegistrationsOverTime = createAsyncThunk('charts/fetchUserRegistrationsOverTime', async () => {
  const response = await axios.get(`${API_URL}/registrations/over-time`);
  return response.data;
});

export const fetchJobSeekerPostsByExperienceLevel = createAsyncThunk('charts/fetchJobSeekerPostsByExperienceLevel', async () => {
  const response = await axios.get(`${API_URL}/posts-by-experience-level`);
  return response.data;
});

export const fetchJobViewsOverTime = createAsyncThunk('charts/fetchJobViewsOverTime', async () => {
  const response = await axios.get(`${API_URL}/jobs/views/time`);
  return response.data;
});

export const fetchPostsByTime = createAsyncThunk('charts/fetchPostsByTime', async (period) => {
  const response = await axios.get(`${API_URL}/posts-by-time`, { params: { period } });
  return response.data;
});

// Slice for chart data
const chartsSlice = createSlice({
  name: 'charts',
  initialState: {
    jobViewsByType: [],
    jobPostingsByCompany: [],
    jobApplicationsByType: [],
    userRegistrationsOverTime: [],
    jobSeekerPostsByExperienceLevel: [],
    jobViewsOverTime: [],
    postsByTime: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobViewsByType.fulfilled, (state, action) => {
        state.jobViewsByType = action.payload;
      })
      .addCase(fetchJobPostingsByCompany.fulfilled, (state, action) => {
        state.jobPostingsByCompany = action.payload;
      })
      .addCase(fetchJobApplicationsByType.fulfilled, (state, action) => {
        state.jobApplicationsByType = action.payload;
      })
      .addCase(fetchUserRegistrationsOverTime.fulfilled, (state, action) => {
        state.userRegistrationsOverTime = action.payload;
      })
      .addCase(fetchJobSeekerPostsByExperienceLevel.fulfilled, (state, action) => {
        state.jobSeekerPostsByExperienceLevel = action.payload;
      })
      .addCase(fetchJobViewsOverTime.fulfilled, (state, action) => {
        state.jobViewsOverTime = action.payload;
      })
      .addCase(fetchPostsByTime.fulfilled, (state, action) => {
        state.postsByTime = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('charts/fetch') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('charts/fetch') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('charts/fetch') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default chartsSlice.reducer;
