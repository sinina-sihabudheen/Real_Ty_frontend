import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleFetchSubscriptionList } from '../../utils/adminAuth';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetchSubscriptionList(setSubscriptions);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        toast.error("Fetching Subscription List Failed");
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className='w-full py-8'>
        <AdminHeader isPropertyType={true}/>
        <div className="w-3/4 bg-white">
          <h2 className='text-xl font-bold mb-4'>All Subscriptions</h2>
          <div className="p-4">
            <table className="w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">SL No.</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Username</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Stripe Subscription ID</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Subscription Start Date</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Subscription End Date</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Email</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Subscription Status</th>
                  <th className="border border-gray-400 bg-gray-300 shadow-md px-4 py-2">User Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription, index) => (
                  subscription.subscriptions.map((sub, subIndex) => (
                    <tr key={`${index}-${subIndex}`}>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{index + 1}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2 capitalize">{subscription.username}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{sub.stripe_subscription_id}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{formatDate(sub.started_at)}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{formatDate(sub.ended_at)}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{subscription.email}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{sub.subscription_type}</td>
                      <td className="px-4 py-2 border-gray-400 bg-gray-200 shadow-md border">
                        <span className={`px-2 py-1 rounded ${subscription.is_active ? 'text-green-600' : 'text-red-600'}`}>
                          {subscription.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionList;
