import React from 'react';

const DashBoardChart = () => {
  return (
    <div className="w-full p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-4">Pie Chart</h3>
      <div className="flex justify-around">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full mb-2"></div>
          <p>Total Listings</p>
          <p>81%</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full mb-2"></div>
          <p>Subscription Growth</p>
          <p>22%</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-2"></div>
          <p>Total Revenue</p>
          <p>62%</p>
        </div>
      </div>
     
    </div>
  );
};

export default DashBoardChart;
