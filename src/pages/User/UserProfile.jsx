import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { handleFetchUserData, changeUserPassword, updateUserProfile} from '../../utils/auth';
import { toast } from 'sonner';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';



const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileEdit, setProfileEdit] = useState(false)
  const [security, setSecurity] = useState(false)
  const [passwordView,setPasswordView] = useState(false)
  const [confirmPasswordView,setConfirmPasswordView] = useState(false)
  const [currentPasswordView,setCurrentPasswordView] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);

  }, []);

  useEffect(() => {
    if (user && user.date_of_birth) {
      setDateOfBirth(new Date(user.date_of_birth));
    }
  }, [user]);

    const fileInputRef = useRef(null);
  
    const handleClick = () => {
      fileInputRef.current.click();
    };

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

    const formData = new FormData(event.target);
    if (dateOfBirth) {
      formData.append('date_of_birth', format(dateOfBirth, 'yyyy-MM-dd'));
    }  
    formData.append('profile_image', formData.profile_image || '');
  
    try {
      await updateUserProfile(formData);
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
  const data = {
    current_password: formData.get('currentPassword'),
    new_password: formData.get('newPassword'),
    confirm_password: formData.get('confirm_password'),
  };

  try {
    await changeUserPassword(data);
    toast.success('Password changed successfully');
    setSecurity(false);
  } catch (error) {
    console.error(error);
    toast.error('Error changing password. Please try again.');
  }
};

  const handleCancel = () => {
    setProfileEdit(false);
    setSecurity(false);
  };
   
  const handleSell = () => {
    navigate('/property_type')
  };

  const handleListedProperties = () => {
    navigate('/listedproperties')
  };
 
  const handleBuy = async () => {
    
      navigate('/propertylist');
  
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
                {user.social_provider !== 'google' ? (
                <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm"
                  onClick={handleSecurityClick}>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-xl text-gray-500">lock</span>
                    <span className="text-md text-gray-500 font-medium">Security</span>
                  </div>
                  <span className="material-icons text-gray-500">chevron_right</span>
                </div>):null}
              </div>
            </div>   
            )}     
            <div className="w-3/4 bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
              <div className="mt-4 flex items-center space-x-4">
                <img 
                  src={user.profile_image? user.profile_image : '/images/user.png'}                  
                  alt="Profile" 
                  className="w-20 h-20 rounded-full" 
                />
              
                <div>
                  <h3 className="text-lg text-gray-600 font-semibold uppercase">{user.username}</h3>
                  <p className="text-gray-500">Email: {user.email}</p>
                  {user.address ? <p className="text-gray-500 capitalize">Addresss: {user.address} </p>: null}
                   {user.contact_number ? <p className="text-gray-500">Contact Number: +91{user.contact_number} </p>: null}
                  
                </div>
                
                 
               
                  <div className='flex w-full space-x-8'>
                      {/* <button onClick={handleSell} className="w-2/4 bg-gray-400 text-white py-2 rounded-md mb-2">Sell</button> */}
                      <button onClick={handleListedProperties} className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Listed Properties</button>

                  </div>
                  

              </div>
          </div>
       </div>
       {profileEdit && (
            <form onSubmit={handleProfileUpdate} encType="multipart/form-data"> 
                <div className="mb-4">
                  <h3 className="text-lg text-gray-500 font-semibold mb-2">Account Details</h3>
                    <label className="block text-gray-400 mb-1">Profile Name</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text" 
                        name="username"
                        defaultValue={user.username} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />                      
                    </div>
                    
                  <label className="block text-gray-400 mb-1">Date of Birth</label>
                  <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date)}
                      dateFormat="dd/MM/yyyy"
                      className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"
                    />
                  </div>

                    <label className="block text-gray-400 mb-1">Address</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text"                       
                        name="address"
                        defaultValue={user.address} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />     
                    </div>
                    <label className="block text-gray-400 mb-1">Contact Number</label>
                    <div className="mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">  
                      <input 
                        type="text" 
                        name="contact_number"
                        defaultValue={user.contact_number} 
                        className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400" />                      
                    </div>
               
                    <label className="block text-gray-400 mb-1">Profile Image</label>
                   
                    <div className="file-upload-container mb-4 w-6/12 flex items-center border rounded-md px-4 py-2">
                      <input
                        type="file"
                        name="profile_image"
                        accept="image/jpeg,image/png,image/gif"
                        ref={fileInputRef}
                        style={{ display: 'none' }} 
                        onChange={(e) => console.log(e.target.files[0])} 
                      />
                      <button
                        type="button"
                        className="custom-file-upload"
                        onClick={handleClick}
                      >
                        Choose File
                      </button>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Apply Changes</button>
                <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
              </form>
          )}
          {security && (
            <form onSubmit={handlePasswordChange} >                
                <div className="mb-4  items-center w-6/12">
                  <h3 className="text-lg text-gray-500 font-semibold mb-2">Security Changes</h3>
                  <h5 className=" text-gray-500  mb-2">Change Password</h5>
                  <label className="block text-gray-400 mb-1">Current Password</label>                  
                  <div className="mb-4 flex w-full items-center border rounded-md px-4 py-2">
                      <input
                          type={currentPasswordView? "text" : "password"}   
                          name="currentPassword"
                          className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"                       
                          required
                      />
                      <div className='cursor-pointer mt-2' onClick={()=>setCurrentPasswordView(!currentPasswordView)}>
                          {currentPasswordView ? <FaEye/> :<FaEyeSlash/>}
                      </div>
                  </div>     
                  <label className="block text-gray-400 mb-1">Password</label>                  
                  <div className="mb-4 flex w-full items-center border rounded-md px-4 py-2">
                      <input
                          type={passwordView? "text" : "password"}   
                          name="newPassword"
                          className="w-full px-4 py-2 border-white rounded-md focus:outline-none focus:border-blue-400"                       
                          required
                      />
                      <div className='cursor-pointer mt-2' onClick={()=>setPasswordView(!passwordView)}>
                          {passwordView ? <FaEye/> :<FaEyeSlash/>}
                      </div>
                  </div>                   
                  <label className="block text-gray-400 mb-1">Re Enter The Password</label>
                  <div className="mb-4 flex w-full items-center border rounded-md px-4 py-2">
                        <input
                            type={confirmPasswordView? "text" : "password"}
                            name="confirm_password"
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

export default UserProfile;