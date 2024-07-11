import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { handleFetchUserData} from '../../utils/auth';
import { updateUserProfile, changeUserPassword} from '../../utils/api';
import { toast } from 'sonner';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const AgentProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileEdit, setProfileEdit] = useState(false)
  const [security, setSecurity] = useState(false)
  const [passwordView,setPasswordView] = useState(false)
  const [confirmPasswordView,setConfirmPasswordView] = useState(false)

  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);
  }, []);

  const handleProfileEditClick = () => {
    setProfileEdit(true);
    setSecurity(false); 
  };

  const handleSecurityClick = () => {
    setSecurity(true);
    setProfileEdit(false); 
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    console.log("WWWWWWW");
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await updateUserProfile(data);
      toast.success('Profile updated successfully');
      handleFetchUserData(setUser, setIsLoading, setError);
      setProfileEdit(false);
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await changeUserPassword(data);
      toast.success('Password changed successfully');
      setSecurity(false);
    } catch (error) {
      toast.error('Error changing password. Please try again.');
    }
  };
  const handleCancel = () => {
    setProfileEdit(false);
    setSecurity(false);
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user ? (
        <div>
        <div className='flex space-x-5'>
            {!profileEdit && !security && (
            <div className="w-full max-w-sm mx-auto bg-gray-300 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-700 text-center mb-4 ">Profile Settings</h3>
              <h5 className="text-gray-500 text-center">Update your profile details here.</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm"
                  onClick={handleProfileEditClick}>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-xl text-gray-500">account_circle</span>
                    <span className="text-md text-gray-500 font-medium">My Profile</span>
                  </div>
                  <span className="material-icons text-gray-500">chevron_right</span>
                </div>
                <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm"
                  onClick={handleSecurityClick}>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-xl text-gray-500">lock</span>
                    <span className="text-md text-gray-500 font-medium">Security</span>
                  </div>
                  <span className="material-icons text-gray-500">chevron_right</span>
                </div>
              </div>
            </div>   
            )}     
            <div className="w-3/4 bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
              <div className="mt-4 flex items-center space-x-4">
                <img 
                  src={ user.profile_image || '/images/user.png'}
                  alt="Profile" 
                  className="w-16 h-16 rounded-full" 
                />
                <div>
                  <h3 className="text-lg text-gray-600 font-semibold uppercase">{user.username}</h3>
                  <p className="text-gray-500">Email: {user.email}</p>
                  <p className="text-gray-500">Joined on: {user.created_at}</p>
                  <p className="text-gray-500 capitalize">Addresss: {user.address}</p>
                  <p className="text-gray-500">Contact Number: +91 {user.contact_number}</p>
                </div>
                {user.is_seller ? (
                  <div className='flex space-x-8'>
                      <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Listed Properties</button>
                      <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Buy Property</button>
                  </div>
                  ):(
                  <div className='flex space-x-8'>
                      <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Buy</button>
                      <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Sell Property</button>
                  </div>
                    )}
              </div>
          </div>
       </div>
       {profileEdit && (
            <form onSubmit={handleProfileUpdate}> 
                <div className="mb-4">
                  <h3 className="text-lg text-gray-500 font-semibold mb-2">Account Details</h3>
                    <label className="block text-gray-400 mb-1">Profile Name</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text" 
                        defaultValue={user.username} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />                      
                    </div>
                    <label className="block text-gray-400 mb-1">Date of Birth</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text" 
                        placeholder="DD/MM/YYYY" 
                        defaultValue={user.date_of_birth} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400 " />                      
                    </div>
                    <label className="block text-gray-400 mb-1">Address</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text" 
                        defaultValue={user.address} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />     
                    </div>
                    <label className="block text-gray-400 mb-1">Contact Number</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text" 
                        defaultValue={user.contact_number} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />                      
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Apply Changes</button>
                <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
              </form>
          )}
          {security && (
            <form onSubmit={handlePasswordChange} >                
                <div className="mb-4  items-center w-6/12">
                  <h3 className="text-lg text-gray-500 font-semibold mb-2">Security Change</h3>
                  <label className="block text-gray-400 mb-1">Email</label>
                  <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">
                    <input 
                      type="text" 
                      defaultValue={user.email} 
                      className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />                      
                      </div>
                  <label className="block text-gray-400 mb-1">Password</label>                  
                  <div className="mb-4 flex w-6/12 items-center border rounded-md px-4 py-2">
                      <input
                          type={passwordView? "text" : "password"}                         
                          className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"                       
                          required
                      />
                      <div className='cursor-pointer mt-2' onClick={()=>setPasswordView(!passwordView)}>
                          {passwordView ? <FaEye/> :<FaEyeSlash/>}
                      </div>
                  </div>                   
                  <label className="block text-gray-400 mb-1">Re Enter The Password</label>
                  <div className="mb-4 flex w-6/12 items-center border rounded-md px-4 py-2">
                        <input
                            type={confirmPasswordView? "text" : "password"}
                            className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                            required
                        />
                        <div className='cursor-pointer mt-2' onClick={()=>setConfirmPasswordView(!confirmPasswordView)}>
                            {confirmPasswordView ? <FaEye/> :<FaEyeSlash/>}
                        </div>                       
                  </div> 
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Apply Changes</button>
                <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
              </form>
          )}
       </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default AgentProfile;


