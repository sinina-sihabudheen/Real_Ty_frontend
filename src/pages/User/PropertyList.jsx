import React, { useEffect, useState } from 'react'
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
    const [apartments, setApartments] =useState([]);
    const [lands, setLands] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = () => {
            try {
                handleFetchLandsList(setLands, setIsLoading, setError);
                handleFetchResidentsList((residents) => {
                    setVillas(residents.filter(r => r.property_type === 'Villa'));
                    setApartments(residents.filter(r => r.property_type === 'Apartment'));
                  });
                console.log("VILLAS:",villas);
                console.log("APARTMENTS:",apartments);

            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
        return properties.map((property) => (
          <div key={property.id} className="p-4 bg-white rounded shadow-md w-80">
            <Link to={`/single_property/${property.id}/${property.property_type || 'Land'}`}>
              {renderFirstImage(property.images)}
              <h3 className="mt-2 font-semibold">{Math.round(property.price)} Lakhs</h3>
              <h3 className="mt-2 font-semibold">{Math.round(property.size || property.area)} {property.property_type ? 'square feet' : 'cents'}</h3>
              <p>{property.location}</p>
              <p>{property.seller.user.username}</p>

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
    <Search />
    
    <div className='flex'>
    <Filter />
    <div>
        <div className="w-3/4 p-4">
        {villas.length > 0 && (
            <section className="mb-6">
                <h2 className="font-bold mb-4">Newly Added Villas</h2>
                
                <div className="grid grid-cols-3 gap-4">
                    {renderProperties(villas)}
                </div>
                    
            </section>
        )}
        {apartments.length > 0 && (
        <section className="mb-6">
            <h2 className="font-bold mb-4">Newly Added Apartments</h2>
            
            <div className="grid grid-cols-3 gap-4">
                {renderProperties(apartments)}
            </div>
          
        </section>
        )}
        {lands.length > 0 && (
        <section className="mb-6">
            <h2 className="font-bold mb-4">Newly Added Lands</h2>
            
            <div className="grid grid-cols-3 gap-4">
                {renderProperties(lands)}
            </div>
            
        </section> 
        )}    
        </div>
        </div>
        </div>
        <Footer />
    </>
  )
};
export default PropertyList;



