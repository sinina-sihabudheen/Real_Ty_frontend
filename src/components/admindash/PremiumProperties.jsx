
// import React, { useEffect, useState } from 'react';
// import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';

// const standardizeImage = (url, width, height) => {
//   return `${url}?w=${width}&h=${height}&fit=crop`;
// };

// const PremiumProperties = () => {
//   const [villas, setVillas] = useState([]);
//   const [apartments, setApartments] = useState([]);
//   const [lands, setLands] = useState([]);
//   const [allProperties, setAllProperties] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await handleFetchLandsList(setLands, setIsLoading, setError);
//         await handleFetchResidentsList((residents) => {
//           setVillas(residents.filter(r => r.property_type === 'Villa'));
//           setApartments(residents.filter(r => r.property_type === 'Apartment'));
//         });
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError('Error fetching user data');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setAllProperties([...villas, ...apartments, ...lands]);
//   }, [villas, apartments, lands]);

//   const renderFirstImage = (images) => {
//     if (images.length > 0) {
//       return (
//         <img
//           src={standardizeImage(images[0].image, 200, 200)}
//           alt="Property"
//           className="w-full h-24 object-cover rounded"
//         />
//       );
//     }
//     return null;
//   };

//   const renderProperties = (properties) => {
//     return properties.map((property, index) => (
//       <div key={index} className="p-2 bg-gray-50 rounded shadow-md">
//         {renderFirstImage(property.images)}
//         <p className="text-sm font-semibold mt-2">{property.seller.username}</p>
//         <p className="text-sm text-slate-400 mt-2">{property.category}</p>
//       </div>
//     ));
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2 className="font-bold text-lg mb-2">Properties</h2>
//       <div className="flex ">
//         {allProperties.length > 0 ? (
//           renderProperties(allProperties)
//         ) : (
//           <div>No properties found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PremiumProperties;




import React, { useEffect, useState } from 'react';
import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';

const standardizeImage = (url, width, height) => {
  return `${url}?w=${width}&h=${height}&fit=crop`;
};

const PremiumProperties = () => {
  const [villas, setVillas] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [lands, setLands] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const propertiesPerPage = 5;

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
      }
    };

    fetchData();
  }, []);

  const allProperties = [...villas, ...apartments, ...lands];

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

  const handleNextPage = () => {
    if ((currentPage + 1) * propertiesPerPage < allProperties.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderProperties = (properties) => {
    return properties.map((property, index) => (
      <div key={index} className="p-2 bg-gray-50 rounded shadow-md h-48 w-44">
        {renderFirstImage(property.images)}
        <p className="text-sm font-semibold mt-2">{property.seller.username}</p>
        {/* <p className="text-sm font-semibold mt-2">{property.added_date}</p> */}

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


  const paginatedProperties = allProperties.slice(
    currentPage * propertiesPerPage,
    (currentPage + 1) * propertiesPerPage
  );

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Premium Properties</h2>
      <div className="flex justify-between">
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          &#8592;
        </button>
        <div className="flex space-x-4 ">
          {paginatedProperties.length > 0 ? (
            renderProperties(paginatedProperties)
          ) : (
            <div>No properties found</div>
          )}
        </div>
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={handleNextPage}
          disabled={(currentPage + 1) * propertiesPerPage >= allProperties.length}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default PremiumProperties;
