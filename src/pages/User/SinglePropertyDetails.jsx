// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   handleLandPropertyDetails,
//   handleResidentialPropertyDetails,
// } from "../../utils/auth";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { Link } from "react-router-dom";

// const standardizeImage = (url, width, height) => {
//   return url ? `${url}?w=${width}&h=${height}&fit=crop` : "";
// };

// const SinglePropertyDetails = () => {
//   const { id, category } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         if (id) {
//           let data;
//           if (category === "Land") {
//             data = await handleLandPropertyDetails(id);
//           } else if (category === "Apartment" || category === "Villa") {
//             data = await handleResidentialPropertyDetails(id);
//           }
//           setProperty(data);
//         }
//       } catch (error) {
//         setError("Failed to fetch property details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [id, category]);

//   const openImageModal = (index) => {
//     setCurrentImageIndex(index);
//     setIsImageModalOpen(true);
//   };

//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//   };

//   const openVideoModal = () => {
//     setIsVideoModalOpen(true);
//   };

//   const closeVideoModal = () => {
//     setIsVideoModalOpen(false);
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex(
//       (prevIndex) => (prevIndex + 1) % property.images.length
//     );
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
//     );
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!property) return <p>No property data available.</p>;

//   return (
//     <>
//       <Navbar />
//       <div
//         className={`py-10 max-w-7xl mx-auto ${
//           isImageModalOpen || isVideoModalOpen ? "blur-lg" : ""
//         }`}
//       >
//         <div className="bg-white w-full ">
//           <div className="container mx-auto px-4 py-8 ">
//             <div className="flex flex-wrap -mx-4">
//               {/* Product Images */}
//               <div className="w-full md:w-1/2 px-4 mb-8">
//                 <img
//                   src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
//                   alt="Product"
//                   className="w-full h-auto rounded-lg shadow-md mb-4"
//                   id="mainImage"
//                 />
//                 <div className="flex gap-4 py-4 justify-center overflow-x-auto">
//                   <img
//                     src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
//                     alt="Thumbnail 1"
//                     className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
//                     onclick="changeImage(this.src)"
//                   />
//                   <img
//                     src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
//                     alt="Thumbnail 2"
//                     className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
//                     onclick="changeImage(this.src)"
//                   />
//                   <img
//                     src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
//                     alt="Thumbnail 3"
//                     className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
//                     onclick="changeImage(this.src)"
//                   />
//                   <img
//                     src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
//                     alt="Thumbnail 4"
//                     className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
//                     onclick="changeImage(this.src)"
//                   />
//                 </div>
//               </div>

//               <div>
//               <div className="">
//             <h1 className="text-3xl font-bold">{property.category}</h1>
//             <p className="text-xl font-semibold text-gray-700">
//               Price: ₹{property.price} Lakhs
//             </p>
//             <div className="flex items-center space-x-2 mt-2">
//               <span className="text-gray-500">
//                 {property.num_rooms} bedrooms
//               </span>
//               <span className="text-gray-500">
//                 {property.num_bathrooms} bathrooms
//               </span>
//               <span className="text-gray-500">
//                 {property.property_type ? "Size " : "Area "}
//                 {Math.round(property.size || property.area)}{" "}
//                 {property.property_type ? "sqft" : "cents"}
//               </span>
//             </div>
//             <p className="text-gray-500">Place: {property.location}</p>
//           </div>

//           {/* Amenities and Agent Details */}
//           <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h2 className="text-xl font-bold">Property Details</h2>
//               <ul className="list-disc list-inside text-gray-700">
//                 <li>Type: {property.category}</li>
//                 <li>Description: {property.description}</li>
//               </ul>
//             </div>

