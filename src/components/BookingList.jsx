// import React, { useEffect, useState } from "react";

// function BookingList({ location, searchTrigger }) {
//   const [players, setPlayers] = useState([]);

//   useEffect(() => {
//     if (!location) {
//       setPlayers([]);
//       return;
//     }
//     fetch(`http://:5001/api/bookings/players?location=${encodeURIComponent(location)}`)
//       .then(res => res.json())
//       .then(data => setPlayers(data));
//   }, [location, searchTrigger]);

//   return (
//     <div>
//       <h2>Players Who Booked in Location</h2>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
//         {players.map(player => (
//           <div key={player._id} style={{
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             padding: "16px",
//             width: "250px"
//           }}>
//             <h3>{player.name || player.email}</h3>
//             <p>Email: {player.email}</p>
//             <p>Role: {player.role}</p>
//             <p>Karma: {player.karma ?? "N/A"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BookingList;


import React, { useEffect, useState } from "react";

function BookingList({ location, searchTrigger }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!location) {
      setPlayers([]);
      return;
    }

    fetch(`https://my-playgo-backend.onrender.com/api/bookings/players?location=${encodeURIComponent(location)}`)
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Error fetching players:", err));
  }, [location, searchTrigger]);

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Players Who Booked in <span className="text-green-600">{location}</span>
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {players.length > 0 ? (
          players.map((player) => (
            <div
              key={player._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {player.name || player.email}
              </h3>
              <p className="text-gray-600 text-sm mb-1">Email: {player.email}</p>
              <p className="text-gray-600 text-sm mb-1">Role: {player.role}</p>
              <p className="text-gray-600 text-sm mb-1">
                Karma: {player.karma ?? "N/A"}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                Venue: <span className="font-medium">{player.venueName ?? "Unknown"}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Location: <span className="font-medium">{player.location || location}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-md col-span-full">No bookings found for this location.</p>
        )}
      </div>
    </div>
  );
}

export default BookingList;
