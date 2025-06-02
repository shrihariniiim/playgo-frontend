// import React, { useState, useEffect } from 'react';
// import Footer from '../components/Footer';
// import axios from 'axios';
// import NavBar from '../components/NavBar';
// import ImageLayout from './ImageLayout';
// import ImageDetail from './ImageDetails';
// import GameCardGrid from './GameCardGrid';
// import BookingList from './BookingList'; // <-- Import the BookingList

// const Play = () => {
//   const [city, setCity] = useState('Coimbatore');
//   const [venues, setVenues] = useState([]);
//   const [filters, setFilters] = useState({ sport: '', date: '' });

//   useEffect(() => {
//     fetchVenues();
//   }, [city, filters]);

//   const fetchVenues = async () => {
//     try {
//       const response = await axios.get(`/api/venues?city=${city}&sport=${filters.sport}&date=${filters.date}`);
//       const data = Array.isArray(response.data) ? response.data : [];
//       setVenues(data);
//     } catch (error) {
//       console.error('Error fetching venues:', error);
//       setVenues([]);
//     }
//   };

//   // Optionally, you can pass city or filters to BookingList if you want to filter bookings
//   return (
//     <>
//       <NavBar />
//       <div className="min-h-screen flex flex-col">
//         <div className="px-6 pt-6">
//           <GameCardGrid />
//           {/* Collections Section */}
//           <ImageLayout />
//           <ImageDetail />

//           {/* Dynamic Booked Players Section */}
//           <h2 className="text-2xl font-bold mt-8 mb-4">Booked Players</h2>
//           <BookingList location={city} /> {/* Pass city or other filters if needed */}
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Play;

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ImageLayout from './ImageLayout';
import ImageDetail from './ImageDetails';
import GameCardGrid from './GameCardGrid';
import BookingList from './BookingList';

const Play = () => {
  const [city, setCity] = useState('Coimbatore');
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState({ sport: '', date: '' });

  useEffect(() => {
    fetchVenues();
  }, [city, filters]);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(
        `/api/venues?city=${city}&sport=${filters.sport}&date=${filters.date}`
      );
      const data = Array.isArray(response.data) ? response.data : [];
      setVenues(data);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setVenues([]);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="px-6 pt-6 flex-grow">
          {/* Dynamic Booked Players Section */}
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Booked Players in <span className="text-green-600">{city}</span>
            </h2>
            <BookingList location={city} />
          </div>
        </div>
          {/* Venue Cards Section */}
          {/* <GameCardGrid /> */}

          {/* Collections Section */}
          <ImageLayout />
          <ImageDetail />

          

        <Footer />
      </div>
    </>
  );
};

export default Play;
