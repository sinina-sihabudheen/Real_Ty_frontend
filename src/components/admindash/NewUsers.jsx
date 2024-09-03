import React from 'react'
import { useEffect, useState } from 'react'
import { handleFetchUsersData } from '../../utils/adminAuth';

const NewUsers = () => {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleFetchUsersData(setUsers, setIsLoading, setError);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log("USERS",users);

    if (isLoading) {
        return <div>Loading...</div>;
        }

    if (error) {
        return <div>{error}</div>;
        }

    return (    
        <div className="container mx-auto p-4">
            <h2 className='text-l font-bold text-orange-600 mb-4'>New Users</h2>
            <div className="flex flex-wrap gap-4">
                {users.map((user) => (
                <div key={user.id} className="flex flex-col items-center bg-white p-4 rounded-md shadow-md border w-40 h-40 border-gray-200">
                    <img 
                    src={user.profile_image ? user.profile_image : '/images/user.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-sm font-medium capitalize">{user.username}</p>
                    <p className="text-sm font-medium capitalize text-yellow-500">{user.subscription_status} user</p>

                </div>
                ))}
            </div>
        </div>   
  )
}
export default NewUsers;

