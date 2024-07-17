import React from 'react';

const Search = () => {
  return (
   
    <div className="p-4 w-screen bg-gray-100">
      <header className="relative w-full h-48">
        <img
          src="/public/images/searchbg.jpg"
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center space-x-2 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
            <input
              type="text"
              placeholder="Search Here"
              className="px-4 py-2 text-white bg-transparent border border-gray-300 rounded-l-md focus:outline-none focus:border-red-500"
            />
            <button className="px-4 py-2 text-white bg-red-400 rounded-r-md hover:bg-red-600">SEARCH</button>
          </div>
        </div>
        <div className="absolute top-8 right-8 text-xl font-bold text-white">
          Your Destiny to sell or buy your property and cars...
        </div>
      </header>

      <div className="flex mt-4">
        
      </div>
    </div>
  );
};

export default Search;
