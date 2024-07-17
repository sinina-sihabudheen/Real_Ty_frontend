
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminAuthenticated: !!localStorage.getItem('access') && localStorage.getItem('role') === 'admin',
  adminUser: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')) : null,
  adminRole: localStorage.getItem('role') === 'admin' ? 'admin' : null,
  adminAccess: localStorage.getItem('access') || null,
  adminRefresh: localStorage.getItem('refresh') || null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLoginSuccess(state, action) {
      state.isAdminAuthenticated = true;
      state.adminUser = action.payload.adminUser;
      state.adminRole = 'admin'; 
      state.adminAccess = action.payload.access;
      state.adminRefresh = action.payload.refresh;

      // Store in localStorage
      localStorage.setItem('access', action.payload.access);
      localStorage.setItem('refresh', action.payload.refresh);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('adminUser', JSON.stringify(action.payload.adminUser));
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false;
      state.adminUser = null;
      state.adminRole = null;
      state.adminAccess = null;
      state.adminRefresh = null;

      // Clear localStorage
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('role');
      localStorage.removeItem('adminUser');
    },
  },
});

export const { adminLoginSuccess, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
