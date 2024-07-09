import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminAuthReducer,
  },
});

export default store;