
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials:true,
  
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);



api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Response error:', error.response);
      return Promise.reject(error.response); 
    } else if (error.request) {
      console.error('Request error:', error.request);
      return Promise.reject(error.request); 
    } else {
      console.error('Error:', error.message);
      return Promise.reject(error.message); 
    }
  }
);

export const loginUser = (email, password) => {
  return api.post('/api/auth/login/', { email, password });
};
export const loginAdmin = (email, password) => {
  return api.post('/api/admin-login/', { email, password });
};

export const googleLoginUser = (credential) => {
  return api.post('/dj-rest-auth/google/', { code: credential }, {
    headers: { 'Content-Type': 'application/json' }
  });
};


// Register API functions
export const registerUser = (data) => {
  return api.post('/api/register/', data);
};

export const verifyOtp = (email, token) => {
  return api.post('/api/verify-otp/', { email, token });
};

export const resendOtp = (email) => {
  return api.post('/api/resend-otp/', { email });
};

export const fetchRegions = () => {
  return api.get('/api/regions/');
};


export const fetchUserData = () => {
  return api.get('/api/user/');
};


export const updateUser = (formData) => {
  return api.put('/api/update-user/', formData);
};


export const passwordChange = (data) => {
  return api.post('/api/change-password/', data);
};

export const updateUserRole = (data) => {
  return api.put('/api/upadate_role/', data)
};

export const forgotPassword = (data) => {
  return api.post('/api/forgot_password/', data)
};

export const resetPassword = (data) => {
  return api.post('/api/reset_password/', data);
};

export const fetchUsersData = () => {
  return api.get('/api/users_list/');
};

export const fetchSellersData = () => {
  return api.get('/api/sellers_list/');
};

export const fetchBuyersData = () => {
  return api.get('/api/buyers_list/');
};


export default api;