//             <div className="border bg-slate-200 w-6/12 rounded-md">
//               <h2 className="text-xl font-bold">Agent Details</h2>
//               <div className="flex items-center space-x-4 mt-2">
//                 {property.seller && (
//                   <>
//                     <Link to={`/sellerprofile/${property.seller.id}`}>
//                       <img
//                         src={standardizeImage(
//                           property.seller.user.profile_image,
//                           75,
//                           75
//                         )}
//                         alt="Agent"
//                         className="w-16 h-16 rounded-full shadow-md"
//                       />
//                     </Link>
//                     <div>
//                       <h3 className="text-lg font-semibold">
//                         {property.seller.user.username}
//                       </h3>
//                       <p className="text-gray-500">
//                         Agency: {property.seller.agency_name}
//                       </p>
//                       <div className="flex items-center space-x-4 mt-2">
//                         <button className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
//                           <i className="fas fa-envelope"></i>
//                         </button>
//                         <button className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600">
//                           <i className="fas fa-phone"></i>
//                         </button>
//                         <button className="p-3 rounded-full bg-green-500 text-white hover:bg-gray-600">
//                           <i className="fab fa-whatsapp"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <h2 className="text-xl font-bold">
//               Amenities - Available facilities nearby
//             </h2>
//             <p>
//               {property.amenities && property.amenities.length > 0
//                 ? property.amenities.join(", ")
//                 : "N/A"}
//             </p>
//           </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//           <div className="flex space-x-2">
//             {/* <div className="w-2/3">
//               <img
//                 src={standardizeImage(property.images[0]?.image, 700, 500)}
//                 alt="Property"
//                 className="w-75 h-65 object-cover rounded-lg shadow-md"
//               />
//             </div> */}
//             {/* <div className="grid">
//               <div className="grid grid-cols-2 gap-4">
//                 {property.images && property.images.length > 0 ? (
//                   property.images.slice(1, 5).map((image, index) => (
//                     <img
//                       key={index}
//                       src={standardizeImage(image.image, 300, 300)}
//                       alt={`Property image ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg shadow-md"
//                       onClick={() => openImageModal(index + 1)}
//                     />
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No images available</p>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   className="border-gray-300 shadow-lg w-44 h-10 text-gray-500 rounded"
//                   onClick={() => openImageModal(0)}
//                 >
//                   View Image
//                 </button>
//                 {property.video && (
//                   <button
//                     className="border-gray-300 shadow-lg w-44 h-10  text-gray-500 rounded"
//                     onClick={openVideoModal}
//                   >
//                     Play Video
//                   </button>
//                 )}
//               </div>
//             </div> */}
//           </div>

//           {/* Property Details */}
//           <div className="md:col-span-2">
//             <h1 className="text-3xl font-bold">{property.category}</h1>
//             <p className="text-xl font-semibold text-gray-700">
//               Price: ₹{property.price} Lakhs
//             </p>
//             <div className="flex items-center space-x-2 mt-2">
//               <span className="text-gray-500">
//                 {property.num_rooms} bedrooms
//               </span>
//               <span className="text-gray-500">
//                 {property.num_bathrooms} bathrooms
//               </span>
//               <span className="text-gray-500">
//                 {property.property_type ? "Size " : "Area "}
//                 {Math.round(property.size || property.area)}{" "}
//                 {property.property_type ? "sqft" : "cents"}
//               </span>
//             </div>
//             <p className="text-gray-500">Place: {property.location}</p>
//           </div>

//           {/* Amenities and Agent Details */}
//           <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h2 className="text-xl font-bold">Property Details</h2>
//               <ul className="list-disc list-inside text-gray-700">
//                 <li>Type: {property.category}</li>
//                 <li>Description: {property.description}</li>
//               </ul>
//             </div>

