import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { handleLandPropertyDetails, handleResidentialPropertyDetails } from '../../utils/auth';

const SinglePropertyDetails = () => {
  const { id, category } = useParams(); // Access route parameter
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      console.log(`Fetching property: id=${id}, category=${category}`);

      try {
        if (id) {
          const category = determineCategoryBasedOnId(id); // Implement this function based on your logic
          if (category === 'Land') {
            const data = await handleLandPropertyDetails(id);
            setProperty(data);
          } else if (category === 'Apartment' || category === 'Villa') {
            const data = await handleResidentialPropertyDetails(id);
            setProperty(data);
          }
        }
      } catch (error) {
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property data available.</p>;

  return (
    <div>
      <h1>Property Details</h1>
      <h2>Price: {property.price}</h2>
      <p>Description: {property.description}</p>
    </div>
  );
};

export default SinglePropertyDetails;
