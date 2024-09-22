
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import jobReducer from './jobSlice';
import blogReducer from './blogSlice';
import eventsReducer from './eventsSlice'; 
import jobSeekerPostsReducer from './jobSeekerPostsSlice';
import uiReducer from './uiSlice';
import chartsReducer from './chartsSlice';
// Create the Redux store
const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    profile: profileReducer,
    jobs: jobReducer,
    blogs: blogReducer,
    events: eventsReducer, 
    jobSeekerPosts: jobSeekerPostsReducer,
    charts: chartsReducer,
  },
});

export default store;