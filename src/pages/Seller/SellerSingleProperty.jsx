import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleDeleteLandProperty, handleDeleteResidentialProperty, handleLandPropertyDetails, handleResidentialPropertyDetails } from '../../utils/auth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { DiNancy } from 'react-icons/di';
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const standardizeImage = (url, width, height) => {
  return url ? `${url}?w=${width}&h=${height}&fit=crop` : '';
};

const SellerSingleProperty = () => {
  const { id, category } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [mainImage, setMainImage] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

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
          if (data.images.length > 0) {
            setMainImage(data.images[0].image);
          }
        }
      } catch (error) {
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, category]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleDelete = () => {
    setIsModalOpen(true); 
  };

  const onConfirm = async () => {
    setIsModalOpen(false); 

    try {
      if (category === 'Land') {
        await handleDeleteLandProperty(id);
      } else if (category === 'Apartment' || category === 'Villa') {
        await handleDeleteResidentialProperty(id);
      }
      navigate('/listedproperties'); 
      toast.success('Property deleted successfully.');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property.');
    }
  };  
  const getLocationName = (location) => {    
    const locationParts = location.split(','); 
    const mainLocation = locationParts.slice(0, 2).join(','); 
    return mainLocation;
  };

  const onCancel = () => {
    setIsModalOpen(false); 
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
      setIsVideoModalOpen(false);
    };

  console.log("Property Data:", property);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property data available.</p>;
  const displayedImages = property.images.slice(0, 5);


  return (
    <>
      <Navbar />
      <div className={`py-10 max-w-7xl mx-auto ${isVideoModalOpen ? "blur-lg" : "" }`}>
      <div className="bg-white w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
              {mainImage ? (
              <img
                src={standardizeImage(mainImage, 300, 300)}
                alt={`Property main image`}
                className="w-full h-96 object-cover rounded-lg shadow-md mb-4"
              />
            ):(
              <p className="text-gray-500">No main image available</p>
            )}
          
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {displayedImages.length > 0 ? (
                  displayedImages.map((image, index) => (
                  <img
                    key={index}
                    src={standardizeImage(image.image, 300, 300)}
                    alt={`Property image ${index + 2}`}
                    className="w-20 h-20 object-cover rounded-md shadow-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => handleImageClick(image.image)}
                  />
                ))
              ) : (
                <p className="text-gray-600">No images available</p>
              )}
            </div>
            <div className="flex space-x-2">
                {property.video && (
                  <button
                    className="border-gray-600 bg-slate-200  w-44 h-10  text-gray-500 rounded"
                    onClick={openVideoModal}
                  >
                    Added Video
                  </button>
                )}
              </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{property.category}</h1>
            <p className="text-xl font-semibold text-gray-700">Price: ₹{Math.round(property.price)} Lakhs</p><br />
            
            {(property.category==='Villa' || property.category==='Apartment') &&
                <div className="flex items-center  space-x-4">
                    <span className=" flex items-center">
                      <FaBed size={20} color="black" />
                      <span className="ml-2 font-bold text-gray-600">{property.num_rooms} bedrooms</span>
                    </span>
                    <span className=" flex items-center">
                      <FaBath size={20} color="black" />
                      <span className="ml-2 font-bold text-gray-600">{property.num_bathrooms} bathrooms</span>
                    </span>
                </div>
              }
              <div className="flex items-center space-x-2 mb-4"> 
                <span className="text-gray-500">
                  {property.property_type ? "Size " : "Area "}
                  {Math.round(property.size || property.area)}{" "}
                  {property.property_type ? "sqft" : "cents"}
                </span>
              </div>
              {property.category==='Villa' && 
              <div className="flex items-center space-x-2 mb-4"> 
                <span className="text-gray-500">                  
                 Land Area: {Math.round(property.land_area)} Cent              
                </span>
              </div>
              }
            <div className="flex items-center space-x-4">
              <span className=" flex items-center text-gray-600 font-semibold">
                <FaMapMarkerAlt size={20} color="black" /> Location: {getLocationName(property.location)}
              </span>
            </div>
              {property.latitude && property.longitude && (
                <div className="map-container" style={{ display: 'flex' }}>
                  <MapContainer
                    center={[property.latitude, property.longitude]}
                    zoom={13}
                    style={{
                      height: '200px',  
                      width: '80%',    
                      marginTop: '1rem',
                      borderRadius: '8px', 
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[property.latitude, property.longitude]}>
                      <Popup>{property.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}

          </div>
          <div className='mb-4'>
              <h2 className="text-xl font-bold">Property Details</h2>
              <ul className="list-disc list-inside text-gray-700 capitalize">
                <li>Type: {property.category}</li>
                <li>Description: {property.description}</li>
              </ul>
          </div>
          <div>
                <h2 className="text-xl font-bold mb-2">
                  Amenities - Available facilities nearby
                </h2>
                <p>
                  {property.amenities && property.amenities.length > 0
                    ? property.amenities.join(", ")
                    : "N/A"}
                </p>
          </div>
          <div className="md:col-span-2 flex space-x-10">
            <Link to={`/edit_property/${id}/${category}`} className="bg-blue-500 text-white px-8 py-4 text-xl rounded hover:bg-blue-600">
              Edit
            </Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-8 py-4 rounded text-xl hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this property?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && property.video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
            <button
              className="absolute bg-transparent hover:bg-red-200 shadow-md rounded h-10 w-10 top-2 text-3xl right-2 text-black-800 z-50"
              onClick={closeVideoModal}
            >
              &times;
            </button>
            <video controls className="w-full h-auto">
              <source src={property.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SellerSingleProperty;
