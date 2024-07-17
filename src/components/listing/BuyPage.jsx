import React from 'react';
import Filter from './Filter';
import Search from './Search';

const BuyPage = () => {
  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <Search />
        {/* <div className="flex space-x-4">
          <button className="bg-white-500 text-gray-500 px-4 py-2 rounded">Buy House/Villa</button>
          <button className="bg-white-500 text-gray-500 px-4 py-2 rounded">Buy Apartment</button>
          <button className="bg-white-500 text-gray-500 px-4 py-2 rounded">Buy Land</button>
        </div> */}
      </header>
      <main className="flex">
        <Filter />

      </main>
    </div>
  );
};

export default BuyPage;
