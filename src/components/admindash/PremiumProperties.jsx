import React, { useEffect, useState } from 'react';
import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';

const standardizeImage = (url, width, height) => {
  return `${url}?w=${width}&h=${height}&fit=crop`;
};

const PremiumProperties = () => {
  const [villas, setVillas] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [lands, setLands] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetchLandsList(setLands, setIsLoading, setError);
        await handleFetchResidentsList((residents) => {
          setVillas(residents.filter(r => r.property_type === 'Villa'));
          setApartments(residents.filter(r => r.property_type === 'Apartment'));
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProperties([...villas, ...apartments, ...lands].filter(property => property.seller.subscription_status === 'premium').slice(0, 4));
  }, [villas, apartments, lands]);

  const renderFirstImage = (images) => {
    if (images.length > 0) {
      return (
        <img
          src={standardizeImage(images[0].image, 200, 200)}
          alt="Property"
          className="w-full h-24 object-cover rounded"
        />
      );
    }
    return null;
  };

  const renderProperties = (properties) => {
    return properties.map((property, index) => (
      <div key={index} className="p-2 bg-gray-50 rounded shadow-md">
        {renderFirstImage(property.images)}
        <p className="text-sm font-semibold mt-2">{property.seller.user.username}</p>
        <p className="text-sm text-slate-400 mt-2">{property.category}</p>

      </div>
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Premium Properties</h2>
      <div className="flex ">
        {filteredProperties.length > 0 ? (
          renderProperties(filteredProperties)
        ) : (
          <div>No properties found</div>
        )}
      </div>
    </div>
  );
};

export default PremiumProperties;
