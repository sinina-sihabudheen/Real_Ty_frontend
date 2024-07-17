import React from 'react';

const StatsCard = ({ title, value }) => {
  return (
    <div className="w-1/3 p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default StatsCard;
