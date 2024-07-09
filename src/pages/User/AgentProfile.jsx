import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { handleFetchUserData } from '../../utils/auth';

const AgentProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);
  }, []);

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
        
        <div className="w-3/4 bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-bold">My Profile</h2>
          <p className="text-gray-500">Update your profile details here.</p>
          <div className="mt-4 flex items-center space-x-4">
            <img 
              src='/images/user.png' 
              alt="Profile" 
              className="w-16 h-16 rounded-full" 
            />
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p className="text-gray-500">Joined on {user.created_at}</p>
              <p className="text-gray-500">Addresss: {user.address}</p>
              <p className="text-gray-500">Contact Number: {user.contact_number}</p>
            </div>
            {user.is_seller ? (
              <div className='flex space-x-8'>
                  <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Listed Properties</button>
                  <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Buy Property</button>
              </div>
              ):(
              <div className='flex'>
                  <button className="w-6/12  bg-gray-400 text-white py-2 rounded-md mb-2">Buy</button>
                  <button className="w-6/12  bg-gray-400 text-white py-2 rounded-md mb-2">Sell Property</button>
              </div>

                )}
          </div>
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


