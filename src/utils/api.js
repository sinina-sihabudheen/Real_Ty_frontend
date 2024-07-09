
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
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
  error => Promise.reject(error)
);

export const loginUser = (email, password) => {
  return api.post('/api/auth/login/', { email, password });
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


export default api;