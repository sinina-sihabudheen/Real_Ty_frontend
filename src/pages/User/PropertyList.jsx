import React from 'react'
import Navbar from '../../components/Navbar';
import Filter from '../../components/listing/Filter';
import Search from '../../components/listing/Search';
import Footer from '../../components/Footer';



const PropertyList = () => {
    const villas = [
        { id: 1, price: '30 Lakhs', details: '2 Bedrooms, 3 Bathrooms', location: 'Malappuram', image: 'public/images/home1.jpg' },
        { id: 2, price: '80 Lakhs', details: '5 Bedrooms, 5 Bathrooms', location: 'Kozhikode', image: 'public/images/home1.jpg' },
        { id: 3, price: '40 Lakhs', details: '3 Bedrooms, 3 Bathrooms', location: 'Malappuram', image: 'public/images/home3.jpg' },


      ];
    
      const apartments = [
        { id: 1, price: '55 Lakhs', details: '3 Bedrooms, 4 Bathrooms', location: 'Malappuram', image: 'public/images/apart2.jpg' },
        { id: 2, price: '75 Lakhs', details: '3 Bedrooms, 6 Bathrooms', location: 'Kozhikode', image: 'public/images/apart3.jpeg' },
        { id: 3, price: '50 Lakhs', details: '2 Bedrooms, 3 Bathrooms', location: 'Kozhikode', image: 'public/images/apart2.jpg' },

      ];
    
      const lands = [
        { id: 1, size: '5 acres', location: 'Malappuram', image: 'public/images/land1.jpeg' },
        { id: 2, size: '10 acres', location: 'Kozhikode', image: 'public/images/land3.jpeg' },
        { id: 3, size: '10 acres', location: 'Kozhikode', image: 'public/images/land3.jpeg' },

    
      ];
  return (
    <>
    <Navbar />
    <Search />
    
    <div className='flex'>
    <Filter />
    <div>
        <div>PropertyList</div>
        <div className="w-3/4 p-4">
        <section className="mb-6">
            <h2 className="font-bold mb-4">Newly Added Villas</h2>
            <div className="grid grid-cols-3 gap-4">
            {villas.map((villa) => (
            <div key={villa.id} className="p-4 bg-white rounded shadow-md">
                <img src={villa.image} alt={villa.details} className="w-full h-32 object-cover rounded" />
                <h3 className="mt-2 font-semibold">{villa.price}</h3>
                <p>{villa.details}</p>
                <p>{villa.location}</p>
            </div>
            ))}
            </div>
        </section>
        <section className="mb-6">
            <h2 className="font-bold mb-4">Newly Added Apartments</h2>
            <div className="grid grid-cols-3 gap-4">
            {apartments.map((apartment) => (
            <div key={apartment.id} className="p-4 bg-white rounded shadow-md">
                <img src={apartment.image} alt={apartment.details} className="w-full h-32 object-cover rounded" />
                <h3 className="mt-2 font-semibold">{apartment.price}</h3>
                <p>{apartment.details}</p>
                <p>{apartment.location}</p>
            </div>
            ))}
            </div>
        </section>
        <section className="mb-6">
            <h2 className="font-bold mb-4">Newly Added Lands</h2>
            <div className="grid grid-cols-3 gap-4">
            {lands.map((land) => (
            <div key={land.id} className="p-4 bg-white rounded shadow-md">
                <img src={land.image} alt={land.size} className="w-full h-32 object-cover rounded" />
                <h3 className="mt-2 font-semibold">{land.size}</h3>
                <p>{land.location}</p>
            </div>
            ))}
            </div>
        </section>     
        </div>
        </div>
        </div>
        <Footer />
    </>
  )
};
export default PropertyList;



