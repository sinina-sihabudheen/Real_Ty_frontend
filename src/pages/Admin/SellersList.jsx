import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchSellersData } from '../../utils/adminAuth';


const SellersList = () => {
  const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleFetchSellersData(setUsers, setIsLoading, setError);
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
            <h2>All Sellers</h2>
            <div className="p-4">
            <table className="w-full bg-gray-100 table-auto border-collapse border border-gray-400">
                <thead>        
                    <tr>
                        <th className="border px-4 py-2">SL No.</th>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Agency Name</th>
                        <th className="border px-4 py-2">Subscription End Date</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Contact Number</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((seller, index) => (
                <tr key={index}>                       
                    <td className="border px-4 py-2">{index+1}</td>
                    <td className="border px-4 py-2">{seller.id}</td>
                    <td className="border px-4 py-2">{seller.agency_name}</td>
                    <td className="border px-4 py-2">{seller.subscription_end_date}</td>
                    <td className="border px-4 py-2">{seller.user.username}</td>
                    <td className="border px-4 py-2">{seller.user.email}</td>
                    <td className="border px-4 py-2">{seller.user.address}</td>
                    <td className="border px-4 py-2">{seller.user.contact_number}</td>
                   
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
export default SellersList






