import React from 'react';

const ListingPackages = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Our Listing Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Basic/Free</h2>
            <p className="text-2xl font-semibold mb-4">₹0</p>
            <p className="text-gray-600 mb-4">List one item for one month at free of cost. You can continue the access and listing by paying for premium account.</p>
            <ul className="text-sm mb-6">
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✓</span>
                Can list 10 item
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
            <button className="bg-red-300 text-white py-2 px-4 rounded">You Current Package</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Premium</h2>
            <p className="text-2xl font-semibold mb-4">₹1000 / month</p>
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
            <button className="bg-red-500 text-white py-2 px-4 rounded">Activate Premium</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPackages;
