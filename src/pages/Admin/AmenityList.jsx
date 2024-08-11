import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchAmenity,
        handleAmenityAdd,
        handleAmenityDelete
} from '../../utils/adminAuth';

const AmenityList = () => {
    const [amenities, setAmenities] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAmenityName, setNewAmenityName] = useState('');
    const [deleteAmenityId, setDeleteAmenityId] = useState(null);


    useEffect(() => {
        handleFetchAmenity(setAmenities);
      }, []);
    
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
      };
    
    
      const handleAddAmenity = async (e) => {
        e.preventDefault();
        if (!newAmenityName.trim()) {
          toast.error('Amenity name is required');
          return;
        }
      
        try {
          const response = await handleAmenityAdd({ name: newAmenityName });
          setAmenities([...amenities, response.data]);
          toast.success('Amenity added successfully');
          setShowAddForm(false);
          setNewAmenityName('');
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMessages = error.response.data;
            toast.error(Object.values(errorMessages).flat().join(', '));
          } else {
            toast.error('Failed to add amenity');
          }
        }
      };
    
    const confirmDeleteAmenity = async () => {
        try {
          await handleAmenityDelete(deleteAmenityId);
          setAmenities(amenities.filter(amenity => amenity.id !== deleteAmenityId));
          toast.success('Amenity deleted successfully');
          setDeleteAmenityId(null);
        } catch (error) {
          toast.error('Failed to delete amenity');
        }
      };

    return (

        <div className="flex">
            <Sidebar />
        <div className='grid'>
        <AdminHeader />
       
        <div className="w-3/4 bg-white">
            <h2 className='text-gray-600 font-semibold text-xl'>All Amenities</h2>
            <button
                    onClick={toggleAddForm}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Add New
                    </button>

                {showAddForm && (
                    <div className="p-4 mt-4 bg-gray-200 rounded shadow-md">
                    <form onSubmit={handleAddAmenity}>
                        <label className="block text-gray-700 font-bold mb-2">
                        Amenity Name:
                        </label>
                        <input
                        type="text"
                        value={newAmenityName}
                        onChange={(e) => setNewAmenityName(e.target.value)}
                        className="w-full px-3 py-2 border rounded shadow-sm"
                        required
                        />
                        <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                        Add Amenity
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
            <div className="p-4">
            <table className="w-full  table-auto border-collapse border border-gray-400">
                <thead>        
                    <tr>
                        {/* <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">SL No.</th> */}
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">ID</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Amenity Name</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {amenities.map((amenity, index) => ( 
                <tr key={index}>                       
                    {/* <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{index+1}</td> */}
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{amenity.id}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{amenity.name}</td>
                 

                    <td className="border flex space-x-4 bg-gray-200 border-gray-300 shadow-md px-4 py-2">             
                    <button
                        onClick={() => setDeleteAmenityId(amenity.id)}
                        className="bg-red-400 w-full hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                    </button>  
                        {/* <button className="bg-blue-400 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" >
                            Block
                        </button>             */}
                    </td>
                </tr>
                
                ))}
                </tbody>
            </table>
            </div>  
            {/* Delete Confirmation Popup */}
            {deleteAmenityId && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this amenity?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={confirmDeleteAmenity}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                            Confirm
                            </button>
                            <button
                                onClick={() => setDeleteAmenityId(null)}
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
  )
}
export default AmenityList






