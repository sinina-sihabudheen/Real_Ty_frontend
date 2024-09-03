
import { loginUser, googleLoginUser, 
  registerUser, verifyOtp, resendOtp, 
  fetchRegions, fetchUserData, resetPassword,
  passwordChange, fetchAmenities, getResidentialPropertyDetails,
  updateUser, forgotPassword, 
  fetchSellerLands, getLandPropertyDetails,
  fetchSellerResidents, updateResidentialProperty, 
  updateLandProperty, createSubscription,
  checkSubscriptionStatus,
  deleteLandProperty,
  deleteResidentialProperty,
  fetchSellerProfile,
  fetchSellerProfileLands,
  fetchSellerProfileResidents} from './api';
import { loginSuccess } from '../redux/authSlice';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';



export const handleLogin = async (email, password, dispatch, navigate) => {
  try {
    const response = await loginUser(email, password);
  
    if(response.data.error){
      toast.error("errr")
      return
    }
    console.log(response);
    const { access, refresh, role } = response.data;
    const decodedToken = jwtDecode(access);
    const user = {
      id: decodedToken.user_id,
      email: decodedToken.email,
    };

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('role', JSON.stringify(role));
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Token stored in localStorage');  

    if (role != 'admin') {
        dispatch(loginSuccess({ access, refresh, role, user }));
        toast.success('Login Successful');
        navigate('/');
        }  

    else {
          toast.error('Admin login is not allowed from this portal');
          navigate('/login'); 
        }   

  } catch (error) {
    console.log(error);
      if (error){
        toast.error(`Login Failed: ${error.message}`);
      }
      console.error('ERROR', error);
  }
};


export const handleGoogleLogin = async (idToken, dispatch, navigate) => {
  try {
    const { access, refresh, role } = await googleLoginUser(idToken);
    
    console.log("Access Token:", access);

    if (typeof access !== 'string') {
      throw new Error('Invalid token format');
    }

    const decodedToken = jwtDecode(access);
    const user = {
      id: decodedToken.user_id,
      email: decodedToken.email,
    };
    console.log("ACCESSED",user);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('role', JSON.stringify(role));
    localStorage.setItem('user', JSON.stringify(user));

    console.log('Token stored in localStorage');

    if (Array.isArray(role) && role.includes('admin')) {
      toast.error('Admin login is not allowed from this portal');
      navigate('/login');
    } else {
      dispatch(loginSuccess({ access, refresh, role, user }));
      toast.success('Login Successful');
      navigate('/');
    }
  
    if (Array.isArray(role) && role.includes('admin')) {
      toast.error('Admin login is not allowed from this portal');
      navigate('/login');
    } else {
      dispatch(loginSuccess({ access, refresh, role, user }));
      toast.success('Login Successful');
      navigate('/');
    }
  } catch (error) {
    console.log(error);
      if (error){
        toast.error(`Login Failed: ${error.message}`);
      }
      console.error('ERROR', error);
  }
};

export const handleRegister = async (postData, setOtpSent, setOtpExpired, setErrors) => {
  try {
    const response = await registerUser(postData);
    console.log("USERNAME:", postData.username);
    setOtpSent(true);
    setOtpExpired(false);
    toast.success('Otp sent to the mail..');
  }
  catch (error) {
    console.log("QQQQQQ");
    console.log('Server error Response:', error);

    if (error) {
      console.error('Server Response:', error.errors);
      const errors = error.errors || {};
      setErrors(errors);
      for (const [field, messages] of Object.entries(errors)) {
       
          if (Array.isArray(messages)) {
            toast.error(`${field}: ${messages.join(' ')}`);
          } else {
            toast.error(`${field}: ${messages}`);
          }
      }
    } else if (error.request) {
      console.error('Request Error:', error.request);
      toast.error('Error registering: No response from server.');
    } else {
      console.error('Error:', error.message);
      toast.error(`Error registering: ${error.message}`);
    }
  }
};


