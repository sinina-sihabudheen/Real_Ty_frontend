import React, { useState, useEffect } from 'react';
import { handleFetchUserData } from '../../utils/auth';


const AdminHeader = () => {
    const [user, setUser] = useState();
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
    <div className="flex justify-between items-center mb-6">
      <div className="flex w-full ml-10 items-center space-x-4">
        <input
          type="text"
          placeholder="Search here"
          className="p-2 border border-gray-300 rounded"
        />
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">Filter Period</button> */}
      </div>
      <div className="flex items-center mr-10 space-x-4">
        <span>Hello,{user.username}</span>
        <img src="/images/user.png" alt="Profile" className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

export default AdminHeader;
