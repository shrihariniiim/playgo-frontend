import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState({
    name: "",
    address: "",
    rating: "",
    featured: false,
    imageUrl: "",
    sport: "",
    courts: "",
    pricePer30Min: "",
  });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get("https://playgo-backend.onrender.com/api/locations/get");
      setLocations(res.data);
    } catch (err) {
      console.error("Failed to fetch locations", err);
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  const handleVenueChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVenue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://playgo-backend.onrender.com/api/locations/add`,
        {
          location: location.trim(),
          venue: {
            ...venue,
            rating: venue.rating ? Number(venue.rating) : undefined,
            pricePer30Min: venue.pricePer30Min ? Number(venue.pricePer30Min) : undefined,
            courts: venue.courts
              ? venue.courts.split(",").map((c) => c.trim()).filter(Boolean)
              : [],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLocation("");
      setVenue({
        name: "",
        address: "",
        rating: "",
        featured: false,
        imageUrl: "",
        sport: "",
        courts: "",
        pricePer30Min: "",
      });
      await fetchLocations();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add venue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Admin Dashboard</h2>
        <p className="mb-6 text-gray-700">Welcome, <span className="font-semibold">{user.username}</span>!</p>

        {(user.role === "admin" || user.role === "manager") && (
          <form
            onSubmit={handleAdd}
            className="bg-white shadow-lg rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g., Coimbatore)"
                required
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <label className="block font-medium mb-1">Venue Name</label>
              <input
                type="text"
                name="name"
                value={venue.name}
                onChange={handleVenueChange}
                placeholder="Venue Name"
                required
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <label className="block font-medium mb-1">Venue Address</label>
              <input
                type="text"
                name="address"
                value={venue.address}
                onChange={handleVenueChange}
                placeholder="Venue Address"
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <label className="block font-medium mb-1">Sport</label>
              <input
                type="text"
                name="sport"
                value={venue.sport}
                onChange={handleVenueChange}
                placeholder="Sport (e.g., Football, Cricket)"
                required
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <label className="block font-medium mb-1">Courts</label>
              <textarea
                name="courts"
                value={venue.courts}
                onChange={handleVenueChange}
                placeholder="Courts (comma separated, e.g., Ground 1, Ground 2)"
                required
                className="w-full border rounded-md px-3 py-2 mb-3"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={venue.rating}
                onChange={handleVenueChange}
                placeholder="Rating (e.g., 4.5)"
                min="0"
                max="5"
                step="0.01"
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <label className="block font-medium mb-1">Featured</label>
              <div className="mb-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={venue.featured}
                  onChange={handleVenueChange}
                  className="mr-2"
                />
                <span>Featured</span>
              </div>

              <label className="block font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={venue.imageUrl}
                onChange={handleVenueChange}
                placeholder="Image URL"
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <label className="block font-medium mb-1">Price per 30 min</label>
              <input
                type="number"
                name="pricePer30Min"
                value={venue.pricePer30Min}
                onChange={handleVenueChange}
                placeholder="Price per 30 min"
                min="0"
                required
                className="w-full border rounded-md px-3 py-2 mb-3"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add Venue
              </button>
            </div>
          </form>
        )}

        <h3 className="text-2xl font-bold mb-4">Stored Locations & Venues</h3>
        {locations.length === 0 ? (
          <div className="text-gray-500">No locations yet.</div>
        ) : (
          <div className="space-y-8">
            {locations.map((loc) => (
              <div key={loc._id} className="mb-6">
                <h4 className="text-xl font-semibold text-blue-700 mb-2">{loc.location}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loc.venues.map((venue, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                    >
                      <div className="flex items-center mb-2">
                        <b className="text-lg">{venue.name}</b>
                        {venue.featured && (
                          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>
                      {venue.imageUrl && (
                        <img
                          src={venue.imageUrl}
                          alt={venue.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      )}
                      <div className="text-gray-700 text-sm mb-1">
                        {venue.address && <div>📍 {venue.address}</div>}
                        {venue.sport && <div>🏅 {venue.sport}</div>}
                        {venue.rating && <div>⭐ {venue.rating}</div>}
                        {venue.pricePer30Min && (
                          <div>💸 ₹{venue.pricePer30Min}/30min</div>
                        )}
                        {venue.courts && Array.isArray(venue.courts) && (
                          <div>
                            <span className="font-medium">Courts:</span> {venue.courts.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;