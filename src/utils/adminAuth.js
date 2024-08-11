
import { loginAdmin, fetchUserData, 
  fetchResidentsList, fetchLandsList, 
  fetchSellersData,blockSeller,unblockSeller,
  fetchUsersData,blockUser,unblockUser,
  fetchBuyersData, blockBuyer,unblockBuyer,
  fetchRegions,addRegion,deleteRegion,
  fetchAmenities,addAmenity,deleteAmenity,
  fetchCategory,addCategory,deleteCategory
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
    navigate('/admin/login');
    console.error(error);
    localStorage.setItem('admin', 'false');
    toast.error('Login Failed: Please try again');
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

export const handleFetchSellersData = async (setUser, setIsLoading, setError) => {
  try {
    const response = await fetchSellersData();
    console.log('Sellers data:', response.data); // Log the data received

    setUser(response.data);
    setIsLoading(false);
  } catch (error) {
    setError('Error fetching user data');
    setIsLoading(false);
  }
};

export const handleFetchBuyersData = async (setUser, setIsLoading, setError) => {
  try {
    const response = await fetchBuyersData();
    setUser(response.data);
    setIsLoading(false);
  } catch (error) {
    setError('Error fetching user data');
    setIsLoading(false);
  }
};

export const handleFetchLandsList = async (setLands, setIsLoading, setError) => {
  try {
    const response = await fetchLandsList();
    console.log('lands data:', response.data);
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
    // console.log('residents data:', response.data);
    setProperties(response.data);
    // setIsLoading(false);
  } catch (error) {
    // setError('Error fetching user data');
    // setIsLoading(false);
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

export const handleBlockSeller = async (sellerId, setUsers) => {
  try {
      const response = await blockSeller(sellerId);
      toast.success('Seller blocked successfully');
      setUsers(prevUsers =>
          prevUsers.map(user =>
              user.id === sellerId ? { ...user, user: { ...user.user, is_active: false } } : user
          )
      );
  } catch (error) {
      toast.error('Error blocking seller');
      console.error('Error blocking seller:', error);
  }
};

export const handleUnblockSeller = async (sellerId, setUsers) => {
  try {
      const response = await unblockSeller(sellerId);
      toast.success('Seller unblocked successfully');
      setUsers(prevUsers =>
          prevUsers.map(user =>
              user.id === sellerId ? { ...user, user: { ...user.user, is_active: true } } : user
          )
      );
  } catch (error) {
      toast.error('Error unblocking seller');
      console.error('Error unblocking seller:', error);
  }
};

export const handleBlockBuyer = async (buyerId,setUsers) => {
  try {
      const response = await blockBuyer(buyerId);
      if (response.status === 200) {
          toast.success("Buyer blocked successfully");
          setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === buyerId ? { ...user, user: { ...user.user, is_active: true } } : user
            )
        );
          return response.data;
      }

  } catch (error) {
      console.error("Error blocking buyer:", error);
      toast.error("Failed to block buyer");
  }
};

export const handleUnblockBuyer = async (buyerId,setUsers) => {
  try {
      const response = await unblockBuyer(buyerId);
      if (response.status === 200) {
          toast.success("Buyer unblocked successfully");
          setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === buyerId ? { ...user, user: { ...user.user, is_active: true } } : user
            )
        );
          return response.data;
      }
  } catch (error) {
      console.error("Error unblocking buyer:", error);
      toast.error("Failed to unblock buyer");
  }
};