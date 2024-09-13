import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '../../components/admindash/SideBar';
import AdminHeader from '../../components/admindash/AdminHeader';
import { handleRevenueReport } from '../../utils/adminAuth';

const SalesReport = () => {
  const [revenue, setRevenue] = useState([]); 
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleRevenueReport(setRevenue,setTotalRevenue);
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
        <AdminHeader isPropertyType={true} />
        <div className="w-3/4 bg-white">
          <h2 className='text-xl font-bold mb-4'>Revenue Report</h2>
          <div className="p-4">
            {revenue.length > 0 && (
            <>
            <table className="w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">SL No.</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Username</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Transaction ID</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Date of Payment</th>
                  <th className="border bg-gray-300 border-gray-400 px-4 shadow-md py-2">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(revenue) && revenue.length > 0 ? (
                  revenue.map((revenueitem, index) => (
                    <tr key={index}>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{index + 1}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2 capitalize">{revenueitem.username}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{revenueitem.transaction_id.substring(10,40)}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{formatDate(revenueitem.payment_date)}</td>
                      <td className="border px-4 bg-gray-200 border-gray-400 shadow-md py-2">{revenueitem.amount}</td>
                    </tr>
                  ))
                ) : (
                <div>
                    <span className="text-center py-4">No Revenue Data Available</span>
                </div>
                )}
              </tbody>
            </table>
             {/* Display total revenue */}
             <div className="mt-4 text-right font-bold">
             <span>Total Revenue: ₹{totalRevenue.toFixed(2)}</span>
           </div>
           </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
