
import { loginUser, googleLoginUser, registerUser, verifyOtp, resendOtp, fetchRegions, fetchUserData } from './api';
import { loginSuccess } from '../redux/authSlice';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'sonner';

export const handleLogin = async (email, password, dispatch, navigate) => {
  try {
    const response = await loginUser(email, password);
    const { access, refresh, role } = response.data;

    const decodedToken = jwtDecode(access);
    const user = {
      id: decodedToken.user_id,
      email: decodedToken.email,
    };

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(loginSuccess({ access, refresh, role, user }));
   

    if (role != 'admin') {
        navigate('/');
        }  
    else {
            navigate('/login'); 
        }   
    toast.success('Login Successful');
  } catch (error) {
    console.error(error);
    toast.error('Login Failed: Please try again');
  }
};

export const handleGoogleLogin = async (credentialResponse, dispatch, navigate) => {
  try {
    const response = await googleLoginUser(credentialResponse.credential);
    const { access, refresh, user } = response.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(loginSuccess(user));
    navigate('/');
    toast.success('Google Login Successful');
  } catch (error) {
    console.error(error);
    toast.error('Google Login Failed: Please try again');
  }
};


export const handleRegister = async (postData, setOtpSent, setOtpExpired) => {
  try {
    const response = await registerUser(postData);
    console.log("USERNAME:", postData.username);
    toast.success('Otp sent to the mail..');
    setOtpSent(true);
    setOtpExpired(false);
  } catch (error) {
    if (error.response) {
      console.error('Server Response:', error.response.data);
      const { email } = error.response.data;
      if (email) {
        alert(`Email error: ${email[0]}`);
        toast.error(`Email error: ${email[0]}`);
      }
    } else if (error.request) {
      console.error('Request Error:', error.request);
      toast.error('Error registering: No response from server.');
    } else {
      console.error('Error:', error.message);
      toast.error('Error registering: Please try again..');
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
            toast.error(' Please try again..');

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