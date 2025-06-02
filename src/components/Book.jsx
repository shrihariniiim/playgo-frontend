import React, { useEffect, useState } from "react";
import NavBar from './NavBar';
import Footer from './Footer';
import VenueList from './VenueList';
import axios from "axios";

const Book = () => {
  const [allVenues, setAllVenues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all locations and flatten all venues
    axios.get(`${process.env.REACT_APP_API_URL}/api/locations/get`)
      .then(res => {
        // Flatten all venues from all locations
        const venues = res.data.flatMap(loc =>
          (loc.venues || []).map(venue => ({
            ...venue,
            location: loc.location
          }))
        );
        setAllVenues({ venues });
      })
      .catch(() => setError("Failed to load venues"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-col items-center justify-center py-20 bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Book Your Venue</h1>
        <p className="text-lg mb-6 text-gray-700">Find and book sports venues in your city.</p>
      </section>
      <VenueList venuesData={allVenues} error={error} />
      <Footer />
    </div>
  );
};

export default Book;