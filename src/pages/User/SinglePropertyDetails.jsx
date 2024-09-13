import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  handleLandPropertyDetails,
  handleResidentialPropertyDetails,
} from "../../utils/auth";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { DiNancy } from 'react-icons/di';
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useSelector } from "react-redux";

const standardizeImage = (url, width, height) => {
  return url ? `${url}?w=${width}&h=${height}&fit=crop` : "";
};

const SinglePropertyDetails = () => {
  const { id, category } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const currentUser = useSelector(state => state.auth.user); 

  const navigate = useNavigate()

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
console.log("USER",currentUser);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) {
          let data;
          if (category === "Land") {
            data = await handleLandPropertyDetails(id);
            console.log("DATA",data); 

          } else if (category === "Apartment" || category === "Villa") {
            data = await handleResidentialPropertyDetails(id);
            console.log("DATA",data); 

          }
          setProperty(data);
          if (data.images.length > 0) {
            setMainImage(data.images[0].image);
          }
        }
      } catch (error) {
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, category]);

  const getLocationName = (location) => {    
    const locationParts = location.split(','); 
    const mainLocation = locationParts.slice(0, 2).join(','); 
    return mainLocation;
  };
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const openVideoModal = () => {
        setIsVideoModalOpen(true);
      };
    
  const closeVideoModal = () => {
        setIsVideoModalOpen(false);
      };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
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
              ) : (
                <p className="text-gray-500">No main image available</p>
              )}

              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {displayedImages.length > 0 ? (
                  displayedImages.map((image, index) => (
                    <img
                      key={index}
                      src={standardizeImage(image.image, 300, 300)}
                      alt={`Property thumbnail ${index + 2}`}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
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
                    play Video
                  </button>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{property.category}</h1>
              <h2 className="text-xl font-semibold mb-2">Property Details</h2>
              <p className="text-l font-semibold text-gray-700 mb-2">
                Price: ₹{property.price} Lakhs
              </p>
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
              <div className="mb-4">
                <span className="list-disc list-inside text-gray-700 capitalize">
                  Description: {property.description}
                </span>
              </div>
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
              { currentUser.id !== property.seller.id &&
              <div className="mb-4 w-3/4 bg-slate-200 shadow-lg">
                <div className="flex space-x-28">
                  <h2 className="text-xl ml-5 font-bold mb-2">Agent Details</h2>
                  <Link to={`/chat/${property.seller.id}/${id}`}>
                    <button className="text-right h-10 w-24 bg-red-200 rounded"><i class="fa-regular fa-message"></i>Make chat</button>
                  </Link>
                </div>
                <div className="flex ml-5 mt-5 items-center space-x-4">
                  {property.seller  && (
                    <>
                      <Link to={`/sellerprofile/${property.seller.id}`}>
                        <img
                          src={standardizeImage(
                            property.seller.profile_image? property.seller.profile_image : '/images/user.png',                
                            75,
                            75
                          )}
                          alt="Agent"
                          className="w-16 h-16 rounded-full shadow-md"
                        />
                      </Link>
                      <div>
                        <h3 className="text-lg font-semibold capitalize">
                          {property.seller.username}
                        </h3>
                        <p className="text-gray-500 capitalize">
                          Agency: {property.seller.agency_name}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          
                          <a
                            href={`mailto:${property.seller.email}`}
                            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                         
                          {property.seller.contact_number && (
                            <a
                              href={`tel:${property.seller.contact_number}`}
                              className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600"
                            >
                              <i className="fas fa-phone"></i>
                            </a>
                          )}
                          
                          {/* <a
                            href={`https://wa.me/${property.seller.contact_number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a> */}
                        </div>
                      </div>
                     
                    </>
                  )}
                </div>
              </div>
}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Amenities - Available facilities nearby
                </h2>
                <p>
                  {property.amenities_names && property.amenities_names.length > 0
                    ? property.amenities_names.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default SinglePropertyDetails;

