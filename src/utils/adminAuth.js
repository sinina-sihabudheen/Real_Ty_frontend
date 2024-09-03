
import { loginAdmin, fetchUserData, 
  fetchResidentsList, fetchLandsList, 
  fetchUsersData,blockUser,unblockUser,
  fetchRegions,addRegion,deleteRegion,
  fetchAmenities,addAmenity,deleteAmenity,
  fetchCategory,addCategory,deleteCategory,
  subscriptionList
  } from './api';
import { adminLoginSuccess } from '../redux/adminAuthSlice';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'sonner';

export const handleAdminLogin = async (email, password, dispatch, navigate) => {
  try {


    const response = await loginAdmin(email, password);

    const { access, refresh, role } = response.data;

    if (role !== 'admin') {
      throw new Error('Access Denied: Only admins can access this portal');
    }

    const decodedToken = jwtDecode(access);
    const adminUser = {
      id: decodedToken.user_id,
      email: decodedToken.email,
    };
    

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('role', role);
    localStorage.setItem('adminUser', JSON.stringify(adminUser));
    localStorage.setItem('admin', true); 

    dispatch(adminLoginSuccess({ access, refresh, role, adminUser }));
    navigate('/admin/adminhomepage');  
    toast.success('Login Successful');
  } catch (error) {
    console.log(error);
      if (error){
        toast.error(`Login Failed: ${error.message}`);
      }
      console.error('ERROR', error);
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

export const handleFetchUsersData = async (setUser, setIsLoading, setError) => {
  try {
    const response = await fetchUsersData();

    console.log('Fetch Users Data Response:', response);

    setUser(response.data);
    setIsLoading(false);
  } catch (error) {

    console.error('Error fetching user data:', error);

    setError('Error fetching user data');
    setIsLoading(false);
  }
};


export const handleFetchLandsList = async (setLands, setIsLoading, setError) => {
  try {
    const response = await fetchLandsList();
    setLands(response.data);
    setIsLoading(false);
  } catch (error) {
    setError('Error fetching user data');
    setIsLoading(false);
  }
};

export const handleFetchResidentsList = async (setProperties) => {
  try {
    const response = await fetchResidentsList();
    setProperties(response.data);
  } catch (error) {
    
    console.error('Error fetching seller residents :', error);

  }
};


export const handleFetchAmenity = async (setAmenities) => {
  try {
    const response = await fetchAmenities();
    setAmenities(response.data);
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
};



export const handleAmenityAdd = async (name) => {
  try {
    const response = await addAmenity(name);
    toast.success('Amenity added successfully');
    return response;
  } catch (error) {
    console.error('Error adding amenity:', error);
    toast.error('Amenity adding error..');
  }
};

export const handleAmenityDelete = async (amenityId) => {
  try {
    const response = await deleteAmenity(amenityId);
    toast.success('Amenity deleted successfully');
    return response;
  } catch (error) {
    console.error('Error deleting amenity:', error);
    toast.error('Amenity deleting error..');
  }
};

export const handleFetchCategory = async (setCategory) => {
  try {
    const response = await fetchCategory();
    setCategory(response.data);
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
};

export const handleCategoryAdd = async (name) => {
  try{
    const response  = await addCategory(name);
    toast.success('Category added successfully');
    return response;
  } catch(error){
    console.error("Error adding category")
    toast.error("Category adding error..")
  }
};


export const handleCategoryDelete = async (categoryId) => {
  try{
    const response  = await deleteCategory(categoryId);
    toast.success('Category deleted successfully');

    return response;
  } catch(error){
    console.error("Error deleting category")
    toast.error("Category deleting error..")
  }
};

export const handleFetchRegions = async (setRegions) => {
  try {
    const response = await fetchRegions();
    setRegions(response.data);
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
};

export const handleRegionAdd = async (name) => {
  try {
    const response = await addRegion(name);
    toast.success('Region added successfully');
    return response;
  } catch (error) {
    console.error('Error adding region:', error);
    toast.error('Region adding error..');
  }
};

export const handleRegionDelete = async (regionId) => {
  try {
    const response = await deleteRegion(regionId);
    toast.success('Region deleted successfully');
    return response;
  } catch (error) {
    console.error('Error deleting region:', error);
    toast.error('Region deleting error..');
  }
};

export const handleBlockUser = async (userId, setUsers) => {
  try {
    const response = await blockUser(userId);
    toast.success('User blocked successfully');

    // Optional: Update users list after blocking
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === userId ? { ...user, is_active: false } : user
    ));

    return response;
  } catch (error) {
    console.error('Error blocking user:', error);
    toast.error('Failed to block user.');
  }
};

export const handleUnblockUser = async (userId, setUsers) => {
  try {
    const response = await unblockUser(userId);
    toast.success('User unblocked successfully');

    // Optional: Update users list after unblocking
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === userId ? { ...user, is_active: true } : user
    ));

    return response;
  } catch (error) {
    console.error('Error unblocking user:', error);
    toast.error('Failed to unblock user.');
  }
};


export const handleFetchSubscriptionList = async (setSubscriptions) => {
  try {
    const response = await subscriptionList();
    setSubscriptions(response.data);
    console.log("RESPONSE",response);
  } catch (error) {
    console.error('Error fetching regions:', error);
  }
};
