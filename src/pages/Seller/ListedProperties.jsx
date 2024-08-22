
import React, { useState, useEffect } from 'react';
import { handleFetchSellerLands, 
  handleFetchSellerResidents, 
  handleFetchUserData,   
  handleCheckSubscriptionStatus, 
  handleDeleteLandProperty, 
  handleDeleteResidentialProperty } from '../../utils/auth';
import { Link } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const seller = useSelector(state => state.auth.user); 

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const [listingCount, setListingCount] = useState(0); 
  const [daysLeft, setDaysLeft] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState('free');
  const [subscriptionId, setSubscriptionId] = useState(null);


  useEffect(() => {
    handleFetchUserData(setUser, setIsLoading, setError);
    handleFetchSellerLands(setLands);
    handleFetchSellerResidents((residents) => {
      setVillas(residents.filter(r => r.property_type === 'Villa'));
      setApartments(residents.filter(r => r.property_type === 'Apartment'));
    });
  }, []);

  useEffect(() => {
    handleCheckSubscriptionStatus(seller.id, setSubscriptionId, setIsSubscribed, 
      setSubscriptionExpired, setListingCount, setDaysLeft, 
      setSubscriptionType, setPaymentPlan);
console.log(paymentPlan);
  }, [seller.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
console.log("PAymentplan",paymentPlan,subscriptionExpired);
const handleVideoClick = (property) => {
    setSelectedProperty(property);
  };

  const handleImagesClick = (property) => {
    setSelectedProperty(property);
  };
  const handleDelete = () => {
    setIsModalOpen(true); 
  };
  const onCancel = () => {
    setIsModalOpen(false); 
  };
  const onConfirm = async () => {
    setIsModalOpen(false); 

    try {
      if (category === 'Land') {
        await handleDeleteLandProperty(id);
      } else if (category === 'Apartment' || category === 'Villa') {
        await handleDeleteResidentialProperty(id);
      }
      navigate('/listedproperties'); 
      toast.success('Property deleted successfully.');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property.');
    }
  };

  const renderVideoButton = (property) => {
    // return property.video ? (
    //   <button
    //     onClick={() => handleVideoClick(property)}
    //     className="text-slate-500 w-full rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block"
    //   >
    //     Video Added
    //   </button>
    // ) : (
    //   <button
    //     onClick={() => handleVideoClick(property)}
    //     className="text-slate-500 w-full rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block"
    //   >
    //     + Video
    //   </button>
    // );
    return property.video  (
      <button
        onClick={() => handleVideoClick(property)}
        className="text-slate-500 w-full rounded bg-white-600 shadow-md hover:bg-gray-100 mt-2 block"
      >
        Video Added
      </button>
    ) 
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
        <Link to={`/seller_singleproperty/${property.id}/${property.property_type || 'Land'}`}>
          {renderFirstImage(property.images)}
          <h3 className="mt-2 font-semibold"> {property.category}</h3>
          <h3 className="mt-2 font-semibold">Price: ₹{Math.round(property.price)} Lakhs</h3>
          {/* <h3 className="mt-2 font-semibold">{Math.round(property.size || property.area)} {property.property_type ? 'square feet' : 'cents'}</h3> */}
          <h3 className="mt-2 font-semibold">{property.property_type ? 'Size: ' : 'Area: '}{Math.round(property.size || property.area)} {property.property_type ? 'sqft' : 'cents'}</h3>

          <p>Location: {property.location}</p>
        </Link>
        {/* <div className='flex space-x-2'>
          {renderVideoButton(property)}
          {renderImagesButton(property)}
        </div> */}
        <div className='py-2'>
          <Link to={`/edit_property/${property.id}/${property.category}`} className="text-white-300 w-full rounded hover:bg-gray-200 shadow-md bg-blue-400 hover:text-slate-700 mt-2 block text-center">
            Edit
          </Link>
        </div>
        <div className='py-2'>
          <button onClick={handleDelete} className="text-white-300 w-full rounded hover:bg-gray-200 shadow-md bg-red-400 hover:text-gray-500 mt-2 block text-center">
              Delete
          </button>
        </div>
      </div>
    ));
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
              {/* <p>{daysLeft} days to end</p> */}

            </div>
          </div>
          <div className="mt-8 flex items-center space-x-4">
              <div>
                <Link to="/userprofile" >
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

              {/* <div className="flex space-x-8">
                
                {(paymentPlan === 'premium' && !subscriptionExpired) ||
                  (paymentPlan === 'basic' && !subscriptionExpired && listingCount < 5) ? (
                    <div>
                    
                    <Link to="/property_type" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
                      <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">Add Property</button>
                    </Link>
                    </div>
                    
                  ) : (
                    <div><span>{subscriptionExpired ? "Your subscription has expired. Please renew to add properties." : "Listing limit reached. Please upgrade your plan to add more properties."}</span></div>
                  )}
                {paymentPlan==='basic' && (
                  <div>
                   <span>You can add {5-listingCount} properties for one month.</span>
                   <Link to="/listing_package" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
                     <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">For Premium Account</button>
                   </Link></div>
                )}
                {paymentPlan==='premium' && subscriptionExpired && (
                   
                   <Link to="/subscription" className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
                     <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">Go To Payment</button>
                   </Link>
                )}
                {paymentPlan==='premium' && !subscriptionExpired && (
                   
                  <Link to={`/invoice/${subscriptionId}`} className="text-gray-500 hover:text-gray-300 px-3 py-10 text-sm font-medium">
                      <button className="w-full bg-gray-400 text-white py-2 rounded-md mb-2">Payment History</button>
                  </Link>
                )}
              </div>             */}
            </div>
        </div>
        { !(lands.length==0 && villas.length==0 && apartments.length==0) ? (
              <div className="w-3/4 p-4 mx-auto flex space-x-2">
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
        ):(
        <div className="w-3/4 p-4 mx-auto flex space-x-2"><h3>No Properties Added</h3></div>
        )}

      {/* {selectedProperty && (
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
      )} */}
       {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this property?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ListedProperties;
