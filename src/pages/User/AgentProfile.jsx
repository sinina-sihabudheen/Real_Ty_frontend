// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';


// const AgentProfile = () => {

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="flex flex-col items-center">
//               <img
//                 className="h-40 w-40 rounded-full mb-4"
//                 src="/images/user.png"
//                 alt="Agent"
//               />
//               <h2 className="text-xl font-semibold">ALEX</h2>
//               <p>Polly Real Estate LLC</p>
//               <p>Kozhikode</p>
//             </div>
            
//             <div className="mt-4">
//               <h3 className="text-lg font-medium">SERVICE AREAS</h3>
//               <p>Kozhikode, Malappuram</p>
//               <h3 className="text-lg font-medium mt-4">SPECIALIZED IN</h3>
//               <p>Residential Sales</p>
//             </div>
//             <div className="mt-4 flex items-center">
//               <button className="w-6/12  bg-gray-300 text-white py-2 rounded-md mb-2">Verify</button>
//             </div>
//           </div>

//           <div className=" w-50lg:col-span-2">
//            <button className="w-6/12  bg-gray-400 text-white py-2 rounded-md mb-2">LISTED PROPERTIES</button>

           
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AgentProfile;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

import Footer from '../../components/Footer';

const AgentProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col items-center">
            <img
              className="h-40 w-40 rounded-full mb-4"
              src="/images/user.png"
              alt="User"
            />
            <h2 className="text-xl font-semibold">{user.username}</h2>
        
            <p>{user.email}</p>
            <p>Addresss: {user.address}</p>
            <p>Contact Number: {user.contact_number}</p>
            <button className="w-6/12  bg-gray-400 text-white py-2 rounded-md mb-2">Edi</button>

            {user.is_seller ? (
              <button className="w-6/12  bg-gray-400 text-white py-2 rounded-md mb-2">LISTED PROPERTIES</button>
            ):(
              <button className="w-6/12  bg-gray-400 text-white py-2 rounded-md mb-2">Buy</button>

            )}
          </div>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default AgentProfile;