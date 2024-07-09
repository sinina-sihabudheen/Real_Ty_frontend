
import { loginUser, fetchRegions, fetchUserData } from './api';
import { adminLoginSuccess } from '../redux/adminAuthSlice';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'sonner';

export const handleAdminLogin = async (email, password, dispatch, navigate) => {
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

    dispatch(adminLoginSuccess({ access, refresh, role, user }));
   
    if (role === 'admin') {
        navigate('/adminhomepage');
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