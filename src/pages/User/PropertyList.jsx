

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Filter from '../../components/listing/Filter';
import Search from '../../components/listing/Search';
import Footer from '../../components/Footer';
import { handleFetchLandsList, handleFetchResidentsList } from '../../utils/adminAuth';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

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
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const itemsPerPage = 6; // Number of properties per page

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

  const getLocationName = (location) => {    
    const locationParts = location.split(','); 
    const mainLocation = locationParts.slice(0, 2).join(','); 
    return mainLocation;
  };

  const handleFilterChange = (type, value) => {
    let filtered = [...villas, ...apartments, ...lands];
  
    if (type === 'category' && value !== 'All') {
      filtered = filtered.filter(property => property.category === value);
    }
  
    if (type === 'price' && value !== '') {
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
  
    if (type === 'area' && value !== '') {
      filtered = filtered.filter(property => {
        const area = parseFloat(property.area);
        switch (value) {
          case 'Below 10 cents':
            return area < 10;
          case '10 to 20 cents':
            return area >= 10 && area <= 20;
          case '20 to 40 cents':
            return area > 20 && area <= 40;
          case '40 to 60 cents':
            return area > 40 && area <= 60;
          case '60 to 80 cents':
            return area > 60 && area <= 80;
          case '80 cents and Above':
            return area > 80;
          default:
            return true;
        }
      });
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
    setCurrentPage(0); // Reset to first page after searching
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
          <p>Location {getLocationName(property.location)}</p>
          <p>Seller {property.seller.username}</p>
          <p>{property.category}</p>
        </Link>
      </div>
    ));
  };

  const pageCount = Math.ceil(filteredProperties.length / itemsPerPage); 

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); 
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <div className='relative z-50'>
      <Navbar />
      </div>
      <Search onSearch={setSearchQuery} />
      <div className="container mx-auto">
        <div className="flex">
          <Filter onFilterChange={handleFilterChange} />
          <div className="flex-1">
            <div className="p-4">
              {selectedProperties.length > 0 ? (
                <section className="mb-6">
                  <h2 className="font-bold mb-4">Newly Added Properties</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {renderProperties(selectedProperties)}
                  </div>
                  {pageCount > 1 && ( 
                    
                    <ReactPaginate
                      previousLabel={'Prev'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      className="flex justify-center space-x-4 mt-4"
                      pageClassName="bg-gray-200 px-4 py-2 rounded hover:bg-blue-300"
                      // previousClassName="bg-gray-500 px-4 py-2 rounded text-white hover:bg-blue-500"
                      // nextClassName="bg-gray-500 px-4 py-2 rounded text-white hover:bg-blue-500"
                      previousClassName="hidden"
                      nextClassName="hidden"
                      disabledClassName={'disabled'}
                      
                    />
                  )}
                </section>
              ) : (
                <div>No properties found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
