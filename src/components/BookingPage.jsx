import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, Trash2, User } from "lucide-react";
import { format } from "date-fns";

const BookingPage = () => {
  const { venueId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(location.state?.venue || null);

  // Dynamic courts and price
  const [availableCourts, setAvailableCourts] = useState([]);
  const [baseRate, setBaseRate] = useState(210); // Default price per 30 min

  // Authentication check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signup");
    }
  }, [navigate]);

  // Fetch venue if not passed via state (e.g., on refresh)
  useEffect(() => {
    if (!venue) {
      axios.get("http://localhost:5001/api/locations/get").then(res => {
        const allVenues = res.data.flatMap(loc =>
          (loc.venues || []).map(v => ({
            ...v,
            location: loc.location,
            _id: v._id,
            address: v.address,
            sport: v.sport,
            imageUrl: v.imageUrl,
            courts: v.courts,
            pricePer30Min: v.pricePer30Min,
          }))
        );
        setVenue(allVenues.find(v => v._id === venueId));
      });
    }
  }, [venue, venueId]);

  // Set available courts and base rate dynamically from venue
  useEffect(() => {
    if (venue?.courts && Array.isArray(venue.courts) && venue.courts.length > 0) {
      setAvailableCourts(
        venue.courts.map((court, idx) =>
          typeof court === "string"
            ? { id: idx + 1, name: court }
            : { id: court.id || idx + 1, name: court.name || String(court) }
        )
      );
    }
    if (venue?.pricePer30Min) {
      setBaseRate(venue.pricePer30Min);
    }
  }, [venue]);

  const [sport, setSport] = useState(venue?.sport || "Box Cricket");
  useEffect(() => {
    if (venue?.sport) setSport(venue.sport);
  }, [venue]);

  // Booking form state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [duration, setDuration] = useState(90); // in minutes
  const [selectedCourt, setSelectedCourt] = useState("");
  const [isCourtAvailable, setIsCourtAvailable] = useState(true);
  const [price, setPrice] = useState(baseRate * (duration / 30));
  const [cartItem, setCartItem] = useState(null);

  // Update price dynamically
  useEffect(() => {
    setPrice(baseRate * (duration / 30));
  }, [baseRate, duration]);

  // Fetch all bookings for this venue (to show booked players)
  const [venueBookings, setVenueBookings] = useState([]);
  useEffect(() => {
    if (venueId) {
      axios
        .get(`http://localhost:5001/api/bookings/venue/${venueId}`)
        .then(res => setVenueBookings(res.data))
        .catch(() => setVenueBookings([]));
    }
  }, [venueId, cartItem]); // refetch after booking

  // Court availability logic
  useEffect(() => {
    const hour = selectedTime.getHours();
    const available = hour >= 10 && hour < 22;
    setIsCourtAvailable(available);
    if (!available) setSelectedCourt("");
  }, [selectedTime]);

  // Formatting helpers
  const formattedDate = format(selectedDate, "dd MMM yyyy");
  const startTimeStr = format(selectedTime, "hh:mm a");
  const getEndTime = () => {
    const endTime = new Date(selectedTime.getTime() + duration * 60000);
    return format(endTime, "hh:mm a");
  };

  // Add to cart
  const handleAddToCart = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signup");
      return;
    }
    if (!selectedCourt || !venue) return;
    const booking = {
      venueId,
      venueName: venue.name,
      court: selectedCourt,
      sport,
      date: formattedDate,
      startTime: startTimeStr,
      endTime: getEndTime(),
      duration,
      price,
    };
    setCartItem(booking);
  };

  // Proceed to booking
  const handleProceed = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signup");
      return;
    }
    if (!cartItem) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/bookings/create",
        cartItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItem(null);
      setSelectedCourt("");
      // Redirect to booking success page
      navigate("/booking-success");
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  if (!venue) return <div>Loading venue details...</div>;

  return (
    <div className="p-6 space-y-8">
      {/* Booking Form */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">{venue.name}</h2>
          <p className="text-gray-600 mb-2">{venue.address}</p>
          <p className="bg-green-500 text-white p-3 rounded-md mb-4">
            Thanks for choosing {venue.name}. We are happy to see you here.
          </p>

          <div className="space-y-4">
            {/* Sports */}
            <div>
              <label className="block text-sm font-medium">Sports</label>
              <div className="border rounded-md p-2 bg-gray-100">{sport}</div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium">Date</label>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  className="border p-2 rounded-md w-full"
                  dateFormat="dd MMM yyyy"
                />
              </div>
            </div>

            {/* Time Picker */}
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <DatePicker
                  selected={selectedTime}
                  onChange={setSelectedTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                  className="border p-2 rounded-md w-full"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium">Duration</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDuration((d) => Math.max(30, d - 30))}
                  className="bg-gray-200 px-3 py-1 rounded-full text-xl"
                >
                  −
                </button>
                <span>{Math.floor(duration / 60)} Hr {duration % 60} Mins</span>
                <button
                  onClick={() => setDuration((d) => d + 30)}
                  className="bg-green-500 px-3 py-1 rounded-full text-white text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Court Selection */}
            <div>
              <label className="block text-sm font-medium">Court</label>
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="border rounded-md p-2 w-full"
                disabled={!isCourtAvailable}
              >
                <option value="">-- Select Court --</option>
                {isCourtAvailable &&
                  availableCourts.map((court) => (
                    <option key={court.id} value={court.name}>
                      {court.name}
                    </option>
                  ))}
              </select>
              {!isCourtAvailable && (
                <p className="text-sm text-red-500 mt-1">
                  No Courts Available For The Selected Time
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <button
              className={`${
                selectedCourt ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              } px-4 py-2 rounded-md mt-4 w-full`}
              disabled={!selectedCourt}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Cart</h3>
          {cartItem ? (
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <button onClick={() => setCartItem(null)} className="absolute top-2 right-2 text-red-500">
                <Trash2 size={18} />
              </button>
              <p className="text-sm font-medium">{cartItem.court}</p>
              <p className="text-sm text-gray-600 mt-1">
                <Calendar className="inline mr-1" size={14} />
                {cartItem.date}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <Clock className="inline mr-1" size={14} />
                {cartItem.startTime} to {cartItem.endTime}
              </p>
              <p className="text-sm font-semibold mt-2">INR {cartItem.price}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No booking added to cart.</p>
          )}

          <button
            className={`${
              cartItem ? "bg-green-500" : "bg-gray-300"
            } text-white w-full py-2 rounded-md text-sm font-semibold`}
            disabled={!cartItem}
            onClick={handleProceed}
          >
            Proceed INR {cartItem?.price?.toFixed(2)}
          </button>
        </div>
      </div>

      {/* Booked Players Section */}
      {venueBookings.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Booked Players</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venueBookings.map((booking, index) => (
              <div
                key={booking._id || index}
                className="border p-4 rounded-lg shadow-sm bg-white flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 font-medium">
                  <User size={18} />
                  {booking.userId?.name || booking.userId?.email || "Unknown User"}
                </div>
                <div className="text-sm text-gray-600">Court: {booking.court}</div>
                <div className="text-sm text-gray-600">Sport: {booking.sport}</div>
                <div className="text-sm text-gray-600">
                  <Calendar size={14} className="inline mr-1" />
                  {booking.date}
                </div>
                <div className="text-sm text-gray-600">
                  <Clock size={14} className="inline mr-1" />
                  {booking.startTime} – {booking.endTime}
                </div>
                <div className="text-sm font-semibold mt-1">INR {booking.price}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Karma: {booking.userId?.karma ?? "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;