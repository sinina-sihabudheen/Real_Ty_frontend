
import React, { useState, useEffect } from 'react';
import { handleFetchUserData } from '../../utils/auth';

const AdminHeader = ({ isDashboard,isPropertyType, onSearch }) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        handleFetchUserData(setUser, setIsLoading, setError);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-between items-center mb-6 w-full">
            <div className="flex w-full ml-10 items-center space-x-4">
                {isDashboard ? (
                    <span className="text-xl font-bold text-red-700">Real-Ty Dashboard</span>
                ) : isPropertyType ? (
                    <span className="text-xl font-bold text-red-700">Real-Ty </span>

                ) : (
                    <input
                        type="text"
                        placeholder="Search here"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="p-2 border w-8/12 border-gray-300 rounded"
                    />
                )}
            </div>
            <div className="flex items-center mr-10 space-x-4">
                <span>Hello, {user.username}</span>
                <img src="/images/user.png" alt="Profile" className="h-10 w-10 rounded-full" />
            </div>
        </div>
    );
};

export default AdminHeader;
