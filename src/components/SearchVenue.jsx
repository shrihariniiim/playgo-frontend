import React, { useState } from 'react';
import axios from 'axios';
import VenueList from './VenueList';

const SearchVenue = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [venuesData, setVenuesData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/locations/search?q=${location}`
      );
      setVenuesData(res.data);
      setError('');
      onSearch(location);
    } catch (err) {
      setVenuesData(null);
      setError('No venues found for this location');
      onSearch(location);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Search for Venues</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Search Venues
        </button>
      </div>

      {error && (
        <p className="text-red-600 mt-4 text-sm text-center">{error}</p>
      )}

      <div className="mt-6">
        <VenueList venuesData={venuesData} error={error} />
      </div>
    </div>
  );
};

export default SearchVenue;
