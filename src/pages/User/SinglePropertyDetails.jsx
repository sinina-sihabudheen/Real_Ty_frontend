import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  handleLandPropertyDetails,
  handleResidentialPropertyDetails,
} from "../../utils/auth";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
  const navigate = useNavigate()
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
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Price: ₹{property.price} Lakhs
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-gray-500">
                  {property.num_rooms} bedrooms
                </span>
                <span className="text-gray-500">
                  {property.num_bathrooms} bathrooms
                </span>
                <span className="text-gray-500">
                  {property.property_type ? "Size " : "Area "}
                  {Math.round(property.size || property.area)}{" "}
                  {property.property_type ? "sqft" : "cents"}
                </span>
              </div>
              <p className="text-gray-500 mb-4">Place: {property.location}</p>

              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Property Details</h2>
                <ul className="list-disc list-inside text-gray-700 capitalize">
                  <li>Type: {property.category}</li>
                  <li>Description: {property.description}</li>
                </ul>
              </div>

              <div className="mb-4 bg-slate-200 shadow-lg">
                <div className="flex space-x-28">
                  <h2 className="text-xl ml-5 font-bold mb-2">Agent Details</h2>
                  <Link to={`/chat/${property.seller.id}/${id}`}>
                    <button className="text-right bg-red-200 rounded">Make a chat</button>
                  </Link>
                </div>
                <div className="flex ml-5 mt-5 items-center space-x-4">
                  {property.seller && (
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

