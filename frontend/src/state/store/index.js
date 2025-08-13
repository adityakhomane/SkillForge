import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});