import React from 'react'
import { handleFetchUserData } from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';




export const ListedProperties = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);

  }, []);

  const properties = [
    { id: 1, price: '30 Lakhs', details: '2 Bedrooms, 3 Bathrooms', location: 'Malappuram', image: 'public/images/home1.jpg' },
    { id: 2, price: '40 Lakhs', details: '3 Bedrooms, 3 Bathrooms', location: 'Malappuram', image: 'public/images/home3.jpg' },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>         
      
      <div className="w-3/4 bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
              <div className="mt-4 flex items-center space-x-4">
                <img 
                  src={user.profile_image? user.profile_image : '/images/user.png'}                  
                  alt="Profile" 
                  className="w-16 h-16 rounded-full" 
                />
               
                <div>
                  <h3 className="text-lg text-gray-600 font-semibold uppercase">{user.username}</h3>
                  <p className="text-gray-500">Email: {user.email}</p>
                  {/* <p className="text-gray-500">DOB: {user.date_of_birth}</p> */}
                  <p className="text-gray-500 capitalize">Addresss: {user.address}</p>
                  <p className="text-gray-500">Contact Number: +91 {user.contact_number}</p>
                </div>
                

              </div>
          </div>
    <div className="w-3/4 p-4">
    <h2 className="font-bold mb-4">Listed Properties</h2>
    <section className="mb-6">
        <div className="grid grid-cols-3 gap-4">
        {properties.map((villa) => (
        <div key={villa.id} className="p-4 bg-white rounded shadow-md">
            <img src={villa.image} alt={villa.details} className="w-full h-32 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{villa.price}</h3>
            <p>{villa.details}</p>
            <p>{villa.location}</p>
        </div>
        ))}
        </div>
    </section>
    <div className='flex space-x-8'>
    <Link to="/property_type" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
        <button className="w-full  bg-gray-400 text-white py-2 rounded-md mb-2">Add Property</button>                          
    </Link>
    </div>
    </div>
    </>
  )
}
