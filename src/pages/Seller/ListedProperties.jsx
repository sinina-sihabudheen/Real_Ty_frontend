import React, { useState, useEffect } from 'react';
import { handleFetchSellerLands, 
  handleFetchSellerResidents, 
  handleCheckSubscriptionStatus,
  handleFetchUserData } from '../../utils/auth';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';

const standardizeImage = (url, width, height) => {
  return `${url}?w=${width}&h=${height}&fit=crop`;
};

export const ListedProperties = () => {
  const [user, setUser] = useState(null);
  const [lands, setLands] = useState([]);
  const [villas, setVillas] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [residents, setResidents] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const [listingCount, setListingCount] = useState(0); 
  const [daysLeft, setDaysLeft] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState('free');
  const [subscriptionId, setSubscriptionId] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const seller = useSelector(state => state.auth.user); 

  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 6; 

  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);
    handleFetchSellerLands(setLands);
    handleFetchSellerResidents(setResidents);
  }, []);

  useEffect(() => {
    if (residents.length > 0) {
      setVillas(residents.filter(r => r.property_type === 'Villa'));
      setApartments(residents.filter(r => r.property_type === 'Apartment'));
    }
  }, [residents]);

  useEffect(() => {
    handleCheckSubscriptionStatus(seller.id, setSubscriptionId, setIsSubscribed, 
      setSubscriptionExpired, setListingCount, setDaysLeft, 
      setSubscriptionType, setPaymentPlan);
  }, [seller.id]);
  const getLocationName = (location) => {    
    const locationParts = location.split(','); 
    const mainLocation = locationParts.slice(0, 2).join(','); 
    return mainLocation;
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
    return properties.map((property) => (
      <div key={property.id} className="p-4 bg-white rounded shadow-md w-80">
        <Link to={`/seller_singleproperty/${property.id}/${property.property_type || 'Land'}`}>
          {renderFirstImage(property.images)}
          <h3 className="mt-2 font-semibold"> {property.category}</h3>
          <h3 className="mt-2 font-semibold">Price: ₹{Math.round(property.price)} Lakhs</h3>
          <h3 className="mt-2 font-semibold">
            {property.property_type ? 'Size: ' : 'Area: '}
            {Math.round(property.size || property.area)}
            {property.property_type ? 'sqft' : 'cents'}
          </h3>
          <p>Location: {getLocationName(property.location)}</p>
        </Link>
      </div>
    ));
  };

  const allProperties = [...lands, ...villas, ...apartments];

  // Pagination Logic
  const startIndex = currentPage * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const paginatedProperties = allProperties.slice(startIndex, endIndex);
  const pageCount = Math.ceil(allProperties.length / propertiesPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
 
  return (
    <>
      <Navbar />
      <div className="w-2/4 bg-gray-100 rounded-lg p-6 mx-auto">
          <div className='flex justify-between items-center'>
            <h2 className="text-xl text-gray-700 font-bold">My Profile</h2>
            <div className='flex space-x-1'>
              <p className='text-lg text-gray-500'>Subscription Status:</p>
              <h1 className='text-blue-600 text-xl capitalize'>{paymentPlan}{subscriptionExpired}</h1>
          

            </div>
          </div>
          <div className="mt-8 flex items-center space-x-4">
              <div>
                <Link to="/userprofile">
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <img
                  src='/images/user.png'
                  alt="Default Profile"
                  className="w-16 h-16 rounded-full"
                />
              )}
            </Link>
              </div>              
              <div>
                <h3 className="text-lg text-gray-600 font-semibold uppercase">
                  {user?.username || 'Username not available'}
                </h3>
                <p className="text-gray-500">Email: {user?.email || 'Email not available'}</p>
                <p className="text-gray-500 capitalize">Address: {user?.address || 'Address not available'}</p>
                <p className="text-gray-500">Contact Number: +91 {user?.contact_number || 'Not available'}</p>
              </div>
              <div className="flex space-x-4">
                {(paymentPlan === 'premium' && !subscriptionExpired) ||
                (paymentPlan === 'basic' && !subscriptionExpired && listingCount < 5) ? (
                  <Link to="/property_type" className="text-gray-500 hover:text-gray-300 text-sm font-medium">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
                      Add Property
                    </button>
                  </Link>
                ) : (
                  <span>
                    {subscriptionExpired 
                      ? "Your subscription has expired. Please renew to add properties." 
                      : "Listing limit reached. Please upgrade your plan to add more properties."
                    }
                  </span>
                )}

                {paymentPlan === 'basic' && (
                  <Link to="/listing_package" className="text-gray-500 hover:text-gray-300 text-sm font-medium">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
                      For Premium Account
                    </button>
                  </Link>
                )}

                {paymentPlan === 'premium' && subscriptionExpired && (
                  <Link to="/subscription" className="text-gray-500 hover:text-gray-300 text-sm font-medium">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
                      Go To Payment
                    </button>
                  </Link>
                )}

                {paymentPlan === 'premium' && !subscriptionExpired && (
                  <Link to={`/invoice/${subscriptionId}`} className="text-gray-500 hover:text-gray-300 text-sm font-medium">
                    <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
                      Payment History
                    </button>
                  </Link>
                )}
              </div>

             
            </div>
        </div>

      
      {allProperties.length > 0 ? (
        <div className="w-3/4 p-3 mx-auto grid grid-cols-3 gap-4">
          {renderProperties(paginatedProperties)}
        </div>
      ) : (
        <div className="w-3/4 p-4 mx-auto">
          <h3>No Properties Added</h3>
        </div>
      )}

      {/* Conditionally Render Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-6">
         
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
        </div>
      )}

      <Footer />
    </>
  );
};

export default ListedProperties;
