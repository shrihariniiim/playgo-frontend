import React, { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import axios from "axios";

const VenueBookingsMini = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!venueId) return;
    axios
      .get(`http://localhost:5001/api/bookings/venue/${venueId}`)
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]));
  }, [venueId]);

  if (bookings.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="text-xs font-semibold mb-1">Recent Bookings:</div>
      <div className="flex flex-col gap-1">
        {bookings.slice(0, 2).map((booking, idx) => (
          <div key={booking._id || idx} className="border rounded p-2 bg-gray-50">
            <div className="flex items-center gap-1 text-xs font-medium">
              <User size={12} />
              {booking.userId?.name || booking.userId?.email || "Unknown"}
            </div>
            <div className="text-xs text-gray-600">
              <Calendar size={10} className="inline mr-1" />
              {booking.date}
              {"  "}
              <Clock size={10} className="inline mr-1" />
              {booking.startTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueBookingsMini;