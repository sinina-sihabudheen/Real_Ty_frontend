
// import React, { useState, useEffect } from 'react';
// import { handleFetchSellerLands, handleFetchSellerResidents, handleFetchUserData } from '../../utils/auth';
// import { Link } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

// export const ListedProperties = () => {
//   const [user, setUser] = useState(null);
//   const [lands, setLands] = useState([]);
//   const [villas, setVillas] = useState([]);
//   const [apartments, setApartments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProperty, setSelectedProperty] = useState(null);

//   useEffect(() => {
//     handleFetchUserData(setUser, setIsLoading, setError);
//     handleFetchSellerLands(setLands);
//     handleFetchSellerResidents((residents) => {
//       setVillas(residents.filter(r => r.property_type === 'Villa'));
//       setApartments(residents.filter(r => r.property_type === 'Apartment'));
//     });
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const renderFirstImage = (images) => {
//     if (images.length > 0) {
//       return <img src={images[0].image} alt="Property" className="w-full h-32 object-cover rounded" />;
//     }
//     return null;
//   };

//   const handleVideoClick = (property) => {
//     setSelectedProperty(property);
//   };

//   const handleImagesClick = (property) => {
//     setSelectedProperty(property);
//   };

//   const renderVideoButton = (property) => {
//     return property.video ? (
//       <button onClick={() => handleVideoClick(property)} className="text-slate-500 w-6/12 rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block">
//         Video Added
//       </button>
//     ) : 
//     <button onClick={() => handleVideoClick(property)} className="text-slate-500 w-6/12 rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block">
//      + Video
//   </button>;
//   };

//   const renderImagesButton = (property) => {
//     return property.images.length > 0 ? (
//       <button onClick={() => handleImagesClick(property)} className="text-slate-500 w-6/12 rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block">
//         {property.images.length} Images added
//       </button>
//     ) : null;
//   };

//   const renderProperties = (properties) => {
//     return properties.map((property) => (
//       <div key={property.id} className="p-4 bg-white rounded shadow-md">
//         <Link to={`/single_property/${property.id}/${property.property_type || 'Land'}`}>
//           {renderFirstImage(property.images)}
//           <h3 className="mt-2 font-semibold">{Math.round(property.price)} Lakhs</h3>
//           <h3 className="mt-2 font-semibold">{Math.round(property.size || property.area)} {property.property_type ? 'square feet' : 'cents'}</h3>
//           <p>{property.location}</p>
//         </Link>
//         <div className='flex space-x-10'>
//             {renderVideoButton(property)}
//             {renderImagesButton(property)}
//         </div>
//         <div className='py-2'>
//           <Link to={`/edit_property/${property.id}`} className="text-gray-500 w-full rounded bg-gray-200 shadow-md hover:bg-slate-300 hover:text-slate-700 mt-2 block text-center">
//             Edit
//           </Link>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="w-3/4 bg-gray-100 rounded-lg p-4">
//         <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
//         <div className="mt-4 flex items-center space-x-4">
//           <img 
//             src={user.profile_image ? user.profile_image : '/images/user.png'}                  
//             alt="Profile" 
//             className="w-16 h-16 rounded-full" 
//           />
//           <div>
//             <h3 className="text-lg text-gray-600 font-semibold uppercase">{user.username}</h3>
//             <p className="text-gray-500">Email: {user.email}</p>
//             <p className="text-gray-500 capitalize">Address: {user.address}</p>
//             <p className="text-gray-500">Contact Number: +91 {user.contact_number}</p>
//           </div>
//         </div>
//       </div>

//       <div className="w-3/4 p-4">
//         {lands.length > 0 && (
//           <>
//             <h2 className="font-bold mb-4">Listed Lands</h2>
//             <section className="mb-6">
//               <div className="grid grid-cols-3 gap-4">
//                 {renderProperties(lands)}
//               </div>
//             </section>
//           </>
//         )}

//         {villas.length > 0 && (
//           <>
//             <h2 className="font-bold mb-4">Listed Villas</h2>
//             <section className="mb-6">
//               <div className="grid grid-cols-3 gap-4">
//                 {renderProperties(villas)}
//               </div>
//             </section>
//           </>
//         )}

//         {apartments.length > 0 && (
//           <>
//             <h2 className="font-bold mb-4">Listed Apartments</h2>
//             <section className="mb-6">
//               <div className="grid grid-cols-3 gap-4">
//                 {renderProperties(apartments)}
//               </div>
//             </section>
//           </>
//         )}

//         <div className="flex space-x-8">
//           <Link to="/property_type" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
//             <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">Add Property</button>
//           </Link>
//         </div>
//       </div>
//       {selectedProperty && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded shadow-md w-3/4">
//             {selectedProperty.video && (
//               <div>
//                 <video width="100%" controls>
//                   <source src={selectedProperty.video} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//                 <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
//                   Change Video
//                 </button>
//                 <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded ml-2">
//                   Delete Video
//                 </button>
//               </div>
//             )}
//             {selectedProperty.images.length > 0 && (
//               <div>
//                 {selectedProperty.images.map((image) => (
//                   <div key={image.id} className="mt-2">
//                     <img src={image.image} alt="Property" className="w-full h-32 object-cover rounded" />
//                     <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
//                       Change Image
//                     </button>
//                     <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded ml-2">
//                       Delete Image
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button onClick={() => setSelectedProperty(null)} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default ListedProperties;
 

import React, { useState, useEffect } from 'react';
import { handleFetchSellerLands, handleFetchSellerResidents, handleFetchUserData } from '../../utils/auth';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const standardizeImage = (url, width, height) => {
  return `${url}?w=${width}&h=${height}&fit=crop`;
};

export const ListedProperties = () => {
  const [user, setUser] = useState(null);
  const [lands, setLands] = useState([]);
  const [villas, setVillas] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  // Render the first image of the property, standardizing the size
  const renderFirstImage = (images) => {
    if (images.length > 0) {
      return (
        <img
          src={standardizeImage(images[0].image, 100, 100)}
          alt="Property"
          className="w-full h-48 object-cover rounded"
        />
      );
    }
    return null;
  };

  const handleVideoClick = (property) => {
    setSelectedProperty(property);
  };

  const handleImagesClick = (property) => {
    setSelectedProperty(property);
  };

  const renderVideoButton = (property) => {
    return property.video ? (
      <button
        onClick={() => handleVideoClick(property)}
        className="text-slate-500 w-full rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block"
      >
        Video Added
      </button>
    ) : (
      <button
        onClick={() => handleVideoClick(property)}
        className="text-slate-500 w-full rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block"
      >
        + Video
      </button>
    );
  };

  const renderImagesButton = (property) => {
    return property.images.length > 0 ? (
      <button
        onClick={() => handleImagesClick(property)}
        className="text-slate-500 w-full rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block"
      >
        {property.images.length} Images added
      </button>
    ) : null;
  };

  const renderProperties = (properties) => {
    return properties.map((property) => (
      <div key={property.id} className="p-4 bg-white rounded shadow-md w-80">
        <Link to={`/single_property/${property.id}/${property.property_type || 'Land'}`}>
          {renderFirstImage(property.images)}
          <h3 className="mt-2 font-semibold">{Math.round(property.price)} Lakhs</h3>
          <h3 className="mt-2 font-semibold">{Math.round(property.size || property.area)} {property.property_type ? 'square feet' : 'cents'}</h3>
          <p>{property.location}</p>
        </Link>
        <div className='flex space-x-2'>
          {renderVideoButton(property)}
          {renderImagesButton(property)}
        </div>
        <div className='py-2'>
          <Link to={`/edit_property/${property.id}/${property.category}`} className="text-gray-500 w-full rounded bg-gray-200 shadow-md hover:bg-slate-300 hover:text-slate-700 mt-2 block text-center">
            Edit
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="w-3/4 bg-gray-100 rounded-lg p-6 mx-auto">
        <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
        <div className="mt-8 flex items-center space-x-4">
          <div>
            <Link to="/agentprofile" >
                <img
                src={user.profile_image ? user.profile_image : '/images/user.png'}
                alt="Profile"
                className="w-16 h-16 rounded-full"
                />
            </Link>
          </div>
          
          <div>
            <h3 className="text-lg text-gray-600 font-semibold uppercase">{user.username}</h3>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500 capitalize">Address: {user.address}</p>
            <p className="text-gray-500">Contact Number: +91 {user.contact_number ? user.contact_number : null}</p>
          </div>
          <div className="flex space-x-8">
            <Link to="/property_type" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
              <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">Add Property</button>
            </Link>
          </div>
          
        </div>
      </div>

      <div className="w-3/4 p-4 mx-auto">
        {lands.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Listed Lands</h2>
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {renderProperties(lands)}
              </div>
            </section>
          </>
        )}

        {villas.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Listed Villas</h2>
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {renderProperties(villas)}
              </div>
            </section>
          </>
        )}

        {apartments.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Listed Apartments</h2>
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {renderProperties(apartments)}
              </div>
            </section>
          </>
        )}

       
      </div>
      {selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-3/4">
            {selectedProperty.video && (
              <div>
                <video width="100%" controls>
                  <source src={selectedProperty.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
                  Change Video
                </button>
                <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded ml-2">
                  Delete Video
                </button>
              </div>
            )}
            {selectedProperty.images.length > 0 && (
              <div>
                {selectedProperty.images.map((image) => (
                  <div key={image.id} className="mt-2">
                    <img src={standardizeImage(image.image, 300, 200)} alt="Property" className="w-full h-32 object-cover rounded" />
                    <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
                      Change Image
                    </button>
                    <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded ml-2">
                      Delete Image
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setSelectedProperty(null)} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ListedProperties;
