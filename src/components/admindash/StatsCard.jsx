// import React from 'react';

// const StatsCard = ({ title, value }) => {
//   return (
//     <div className="w-1/4 p-4 bg-white shadow rounded">
//       <h3 className="text-lg font-bold">{title}</h3>
//       <p className="text-2xl">{value}</p>
//     </div>
//   );
// };

// export default StatsCard;
import React, { useState, useEffect } from 'react';

const StatsCard = ({ title, value }) => {

  const [bgColor, setBgColor] = useState('#ffffff'); 

  useEffect(() => {
    const generateRandomLightColor = () => {
      const randomColor = `#${((Math.random() * 0x7f + 0x80) << 16 | (Math.random() * 0x7f + 0x80) << 8 | (Math.random() * 0x7f + 0x80)).toString(16).padStart(6, '0')}`;
      setBgColor(randomColor);
    };

    const colorChangeInterval = setInterval(generateRandomLightColor, 5000);
    return () => clearInterval(colorChangeInterval);
  }, []);

  return (
    <div className="w-1/4 p-4 shadow rounded" style={{ backgroundColor: bgColor }}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default StatsCard;
