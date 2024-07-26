import React from 'react';
import { handleFetchSellerLands, handleFetchSellerResidents, handleFetchUserData } from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const ListedProperties = () => {
  const [user, setUser] = useState(null);
  const [lands, setLands] = useState([]);
  const [villas, setVillas] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);
    handleFetchSellerLands(setLands);
    handleFetchSellerResidents((residents) => {
      setVillas(residents.filter(r => r.property_type === 'Villa'));
      setApartments(residents.filter(r => r.property_type === 'Apartment'));
      
    });
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
      <div className="w-3/4 bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
        <div className="mt-4 flex items-center space-x-4">
          <img 
            src={user.profile_image ? user.profile_image : '/images/user.png'}                  
            alt="Profile" 
            className="w-16 h-16 rounded-full" 
          />
          <div>
            <h3 className="text-lg text-gray-600 font-semibold uppercase">{user.username}</h3>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500 capitalize">Address: {user.address}</p>
            <p className="text-gray-500">Contact Number: +91 {user.contact_number}</p>
          </div>
        </div>
      </div>

      <div className="w-3/4 p-4">
        {lands.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Listed Lands</h2>
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
              {lands.map((land) => (
                <div key={land.id} className="p-4 bg-white rounded shadow-md">
                  <Link to={`/single_property/${land.id}/Land`}>
                    <img src={land.images} alt={land.details} className="w-full h-32 object-cover rounded" />
                    <h3 className="mt-2 font-semibold">{Math.round(land.price)} lakhs</h3>
                    <h3 className="mt-2 font-semibold">{Math.round(land.area)} cents</h3>
                    <p>{land.location}</p>
                  </Link>
                  <Link to={`/edit_property/${land.id}`} className="text-blue-500 hover:underline mt-2 block">
                    Edit
                  </Link>
                </div>
              ))}
              </div>
            </section>
          </>
        )}

        {villas.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Listed Villas</h2>
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
              {villas.map((villa) => (
                  <div key={villa.id} className="p-4 bg-white rounded shadow-md">
                    <Link to={`/single_property/${villa.id}/Villa`}>
                      <img src={villa.images} alt={villa.description} className="w-full h-32 object-cover rounded" />
                      <h3 className="mt-2 font-semibold">{Math.round(villa.price)} Lakhs</h3>
                      <h3 className="mt-2 font-semibold">{Math.round(villa.size)} square feet</h3>
                      <h3 className="mt-2 font-semibold">{Math.round(villa.land_area)} cent</h3>

                      <p>{villa.location}</p>
                    </Link>
                    <Link to={`/edit_property/${villa.id}`} className="text-blue-500 hover:underline mt-2 block">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {apartments.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Listed Apartments</h2>
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {apartments.map((apartment) => (
                  <div key={apartment.id} className="p-4 bg-white rounded shadow-md">
                    <Link to={`/single_property/${apartment.id}/Apartment`}>
                      <img src={apartment.images} alt={apartment.description} className="w-full h-32 object-cover rounded" />
                      <h3 className="mt-2 font-semibold">{Math.round(apartment.price)} Lakhs</h3>
                      <h3 className="mt-2 font-semibold">{Math.round(apartment.size)} square feet</h3>
                      <p>{apartment.location}</p>
                    </Link>
                    <Link to={`/edit_property/${apartment.id}`} className="text-blue-500 hover:underline mt-2 block">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="flex space-x-8">
          <Link to="/property_type" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
            <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">Add Property</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListedProperties;
