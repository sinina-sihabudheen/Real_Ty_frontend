import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleFetchBuyersData,handleUnblockBuyer,handleBlockBuyer } from '../../utils/adminAuth';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';


const BuyersList = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
    const fetchData = async () => {
        try {
            await handleFetchBuyersData(setUsers, setIsLoading, setError);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Error fetching user data');
            setIsLoading(false);
        }
    };

    fetchData();
}, []);

const blockBuyerHandler = async (buyerId) => {
    await handleBlockBuyer(buyerId,setUsers);
  };

const unblockBuyerHandler = async (buyerId) => {
    await handleUnblockBuyer(buyerId,setUsers);
  };


  if (isLoading) {
      return <div>Loading...</div>;
      }

  if (error) {
      return <div>{error}</div>;
      }

  return (

      <div className="flex">
          <Sidebar />
      <div className='grid'>
      <AdminHeader />
     
      <div className="w-3/4 bg-white">
          <h2>All Buyers</h2>
          <div className="p-4">
          <table className="w-full  table-auto border-collapse border border-gray-400">
              <thead>        
                <tr>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">SL No.</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">ID</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Username</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Email</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Address</th>
                        <th className="border bg-gray-300 border-gray-400 shadow-md px-4 py-2">Contact Number</th>
                        <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Active</th>
                        <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Action</th> 
                </tr>
              </thead>
              <tbody>
              {users.map((buyer, index) => (
                <tr key={index}>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{index+1}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{buyer.id}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{buyer.user.username}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{buyer.user.email}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{buyer.user.address}</td>
                    <td className="border bg-gray-200 border-gray-400 shadow-md px-4 py-2">{buyer.user.contact_number}</td>
                    <td className="px-4 py-2 border-gray-400  bg-gray-200 shadow-md border">
                            <span
                                className={`px-2 py-1 rounded ${
                                buyer.user.is_active ? 'text-green-600' : ' text-red-600 '
                                }`}
                            >
                                {buyer.user.is_active ? 'Active' : 'Inactive'}
                            </span>
                    </td>
                    <td className="px-4 border-gray-400  bg-gray-200 shadow-md py-2 border">
                        {buyer.user.is_active ? (
                            <button
                            onClick={() => blockBuyerHandler(buyer.id)}
                            className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 rounded"
                            >
                            Block
                            </button>
                        ) : (
                            <button
                            onClick={() => unblockBuyerHandler(buyer.id)}
                            className="bg-green-400 hover:bg-green-600 text-white px-4 py-1 rounded"
                            >
                            Unblock
                            </button>
                        )}
                    </td>
                  </tr>
              
              ))}
              </tbody>
          </table>
          </div>           
        </div>
      </div>
      </div>
)
}
export default BuyersList;









