

import React from 'react';

const Search = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="p-4 w-screen bg-gray-100">

      <header className="relative w-full h-48">
        <img
          src="/public/images/searchbg.jpg"
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">

          <div className="flex items-center space-x-2 p-4 w-6/12 bg-gray-700 bg-opacity-50 rounded-lg">
            <input
              type="text"
              placeholder="Search by location, seller, or category..."
              onChange={handleInputChange}
              className="px-4 py-2 w-full text-white bg-transparent border border-gray-300 rounded-l-md focus:outline-none focus:border-red-500 placeholder-white"
            />
          </div>
        </div>
        <div className="absolute px-20 top-8 right-8 text-xl font-bold">
            Your Destiny to buy or sell your property...
        </div>
      </header>
    </div>
  );
};

export default Search;
