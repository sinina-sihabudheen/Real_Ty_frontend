import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { handleLandPropertyDetails, handleResidentialPropertyDetails } from '../../utils/auth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';


const standardizeImage = (url, width, height) => {
  return url ? `${url}?w=${width}&h=${height}&fit=crop` : '';
};

const SinglePropertyDetails = () => {
  const { id, category } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user data


  useEffect(() => {
    const fetchProperty = async () => {
      console.log(`Fetching property: id=${id}, category=${category}`);

      try {
        if (id) {
          let data;
          if (category === 'Land') {
            data = await handleLandPropertyDetails(id);
          } else if (category === 'Apartment' || category === 'Villa') {
            data = await handleResidentialPropertyDetails(id);
          }
          setProperty(data);
        }
      } catch (error) {
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, category]);

  console.log("Property Data:", property);
  // console.log("Amenities Data:", property.amenities);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property data available.</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
           <div className="md:col-span-2">
            <img
              src={standardizeImage(property.images[0]?.image, 800, 400)}
              alt="Property"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images && property.images.length > 0 ? (
              property.images.map((image, index) => (
                <img
                  key={index}
                  src={standardizeImage(image.image, 400, 200)}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              ))
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold">{property.category}</h1>
            <p className="text-xl font-semibold text-gray-700">Price: ₹{property.price} Lakhs</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-gray-500">{property.num_rooms} bedrooms</span>
              <span className="text-gray-500">{property.num_bathrooms} bathrooms</span>
              <span className="text-gray-500">{property.property_type ? 'Size ' : 'Area '}{Math.round(property.size || property.area)} {property.property_type ? 'sqft' : 'cents'}</span>
            </div>
            <p className="text-gray-500">Place: {property.location}</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold">Property Details</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Type: {property.category}</li>
                <li>Description: {property.description}</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Agent Details</h2>
              <div className="flex items-center space-x-4 mt-2">
                {property.seller && (
                  <>
                   <Link to={`/sellerprofile/${property.seller.id}`} >
                    <img
                      src={standardizeImage(property.seller.user.profile_image, 64, 64)}
                      alt="Agent"
                      className="w-16 h-16 rounded-full shadow-md"
                    />
                    </Link>
                    <div>
                      <h3 className="text-lg font-semibold">{property.seller.user.username}</h3>
                      <p className="text-gray-500">Agency: {property.seller.agency_name}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="p-2 rounded-full bg-blue-500 text-white"><i className="fas fa-envelope"></i></button>
                        <button className="p-2 rounded-full bg-green-500 text-white"><i className="fas fa-phone"></i></button>
                        <button className="p-2 rounded-full bg-gray-500 text-white"><i className="fas fa-whatsapp"></i></button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold">Amenities</h2>
            
                  
                  <p> {property.amenities && property.amenities.length > 0 ? property.amenities.join(', ') : 'N/A'}</p>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SinglePropertyDetails;
