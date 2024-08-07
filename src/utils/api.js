
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  withCredentials: true,
});

// Request interceptor to add token to headers
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

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Response error:', error.response);
      // Handle unauthorized error by redirecting to login page
      if (error.response.status === 401) {
        // Optionally clear the token from localStorage and redirect to login
        localStorage.removeItem('access');
        window.location.href = '/login'; // Redirect to your login route
      }
      return Promise.reject(error.response.data); // Return the error response data
    } else if (error.request) {
      console.error('Request error:', error.request);
      return Promise.reject(error.request);
    } else {
      console.error('Error:', error.message);
      return Promise.reject(error.message);
    }
  }
);




export const loginUser = async (email, password) => {

    const response = await api.post('/api/auth/login/', { email, password });
    return response;
 
};
export const loginAdmin = (email, password) => {
  return api.post('/api/admin-login/', { email, password });
};

export const googleLoginUser = async (idToken) => {
  try {
    const response = await api.post('/api/auth/google/', { token: idToken.credential });
    console.log("RESPONSE data",response);

    return response.data
  } catch (error) {
    console.error('Login failed', error.response.data);
  }

};

  
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

export const fetchSellerDetails = (sellerId) => {
  return api.get(`/api/seller/${sellerId}/`);
};


export const updateUser = (formData) => {
  return api.put('/api/update-user/', formData);
};


export const passwordChange = (data) => {
  return api.post('/api/change-password/', data);
};

export const updateUserRole = (data) => {
  return api.put('/api/update-role/', data)
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

// Create land property
export const createLandProperty = async (propertyData) => {
  const response = await api.post('/api/register-lands/', propertyData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  );
  return response.data;
};

// Create residential property
export const createResidentialProperty = async (propertyData) => {
  const response = await api.post('/api/register-residentials/', propertyData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  );
  return response.data;
};

export const fetchAmenities = () => {
  return api.get('/api/amenity/');
};

// Update an existing land property
export const updateLandProperty = async (propertyId, propertyData) => {
  try {
    const formData = new FormData();
    for (const key in propertyData) {
      if (propertyData[key] !== undefined && propertyData[key] !== null) {
        formData.append(key, propertyData[key]);
      }
    }

    const response = await api.put(`/api/lands/${propertyId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update land property:', error);
    throw error; 
  }
};

// Update an existing residential property
export const updateResidentialProperty = async (propertyId, propertyData) => {
  try {
    const formData = new FormData();
    for (const key in propertyData) {
      if (propertyData[key] !== undefined && propertyData[key] !== null) {
        formData.append(key, propertyData[key]);
      }
    }

    const response = await api.put(`/api/residentials/${propertyId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update residential property:', error);
    throw error; 
  }
};


export const fetchSellerLands = () => {
  return api.get('/api/seller-lands');
};

export const fetchSellerResidents = () => {
  return api.get('api/seller-residents');
};


export const fetchResidentsList = () => {
  return api.get('api/residentslist');
};


export const fetchLandsList = () => {
  return api.get('api/landslist');
};

// Get the details of a specific land property
export const getLandPropertyDetails = (propertyId) => {
  console.log("api called ",propertyId);
  const data = api.get(`/api/lands/${propertyId}/`);
  return data
};

// Get the details of a specific residential property
export const getResidentialPropertyDetails = (propertyId) => {
  return api.get(`/api/residentials/${propertyId}/`);  
};


export const checkSubscriptionStatus = async (userId) => {
  return api.get(`/payments/check-subscription/${userId}/`);
};

// Create subscription API function
export const createSubscription = (subscriptionData) => {
  return api.post('/payments/create-subscription/', subscriptionData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Cancel a subscription
export const cancelSubscription = async () => {
  const response = await api.post('/payments/cancel-subscription/');
  return response.data;
};



// Retrieve Stripe session details
export const getSessionDetails = async (sessionId) => {
  const response = await api.get(`/payments/stripe/session/${sessionId}/`);
  return response.data;
};



export default api;