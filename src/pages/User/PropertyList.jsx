
// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar';
// import Filter from '../../components/listing/Filter';
// import Search from '../../components/listing/Search';
// import Footer from '../../components/Footer';
// import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';
// import { Link } from 'react-router-dom';

// const standardizeImage = (url, width, height) => {
//   return `${url}?w=${width}&h=${height}&fit=crop`;
// };

// const PropertyList = () => {
//   const [villas, setVillas] = useState([]);
//   const [apartments, setApartments] = useState([]);
//   const [lands, setLands] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
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
//     console.log('Villas:', villas);
//     console.log('Apartments:', apartments);
//     console.log('Lands:', lands);
//     setFilteredProperties([...villas, ...apartments, ...lands]);
//   }, [villas, apartments, lands]);

//   const handleFilterChange = (type, value) => {
//     let filtered = [...villas, ...apartments, ...lands];

//     console.log('Filter type:', type);
//     console.log('Filter value:', value);

//     if (type === 'category' && value !== 'All') {
//       filtered = filtered.filter(property => {
//         console.log('Property category:', property.category);
//         return property.category === value;
//       });
//     }
//     if (type === 'price') {
//       filtered = filtered.filter(property => {
//         const price = parseFloat(property.price);
//         switch (value) {
//           case 'Below 25 lakhs':
//             return price < 25;
//           case '25 to 40 lakhs':
//             return price >= 25 && price <= 40;
//           case '40 to 60 lakhs':
//             return price > 40 && price <= 60;
//           case '60 to 80 lakhs':
//             return price > 60 && price <= 80;
//           case '80 lakhs and Above':
//             return price > 80;
//           default:
//             return true;
//         }
//       });
//     }
//     if (type === 'region') {
//       filtered = filtered.filter(property => property.region === value);
//     }

//     console.log('Filtered properties:', filtered);
//     setFilteredProperties(filtered);
//   };

//   const renderFirstImage = (images) => {
//     if (images.length > 0) {
//       return (
//         <img
//           src={standardizeImage(images[0].image, 100, 100)}
//           alt="Property"
//           className="w-full h-48 object-cover rounded"
//         />
//       );
//     }
//     return null;
//   };

//   const renderProperties = (properties) => {
//     return properties.map((property, index) => (
//       <div key={index} className="p-4 bg-gray-50 rounded shadow-md w-80">
//         <Link to={`/single_property/${property.id}/${property.category}`}>
//           {renderFirstImage(property.images)}
//           <h3 className="mt-2 font-semibold">Price ₹{Math.round(property.price)} Lakhs</h3>
//           <h3 className="mt-2 font-semibold">{property.property_type ? 'Size ' : 'Area '}{Math.round(property.size || property.area)} {property.property_type ? 'sqft' : 'cents'}</h3>
//           <p>Location {property.location}</p>
//           <p>Seller {property.seller.username}</p>
//         </Link>
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
//     <>
//       <Navbar />
//       <Search />
//       <div className='flex'>
//         <Filter onFilterChange={handleFilterChange} />
//         <div>
//           <div className="w-3/4 p-4">
//             {filteredProperties.length > 0 ? (
//               <section className="mb-6">
//                 <h2 className="font-bold mb-4">Newly Added Properties</h2>
//                 <div className="grid grid-cols-3 gap-4 space-x-5">
//                   {renderProperties(filteredProperties)}
//                 </div>
//               </section>
//             ) : (
//               <div>No properties found</div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PropertyList;

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Filter from '../../components/listing/Filter';
import Search from '../../components/listing/Search';
import Footer from '../../components/Footer';
import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';
import { Link } from 'react-router-dom';

const standardizeImage = (url, width, height) => {
  return `${url}?w=${width}&h=${height}&fit=crop`;
};

const PropertyList = () => {
  const [villas, setVillas] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [lands, setLands] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
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
    handleSearch();
  }, [villas, apartments, lands, searchQuery]);

  const handleFilterChange = (type, value) => {
    let filtered = [...villas, ...apartments, ...lands];

    if (type === 'category' && value !== 'All') {
      filtered = filtered.filter(property => property.category === value);
    }
    if (type === 'price') {
      filtered = filtered.filter(property => {
        const price = parseFloat(property.price);
        switch (value) {
          case 'Below 25 lakhs':
            return price < 25;
          case '25 to 40 lakhs':
            return price >= 25 && price <= 40;
          case '40 to 60 lakhs':
            return price > 40 && price <= 60;
          case '60 to 80 lakhs':
            return price > 60 && price <= 80;
          case '80 lakhs and Above':
            return price > 80;
          default:
            return true;
        }
      });
    }
    if (type === 'region') {
      filtered = filtered.filter(property => property.region === value);
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = [...villas, ...apartments, ...lands].filter(property => {
      return (
        property.location.toLowerCase().includes(query) ||
        property.seller.username.toLowerCase().includes(query) ||
        property.category.toLowerCase().includes(query)
      );
    });
    setFilteredProperties(filtered);
  };

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

  const renderProperties = (properties) => {
    return properties.map((property, index) => (
      <div key={index} className="p-4 bg-gray-50 rounded shadow-md w-80">
        <Link to={`/single_property/${property.id}/${property.category}`}>
          {renderFirstImage(property.images)}
          <h3 className="mt-2 font-semibold">Price ₹{Math.round(property.price)} Lakhs</h3>
          <h3 className="mt-2 font-semibold">{property.property_type ? 'Size ' : 'Area '}{Math.round(property.size || property.area)} {property.property_type ? 'sqft' : 'cents'}</h3>
          <p>Location {property.location}</p>
          <p>Seller {property.seller.username}</p>
        </Link>
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
    <>
      <Navbar />
      <Search onSearch={setSearchQuery} /> {/* Pass setSearchQuery as onSearch */}
      <div className='flex'>
        <Filter onFilterChange={handleFilterChange} />
        <div>
          <div className="w-3/4 p-4">
            {filteredProperties.length > 0 ? (
              <section className="mb-6">
                <h2 className="font-bold mb-4">Newly Added Properties</h2>
                <div className="grid grid-cols-3 gap-4 space-x-5">
                  {renderProperties(filteredProperties)}
                </div>
              </section>
            ) : (
              <div>No properties found</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
