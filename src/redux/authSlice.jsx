
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access'), 
  user: JSON.parse(localStorage.getItem('user')) || null,
  role: localStorage.getItem('role') || null,
  access: localStorage.getItem('access') || null,
  refresh: localStorage.getItem('refresh') || null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
   

      // Store in localStorage
      localStorage.setItem('access', action.payload.access);
      localStorage.setItem('refresh', action.payload.refresh);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('user', JSON.stringify(action.payload.user));   
     
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.access = null;
      state.refresh = null;
    

      // Clear localStorage
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      
    },
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;