export const handleVerifyOtp = async (email, otp, navigate) => {
        
        try {
            const response = await verifyOtp(email, otp);
               
            console.log(response.data.success);
            if(response.data.success=true){
            toast.success(response.data.message);
            navigate('/login')

            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(' Please try again..',error.message);
        }
    };
export const handleResendOtp = async (email, setOtpExpired, setOtp) => {
        try {
            await resendOtp(email);
            toast.success("Successfull sending of otp");
            setOtpExpired(false);
            setOtp('');
        } catch (error) {
            toast.error('Error resending OTP: Please try again.');
        }
    };


export const handleGoogleRegister = async (credentialResponse, navigate) => {
  try {
    const response = await googleLoginUser(credentialResponse.credential);
    const { access, refresh, user } = response.data;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
    toast.success('Google Registration Successful.');
  } catch (error) {
    console.error(error);
    toast.error('Google Registration Failed: Please try again.');
  }
};

// Fetch Regions Handler
export const handleFetchRegions = async (setRegions) => {
  try {
    const response = await fetchRegions();
    setRegions(response.data);
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
};

//Fetch amenity handler
export const handleFetchAmenity = async (setAmenities) => {
  try {
    const response = await fetchAmenities();
    setAmenities(response.data);
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
};


// Fetch User Data Handler
export const handleFetchUserData = async (setUser, setIsLoading, setError) => {
  try {
    const response = await fetchUserData();
    setUser(response.data);
    setIsLoading(false);
  } catch (error) {
    setError('Error fetching user data');
    setIsLoading(false);
  }
};


export const handleFetchSellerProfile = async (userId) => {
  try {
    const response = await fetchSellerProfile(userId);
    return response
  } catch (error) {
    toast.error(error.message);
    throw error; 
  }
};
export const handleFetchSellerProfileLands = async (userId,setLands) => {
  try {
    const response = await fetchSellerProfileLands(userId);
    setLands(response.data)
    // return response
  } catch (error) {
    toast.error(error.message);
    throw error; 
  }
};
export const handleFetchSellerProfileResidents = async (userId,setResidents) => {
  try {
    const response = await fetchSellerProfileResidents(userId);
    setResidents(response.data)
    // return response
  } catch (error) {
    toast.error(error.message);
    throw error; 
  }
};

export const changeUserPassword = async (data) => {
  const response = await passwordChange(data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateUserProfile = async (formData) => {
  const response = await updateUser(formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


  export const handleResetPassword = async (postData, setOtpSent, setOtpExpired) => {
    try {
      const response = await forgotPassword(postData);
      toast.success('OTP sent to the mail..');
      setOtpSent(true);
      setOtpExpired(false);
    } catch (error) {
      if (error.response) {
        console.error('Server Response:', error.response.data);
        const { email } = error.response.data;
        if (email) {
          toast.error(`Email error: ${email[0]}`);
        }
      } else if (error.request) {
        console.error('Request Error:', error.request);
        toast.error('Error: No response from server.');
      } else {
        console.error('Error:', error.message);
        toast.error('Error: Please try again..');
      }
    }
  };

  export const handleNewPasswordSet = async (postData) => {
    try {
      const response = await resetPassword(postData);
      toast.success('Password reset successfully.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error resetting password.');
    }
  };

//Fetch seller's lands handler
export const handleFetchSellerLands = async (setLands) => {
  try {
    const response = await fetchSellerLands();
    setLands(response.data);
  } catch (error) {
    console.error('Error fetching seller lands :', error);
  }
};

export const handleFetchSellerResidents = async (setResidents) => {
  try {
    const response = await fetchSellerResidents();
    console.log(("DATA RESIDENTS",response.data));
    setResidents(response.data);
  } catch (error) {
    console.error('Error fetching seller residents :', error);
}
};

export const handleLandPropertyDetails = async (propertyId) => {
  try {
    console.log("Calling api");
    const response = await getLandPropertyDetails(propertyId);
    console.log("handled calling api")
    return response.data;
  } catch (error) {
    console.error('Failed to fetch land property details:', error);
    throw error; 
  }
};

export const handleResidentialPropertyDetails = async (propertyId) => {
  try {
    const response = await getResidentialPropertyDetails(propertyId);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch residential property details:', error);
    throw error; 
  }
};


export const handleUpdateLandProperty = async (propertyId, propertyData) => {
  try {
    const formData = new FormData();
    for (const key in propertyData) {
      if (propertyData[key] !== undefined && propertyData[key] !== null) {
        formData.append(key, propertyData[key]);
      }
    }

    const response = await updateLandProperty(propertyId, formData, {
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


export const handleUpdateResidentialProperty = async (propertyId, propertyData) => {
  try {
    const formData = new FormData();
    for (const key in propertyData) {
      if (propertyData[key] !== undefined && propertyData[key] !== null) {
        formData.append(key, propertyData[key]);
      }
    }

    const response = await updateResidentialProperty(propertyId, formData, {
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



export const handleDeleteLandProperty = async (regionId) => {
  try {
    const response = await deleteLandProperty(regionId);
    toast.success('Deletion successful');
    return response;
  } catch (error) {
    console.error('Error deleting property:', error);
    toast.error('Property deleting error..');
  }
};


export const handleDeleteResidentialProperty = async (regionId) => {
  try {
    const response = await deleteResidentialProperty(regionId);
    toast.success('Deletion successful');
    return response;
  } catch (error) {
    console.error('Error deleting property:', error);
    toast.error('Property deleting error..');
  }
};

export const handleCheckSubscriptionStatus = async (
  userId, setSubscriptionId, setSubscriptionStatus, setSubscriptionExpired, setListingCount, setDaysLeft, 
  setSubscriptionType, setPaymentPlan) => {
  try {
    const response = await checkSubscriptionStatus(userId);
    setSubscriptionStatus(response.data.isSubscribed);
    setSubscriptionExpired(response.data.subscriptionExpired);
    setListingCount(response.data.propertyCount);
    setDaysLeft(response.data.daysLeft);
    setSubscriptionType(response.data.subscriptionType);
    setPaymentPlan(response.data.paymentPlan);
    setSubscriptionId(response.data.subscriptionId);
   
  } catch (error) {
    console.error('Error checking subscription status of the user:', error);
  }
};

export const handleCreateSubscription = async (subscriptionData) => {
  try {
   
    const response = await createSubscription(subscriptionData);
    const { checkout_session_id } = response.data;
    // Redirect to Stripe Checkout
    const stripe = await loadStripe('pk_test_51PeAv3GYaADgjXW8SBDpSToR8TtuB29Hi5loSI4lQpi3zDc7zpZxrZiYxv6EDHiMffNmvsebBgpx0cCAyxLHiiDV00Xz1y0bpm'); // Your key is already provided in main.jsx
    const { error } = await stripe.redirectToCheckout({ sessionId: checkout_session_id });
    
    if (error) {
      toast.error('Error redirecting to Checkout.');
      console.error('Error redirecting to Checkout:', error);
    }
  } catch (error) {
    console.error('Failed to create subscription:', error);
    if (error.response) {
      toast.error(`Error: ${error.response.data.error}`);
    } else if (error.request) {
      toast.error('No response from server.');
    } else {
      toast.error('An error occurred. Please try again.');
    }
    throw error; 
  }
};