//             <div className="border bg-slate-200 w-6/12 rounded-md">
//               <h2 className="text-xl font-bold">Agent Details</h2>
//               <div className="flex items-center space-x-4 mt-2">
//                 {property.seller && (
//                   <>
//                     <Link to={`/sellerprofile/${property.seller.id}`}>
//                       <img
//                         src={standardizeImage(
//                           property.seller.user.profile_image,
//                           75,
//                           75
//                         )}
//                         alt="Agent"
//                         className="w-16 h-16 rounded-full shadow-md"
//                       />
//                     </Link>
//                     <div>
//                       <h3 className="text-lg font-semibold">
//                         {property.seller.user.username}
//                       </h3>
//                       <p className="text-gray-500">
//                         Agency: {property.seller.agency_name}
//                       </p>
//                       <div className="flex items-center space-x-4 mt-2">
//                         <button className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
//                           <i className="fas fa-envelope"></i>
//                         </button>
//                         <button className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600">
//                           <i className="fas fa-phone"></i>
//                         </button>
//                         <button className="p-3 rounded-full bg-green-500 text-white hover:bg-gray-600">
//                           <i className="fab fa-whatsapp"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <h2 className="text-xl font-bold">
//               Amenities - Available facilities nearby
//             </h2>
//             <p>
//               {property.amenities && property.amenities.length > 0
//                 ? property.amenities.join(", ")
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
//             <button
//               className="absolute bg-transparent hover:bg-red-200 shadow-md rounded h-10 w-10 top-2 text-3xl right-2 text-black-800 z-50"
//               onClick={closeImageModal}
//             >
//               &times;
//             </button>
//             <img
//               src={standardizeImage(
//                 property.images[currentImageIndex]?.image,
//                 700,
//                 500
//               )}
//               alt={`Property image ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover rounded-lg"
//             />

//             <div className="flex justify-between items-center mt-4">
//               {currentImageIndex > 0 && (
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 z-50"
//                   onClick={handlePrevImage}
//                 >
//                   &larr; Prev
//                 </button>
//               )}
//               {currentImageIndex < property.images.length - 1 && (
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 z-50"
//                   onClick={handleNextImage}
//                 >
//                   Next &rarr;
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Video Modal */}
//       {isVideoModalOpen && property.video && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
//             <button
//               className="absolute bg-transparent hover:bg-red-200 shadow-md rounded h-10 w-10 top-2 text-3xl right-2 text-black-800 z-50"
//               onClick={closeVideoModal}
//             >
//               &times;
//             </button>
//             <video controls className="w-full h-auto">
//               <source src={property.video} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default SinglePropertyDetails;



import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) {
          let data;
          if (category === "Land") {
            data = await handleLandPropertyDetails(id);
          } else if (category === "Apartment" || category === "Villa") {
            data = await handleResidentialPropertyDetails(id);
          }
          setProperty(data);
          if (data.images.length > 0) {
            setMainImage(data.images[0].image); // Set the initial main image
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!property) return <p>No property data available.</p>;

  const displayedImages = property.images.slice(0, 5);

  return (
    <>
      <Navbar />
      <div className="py-10 max-w-7xl mx-auto">
        <div className="bg-white w-full px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
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
                  <p className="text-gray-500">No images available</p>
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
                <ul className="list-disc list-inside text-gray-700">
                  <li>Type: {property.category}</li>
                  <li>Description: {property.description}</li>
                </ul>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Agent Details</h2>
                <div className="flex items-center space-x-4">
                  {property.seller && (
                    <>
                      <Link to={`/sellerprofile/${property.seller.id}`}>
                        <img
                          src={standardizeImage(
                            property.seller.user.profile_image,
                            75,
                            75
                          )}
                          alt="Agent"
                          className="w-16 h-16 rounded-full shadow-md"
                        />
                      </Link>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {property.seller.user.username}
                        </h3>
                        <p className="text-gray-500">
                          Agency: {property.seller.agency_name}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                            <i className="fas fa-envelope"></i>
                          </button>
                          <button className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600">
                            <i className="fas fa-phone"></i>
                          </button>
                          <button className="p-3 rounded-full bg-green-500 text-white hover:bg-gray-600">
                            <i className="fab fa-whatsapp"></i>
                          </button>
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
                  {property.amenities && property.amenities.length > 0
                    ? property.amenities.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SinglePropertyDetails;

