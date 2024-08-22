
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';

import {
  handleFetchRegions,
  handleRegionAdd,
  handleRegionDelete
} from '../../utils/adminAuth';

const RegionsList = () => {
  const [regions, setRegions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');
  const [deleteRegionId, setDeleteRegionId] = useState(null);

  useEffect(() => {
    handleFetchRegions(setRegions);
  }, []);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAddRegion = async (e) => {
    e.preventDefault();
    try {
      
      const response = await handleRegionAdd({name : newRegionName});
      setRegions([...regions, response.data]);
      toast.success('Region added successfully');
      setShowAddForm(false);
      setNewRegionName('');
    } catch (error) {
      toast.error('Failed to add region');
    }
  };

  const confirmDeleteRegion = async () => {
    try {
      await handleRegionDelete(deleteRegionId);
      setRegions(regions.filter(region => region.id !== deleteRegionId));
      toast.success('Region deleted successfully');
      setDeleteRegionId(null);
    } catch (error) {
      toast.error('Failed to delete region');
    }
  };


  return (
    <div className="flex">
      <Sidebar />
      <div className='w-full py-8'>
        <AdminHeader />
        <div className="w-3/4 bg-white">
          <h2 className='text-gray-600 font-semibold text-xl'>All Regions</h2>
          <button
            onClick={toggleAddForm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New
          </button>

          {/* Add New Region Form */}
          {showAddForm && (
            <div className="p-4 mt-4 bg-gray-200 rounded shadow-md">
              <form onSubmit={handleAddRegion}>
                <label className="block text-gray-700 font-bold mb-2">
                  Region Name:
                </label>
                <input
                  type="text"
                  value={newRegionName}
                  onChange={(e) => setNewRegionName(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Region
                </button>
                <button
                  type="button"
                  onClick={toggleAddForm}
                  className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div className="p-4 ">
            <table className="w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">SL No.</th>
                  <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">ID</th>
                  <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Region Name</th>
                  <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region, index) => (
                  <tr key={index}>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{index + 1}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{region.id}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{region.name}</td>
                    <td className="border flex space-x-4 bg-gray-200 border-gray-300 shadow-md px-4 py-2">
                      <button
                        onClick={() => setDeleteRegionId(region.id)}
                        className="bg-red-400 w-full hover:bg-red-600 text-white font-bold py-2 px-4  rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation Popup */}
          {deleteRegionId && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this region?</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={confirmDeleteRegion}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteRegionId(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionsList;
