import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleFetchBuyersData } from '../../utils/adminAuth';
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
          <table className="w-full bg-gray-100 table-auto border-collapse border border-gray-400">
              <thead>        
                <tr>
                        <th className="border px-4 py-2">SL No.</th>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Contact Number</th>
                        <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
              {users.map((buyer, index) => (
                <tr key={index}>
                    <td className="border px-4 py-2">{index+1}</td>
                    <td className="border px-4 py-2">{buyer.id}</td>
                    <td className="border px-4 py-2">{buyer.user.username}</td>
                    <td className="border px-4 py-2">{buyer.user.email}</td>
                    <td className="border px-4 py-2">{buyer.user.address}</td>
                    <td className="border px-4 py-2">{buyer.user.contact_number}</td>
                    <td className="border px-4 py-2">                     
                          
                          <button className="bg-blue-400 w-full hover:bg-blue-300 text-white font-bold py-2 px-4 rounded" >
                          Edit
                          </button>
                          <button className="bg-red-400 w-full hover:bg-red-300 text-white font-bold py-2 px-4 rounded" >
                          Delete
                          </button>                 
                      
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









