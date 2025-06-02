
import React from "react";
import { Link } from "react-router-dom";
import VenueBookingsMini from "./VenueBookingsMini"; // <-- Add this import

const VenueList = ({ venuesData, error }) => {
  if (error) return <p className="text-red-500 mt-4">{error}</p>;
  if (!venuesData || !venuesData.venues || venuesData.venues.length === 0)
    return <div className="mt-6 text-gray-500">No venues found for this location.</div>;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {venuesData.venues.map((venue, idx) => (
        <Link to={`/venue/${venue._id}`} key={idx}>
          <div key={idx} className="bg-white rounded shadow p-4">
            {venue.imageUrl && (
              <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <h4 className="font-bold text-lg mb-1">{venue.name}</h4>
            <p className="text-gray-600 mb-1">{venue.address}</p>
            {venue.rating && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                {venue.rating.toFixed(2)}
              </span>
            )}
            {venue.featured && (
              <span className="ml-2 bg-black text-white px-2 py-1 rounded text-xs">FEATURED</span>
            )}
            {/* <VenueBookingsMini venueId={venue._id} />  */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VenueList;