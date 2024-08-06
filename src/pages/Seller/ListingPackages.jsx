import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handleCheckSubscriptionStatus, handleCreateSubscription } from '../../utils/auth';
import { useStripe, useElements, CardElement, CustomCheckoutProvider } from '@stripe/react-stripe-js';




const ListingPackages = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const [listingCount, setListingCount] = useState(0);
  const user = useSelector(state => state.auth.user); 
  const [daysLeft, setDaysLeft] = useState(0);
  const history = useNavigate();
  const stripe = useStripe()

  useEffect(() => {
    handleCheckSubscriptionStatus(user.id, setIsSubscribed, setSubscriptionExpired, setListingCount,setDaysLeft);
  }, [user.id]);

  // const handleActivatePremium = () => {    
  //   history('/subscription'); 

  // };
  const handleActivatePremium = async () => {
    const subscriptionData = {
      user_id: user.id,
      subscription_type: 'monthly',
      payment_plan: 'premium',
    };

    try {
      await handleCreateSubscription(subscriptionData);
    } catch (error) {
      console.error('Error during subscription activation:', error);
    }
  };
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Our Listing Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Basic/Free</h2>
            <p className="text-2xl font-semibold mb-4">₹0</p>
            <p className="text-gray-600 mb-4">List 5 item for one month at free of cost. You can continue the access and listing by paying for premium account.</p>
            <ul className="text-sm mb-6">
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✓</span>
                Can list 5 items
              </li>
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✓</span>
                Free For one month
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Pay after one month
              </li>
            </ul>
            {isSubscribed && subscriptionExpired ? (
                <p className="text-red-500">Your free subscription has expired. You can renew or upgrade to continue.</p>
              ) : (
                <p className="text-gray-600">
                  {daysLeft > 0 && listingCount? ` ${daysLeft} Days left and ${listingCount} more items left to add. ` : 'Subscription valid for the current period'}
                </p>  
              )}
              <button className="bg-red-500 text-white py-2 px-4 rounded">Current Package</button>
            </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Premium</h2>
            <p className="text-2xl font-semibold mb-4">660 / month</p>
            <p className="text-gray-600 mb-4">List more than 10 properties for one month by premium access. You can continue the access and listing by continuing the payment monthly. Or the yearly payment for subscription is also available.</p>
            <ul className="text-sm mb-6">
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✓</span>
                Can list 10+ items
              </li>
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✓</span>
                Payment for one month
              </li>
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✓</span>
                Payment for one year available
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Get enhanced the ad for a month
              </li>
            </ul>
            {/* <Link to="/subscription" className="bg-red-500 text-white py-2 px-4 rounded block text-center">
                Activate Premium
            </Link> */}
            <button onClick={handleActivatePremium} className="bg-red-500 text-white py-2 px-4 rounded block text-center">
                Activate Premium
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ListingPackages;
