// import React from 'react'
// import { useEffect, useState } from 'react'
// import { toast } from 'sonner';
// import { Link, useNavigate} from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { handleFetchUsersData,handleBlockUser,handleUnblockUser } from '../../utils/adminAuth';
// import Sidebar from '../../components/admindash/SideBar';
// import AdminHeader from '../../components/admindash/AdminHeader';


// const AllUsers = () => {
//     const [users, setUsers] = useState();
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await handleFetchUsersData(setUsers, setIsLoading, setError);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 setError('Error fetching user data');
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const blockUserHandler = async (userId) => {
//         await handleBlockUser(userId, setUsers);
//       };

//     const unblockUserHandler = async (userId) => {
//         await handleUnblockUser(userId, setUsers);
//       };

//     console.log("Users:",users);
//     console.log("IsLoading:",isLoading);
//     console.log("Error:",error);

//     if (isLoading) {
//         return <div>Loading...</div>;
//         }

//     if (error) {
//         return <div>{error}</div>;
//         }

//     return (
      
//         <div className="flex">
//             <Sidebar />
//         <div className='w-full py-8'>
//         <AdminHeader />
       
//         <div className="container mx-auto">
//             <h2 className='text-xl font-bold mb-4'>All Users</h2>
//             <div className="p-4 overflow-x-auto">
//             <table className="min-w-full border border-gray-500">
//                 <thead>        
//                     <tr>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">ID</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">SL No.</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">Username</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">Email</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">Address</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">Subscription Status</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">Active</th>
//                     <th className="border border-gray-400  bg-gray-300 shadow-md px-4 py-2">View</th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                 {users.map((user, index) => (
//                     <tr key={index} className="border-t">
//                         <td className="border border-gray-400  bg-gray-200 shadow-md px-4 py-2">{index+1}</td>
//                         <td className="border border-gray-400  bg-gray-200 shadow-md px-4 py-2">{user.id}</td>
//                         <td className="border border-gray-400  bg-gray-200 shadow-md px-4 py-2 capitalize">{user.username}</td>
//                         <td className="border border-gray-400  bg-gray-200 shadow-md px-4 py-2">{user.email}</td>
//                         <td className="border border-gray-400  bg-gray-200 shadow-md px-4 py-2 capitalize">{user.address ? user.address : "NIL"}</td>
//                         <td className="border border-gray-400  bg-gray-200 shadow-md px-4 py-2 capitalize">{user.subscription_status}</td>       
//                         <td className="px-4 py-2 border-gray-400  bg-gray-200 shadow-md border">
//                             <span
//                                 className={`px-2 py-1 rounded ${
//                                 user.is_active ? ' text-green-600' : ' text-red-600 '
//                                 }`}
//                             >
//                                 {user.is_active ? 'Active' : 'Inactive'}
//                             </span>
//                         </td>
//                         <td className="px-4 border-gray-400  bg-gray-200 shadow-md py-2  border">
                           
//                             {user.is_active ? (
//                             <button
//                             onClick={() => blockUserHandler(user.id)}
//                             className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 ml-20 rounded"
//                             >
//                             Block
//                             </button>
//                         ) : (
//                             <button
//                             onClick={() => unblockUserHandler(user.id)}
//                             className="bg-green-400 hover:bg-green-600 text-white px-4 py-1 ml-20 rounded"
//                             >
//                             Unblock
//                             </button>
//                         )}
//                         </td>
//                     </tr>
                
//                 ))}
//                 </tbody>
//             </table>
//             </div>           
//             </div>
//         </div>
//         </div>
//   )
// }
// export default AllUsers;

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchUsersData, handleBlockUser, handleUnblockUser } from '../../utils/adminAuth';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleFetchUsersData((data) => {
                    setUsers(data);
                    setFilteredUsers(data);
                    setIsLoading(false);
                }, setIsLoading, setError);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (query) => {
        const filtered = users.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const blockUserHandler = async (userId) => {
        await handleBlockUser(userId, setUsers);
    };

    const unblockUserHandler = async (userId) => {
        await handleUnblockUser(userId, setUsers);
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
            <div className="w-full py-8">
                <AdminHeader onSearch={handleSearch} />
                <div className="container mx-auto">
                    <h2 className="text-xl font-bold mb-4">All Users</h2>
                    <div className="p-4 overflow-x-auto">
                        <table className="min-w-full border border-gray-500">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">SL No.</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">ID</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Username</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Email</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Address</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Subscription Status</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">Active</th>
                                    <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="border border-gray-400 bg-gray-200 shadow-md px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-400 bg-gray-200 shadow-md px-4 py-2">{user.id}</td>
                                        <td className="border border-gray-400 bg-gray-200 shadow-md px-4 py-2 capitalize">{user.username}</td>
                                        <td className="border border-gray-400 bg-gray-200 shadow-md px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-400 bg-gray-200 shadow-md px-4 py-2 capitalize">{user.address ? user.address : "NIL"}</td>
                                        <td className="border border-gray-400 bg-gray-200 shadow-md px-4 py-2 capitalize">{user.subscription_status}</td>
                                        <td className="px-4 py-2 border-gray-400 bg-gray-200 shadow-md border">
                                            <span
                                                className={`px-2 py-1 rounded ${user.is_active ? 'text-green-600' : 'text-red-600'}`}
                                            >
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 border-gray-400 bg-gray-200 shadow-md py-2 border">
                                            {user.is_active ? (
                                                <button
                                                    onClick={() => blockUserHandler(user.id)}
                                                    className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 ml-20 rounded"
                                                >
                                                    Block
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => unblockUserHandler(user.id)}
                                                    className="bg-green-400 hover:bg-green-600 text-white px-4 py-1 ml-20 rounded"
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
    );
};

export default AllUsers;
