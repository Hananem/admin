// src/features/jobs/jobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (page = 1) => {
  const response = await axios.get(`http://localhost:4000/api/jobs/all?page=${page}`);
  return response.data;
});

// Fetch job by ID thunk (already exists)
export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addJob = createAsyncThunk(
  'jobs/addJob',
  async ({ jobData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/jobs/postJob', jobData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token, // Include the token in the headers
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, jobData }) => {
  const response = await axios.put(`http://localhost:4000/api/jobs/${id}`, jobData);
  return response.data;
});
// Logo update thunk
export const updateJobLogo = createAsyncThunk(
  'jobs/updateJobLogo',
  async ({ id, logoFile, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('logo', logoFile);

      const response = await axios.post(`http://localhost:4000/api/jobs/${id}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id, { getState }) => {
    try {
      const { user } = getState().user;
      const response = await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete job');
    }
  }
);

export const fetchFilteredJobs = createAsyncThunk(
  'jobs/fetchFilteredJobs',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/api/jobs/filter', { params: filters });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    selectedJob: null,
    totalPages: 1,
    currentPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload.jobs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
      })
      .addCase(addJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = state.jobs.filter(job => job._id !== action.meta.arg); // Filter out the deleted job
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateJobLogo.fulfilled, (state, action) => {
        if (state.selectedJob) {
          state.selectedJob.company.logo = action.payload.company.logo;
        }
      })
       .addCase(fetchFilteredJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchFilteredJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



export default jobSlice.reducer;