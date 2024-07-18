import React from 'react';

const PropertyForm = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4">
        <img src="/images/REAL-TY.png" alt="Realty Logo" className="w-24 h-24" />
      </div>
      <h1 className="text-xl font-bold mb-4">Enter the Land details here..</h1>
      <form className="w-full max-w-md space-y-4">
        <input type="file" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload image" />
        <input type="file" accept="video/*" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Upload video" />
        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Phone Number" />
        <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Price" />
        <textarea className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Description in short"></textarea>
        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Area" />
        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Landlord" />
        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Remarkable neighborhood place" />
        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded" placeholder="Location" />
        <div className="flex justify-between">
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded">EDIT</button>
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">NEXT</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
