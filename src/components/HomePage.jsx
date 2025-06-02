import React, { useState } from 'react';
import NavBar from './NavBar';
import HomeImages from './HomeImages';
import { motion } from 'framer-motion';
import Footer from './Footer';
import CardCarousel from './CardCarousel';
import SearchVenue from './SearchVenue';
import BookingList from './BookingList';


const HomePage = () => {
  const [location, setLocation] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);

  const handleSearch = (loc) => {
    setLocation(loc);
    setSearchTrigger(prev => !prev); // Toggle to trigger BookingList fetch
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-col items-center justify-center py-20 bg-gray-100 text-center">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find Your Perfect Sports Venue
        </motion.h1>
        <motion.p
          className="text-lg mb-6 text-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Connect with your playmates and book sports venues in your city.
        </motion.p>
        <HomeImages />
      </section>
      <h1 className="text-center text-2xl font-bold mt-4">Search Venues by Location</h1>
      <SearchVenue onSearch={handleSearch} />
      <BookingList location={location} searchTrigger={searchTrigger} />

      <CardCarousel />
      <Footer />
    </div>
  );
};

export default HomePage;