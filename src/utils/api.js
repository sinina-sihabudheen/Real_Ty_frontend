
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

// api.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// );

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


export const updateUserProfile = async (formData) => {
  const response = await axios.put('/api/update-user/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const changeUserPassword = async (data) => {
  const response = await axios.post('/api/change-password/', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default api;