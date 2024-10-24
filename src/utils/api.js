import api from './conf';
import { toast } from 'sonner';


 // headers: {
  //   'Content-Type': 'application/json',
  // },

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
      if (error.response.status === 401) {
        localStorage.removeItem('access');
        window.location.href = '/login'; 
      }
      return Promise.reject(error.response.data); 
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



export const fetchUserData = () => {
  return api.get('/api/user/');
};

export const fetchSellerProfile = async (userId) => {
  return await api.get(`/api/sellerProfile/${userId}/`);
};

export const fetchSellerProfileLands = async (userId) => {
  return await api.get(`/api/seller-profile-lands/${userId}/`);
};

export const fetchSellerProfileResidents = async (userId) => {
  return await api.get(`/api/seller-profile-residents/${userId}/`);
};


export const updateUser = (formData) => {
  return api.put('/api/update-user/', formData);
};


export const passwordChange = (data) => {
  return api.post('/api/change-password/', data);
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



// Create land property
export const createLandProperty = async (propertyData) => {
  console.log("Entered into create lands");

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
  console.log("Entered into create residentials");
  const response = await api.post('/api/register-residentials/', propertyData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  );
  return response.data;
};



export const updateLandProperty = async (propertyId, propertyData) => {
  try {
    const response = await api.patch(`/api/lands/update/${propertyId}/`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to update land property:', error);
    throw error;
  }
};

export const updateResidentialProperty = async (propertyId, propertyData) => {
  try {
    const response = await api.patch(`/api/residentials/update/${propertyId}/`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to update residential property:', error);
    throw error;
  }
};


export const fetchSellerLands = () => {
  return api.get('/api/seller-lands/');
};

export const fetchSellerResidents = () => {
  return api.get('api/seller-residents/');
};


export const fetchResidentsList = () => {
  return api.get('api/residentslist/');
};


export const fetchLandsList = () => {
  return api.get('api/landslist/');
};

// Get the details of a specific land property
export const getLandPropertyDetails = (propertyId) => {
  const data = api.get(`/api/lands/${propertyId}/`);
  return data
};

// Get the details of a specific residential property
export const getResidentialPropertyDetails = (propertyId) => {
  return api.get(`/api/residentials/${propertyId}/`);  
};

// Get the details of a specific land property
export const deleteLandProperty = (propertyId) => {
  return response = api.delete(`/api/lands/delete/${propertyId}/`);
};

// Get the details of a specific residential property
export const deleteResidentialProperty = (propertyId) => {
  return api.delete(`/api/residentials/delete/${propertyId}/`);  
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

//For admin operations

export const adminDashboard = async () => {
  return await api.get('/api/admin-dashboard/')

};

export const fetchRegions = () => {
  return api.get('/api/regions/');
  
};


export const addRegion = async ({data})=> {
  const response = await api.post('/api/regions/add/',{data},
  {
    headers: {
    'Content-Type': 'application/json',
  },
}
  );
  return response;
};

export const deleteRegion = async(regionId)=> {
  const response = await api.delete(`/api/regions/${regionId}/delete/`);
  return response;
};


export const fetchAmenities = () => {
  return api.get('/api/amenity/');
};

export const addAmenity = async({name})=> {
  const response = await api.post('/api/amenities/add/',{name},
    {
      headers: {
        'Content-Type': 'application/json', 
      },
    }
  );
  return response;
};

export const deleteAmenity = async(amenityId)=> {
  const response = await api.delete(`/api/amenities/${amenityId}/delete/`);
  return response;
};


export const fetchCategory = () => {
  return api.get('/api/category/');
};

export const addCategory = async({name}) => {
  const response = await api.post('/api/categories/add/',{name},{
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return response;
};

export const deleteCategory = async(categoryId) => {
  const response = await api.delete(`/api/categories/${categoryId}/delete/`);
  return response;
};

export const blockUser = async (userId) => {
  const response = await api.patch(`/api/users/${userId}/block/`);
  return response;
};
export const unblockUser = async (userId) => {
  const response = await api.patch(`/api/users/${userId}/unblock/`);
  return response;
};

export const paymentInvoice = async (subscriptionId) => {
  const response = await api.get(`/payments/invoice/${subscriptionId}/`);
  return response;
}
export const subscriptionList = async () => {
  const response = await api.get('/api/premium-users/');
  return response;
}
export const revenueReport = async () => {
  const response = await api.get('/payments/revenue/');
  return response;
}


export default api;


