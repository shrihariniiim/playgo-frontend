

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VenueDetail = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/locations/get`).then(res => {
      const allVenues = res.data.flatMap(loc =>
        (loc.venues || []).map(v => ({
          ...v,
          location: loc.location,
        }))
      );
      setVenue(allVenues.find(v => v._id === venueId));
    });
  }, [venueId]);

  if (!venue) return <div className="text-center text-xl py-10">Loading...</div>;

  const handleBookNow = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signup");
    } else {
      navigate(`/booking/${venue._id}`, { state: { venue } });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full p-6">
        {venue.imageUrl && (
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="rounded-xl w-full h-64 object-cover mb-6"
          />
        )}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{venue.name}</h2>
        <p className="text-gray-600 text-lg mb-1">
          📍 <strong>Location:</strong> {venue.location}
        </p>
        <p className="text-gray-600 text-lg mb-1">
          🏟️ <strong>Address:</strong> {venue.address}
        </p>
        <p className="text-gray-600 text-lg mb-4">
          🏅 <strong>Sport:</strong> {venue.sport}
        </p>
        <button
          onClick={handleBookNow}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VenueDetail;
