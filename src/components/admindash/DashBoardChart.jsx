

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale
);

const DashBoardChart = ({ totalListings, total_land_properties, total_apartments, total_villas, total_users, subscription_growth }) => {
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    const generateRandomLightColor = () => {
      const randomColor = `#${((Math.random() * 0x7f + 0x80) << 16 | (Math.random() * 0x7f + 0x80) << 8 | (Math.random() * 0x7f + 0x80)).toString(16).padStart(6, '0')}`;
      setBgColor(randomColor);
    };

    const colorChangeInterval = setInterval(generateRandomLightColor, 5000);
    return () => clearInterval(colorChangeInterval);
  }, []);

  const pieData = {
    labels: ['Total Listings', 'Land Properties', 'Apartments', 'Villas'],
    datasets: [
      {
        label: 'Property Types',
        data: [totalListings, total_land_properties, total_apartments, total_villas],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#00FF00'],
        hoverBackgroundColor: bgColor,
      },
    ],
  };

  const barData = {
    labels: ['Users'],
    datasets: [
      {
        label: 'Count',
        data: [total_users,subscription_growth],
        backgroundColor: ['#42A5F5'],
      },
    ],
  };

  return (
    <div className="w-full p-4 space-y-4">
    <h3 className="text-lg font-bold mb-4">Dashboard Overview</h3>
    <div className="flex space-x-4">
      <div className="w-4/12 p-4 border border-gray-300 bg-white shadow rounded">
        <h3 className="text-l text-red-800 font-semi-bold mb-4">Property List Overview</h3>
        <Pie data={pieData} />
      </div>
      <div className="w-1/2 p-4 border border-gray-300 bg-white shadow rounded">
        <h3 className="text-l text-blue-800 font-semi-bold mb-4">Users List Overview</h3>
        <Bar data={barData} />
      </div>
    </div>
  </div>
  );
};

export default DashBoardChart;
