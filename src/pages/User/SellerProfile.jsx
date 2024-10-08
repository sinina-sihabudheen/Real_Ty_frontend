import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { handleFetchSellerProfileLands, handleFetchSellerProfile, handleFetchSellerProfileResidents} from '../../utils/auth';
import { toast } from 'sonner';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const standardizeImage = (url, width, height) => {
    return `${url}?w=${width}&h=${height}&fit=crop`;
  };

const SellerProfile = () => {
    const { userId } = useParams();
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lands, setLands] = useState([]);
    const [residents, setResidents] = useState([])
    const [villas, setVillas] = useState([]);
    const [apartments, setApartments] = useState([]);

   
    useEffect(() => {
      const fetchData = async () => {
          try {
            setIsLoading(true);
            const sellerResponse = await handleFetchSellerProfile(userId);
            setSeller(sellerResponse.data);

            await handleFetchSellerProfileLands(userId,setLands);
            await handleFetchSellerProfileResidents(userId,setResidents)

            const filteredResidents = Array.isArray(residents) ? residents : [];
            setVillas(filteredResidents.filter(r => r.property_type === 'Villa'));
            setApartments(filteredResidents.filter(r => r.property_type === 'Apartment'));

            setIsLoading(false);
          } catch (err) {
              setError(err.message);
              setIsLoading(false);
          }
      };

      if (userId) {
          fetchData();
      }
  }, [userId]);
  

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
              <h3 className="mt-2 font-semibold">{property.category}</h3>
              <h3 className="mt-2 font-semibold">{Math.round(property.price)} Lakhs</h3>
              <h3 className="mt-2 font-semibold">{Math.round(property.size || property.area)} {property.property_type ? 'square feet' : 'cents'}</h3>
              <p>{property.location}</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {seller ? (
        <div>
        <div className='flex space-x-5'>     
            <div className="w-3/4 bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl text-gray-700 font-bold">Seller Profile</h2>
              <div className="mt-4 flex items-center space-x-4">
                <img 
                  src={seller.profile_image? seller.profile_image : '/images/user.png'}                  
                  alt="Profile" 
                  className="w-20 h-20 rounded-full" 
                />
              
                <div>
                  <h3 className="text-lg text-gray-600 font-semibold uppercase">{seller.username}</h3>
                  <p className="text-gray-500">Email: {seller.email}</p>
                  {/* <p className="text-gray-500">DOB: {seller.user.date_of_birth}</p> */}
                  {seller.address ? <p className="text-gray-500 capitalize">Addresss: {seller.address} </p>: null}
                   {seller.contact_number ? <p className="text-gray-500">Contact Number: {seller.contact_number} </p>: null}       
                  <p className="text-gray-500">Agency Name: {seller.agency_name }</p>
                </div>
              </div>
          </div>
       </div>
        <div className="w-3/4 p-4 mx-auto">
        {lands.length > 0 && (
          <>
            {/* <h2 className="font-bold mb-4">Listed Lands</h2> */}
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {renderProperties(lands)}
              </div>
            </section>
          </>
        )}

        {villas.length > 0 && (
          <>
            {/* <h2 className="font-bold mb-4">Listed Villas</h2> */}
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {renderProperties(villas)}
              </div>
            </section>
          </>
        )}

        {apartments.length > 0 && (
          <>
            {/* <h2 className="font-bold mb-4">Listed Apartments</h2> */}
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                {renderProperties(apartments)}
              </div>
            </section>
          </>
        )}
      </div>
          
       </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default SellerProfile;