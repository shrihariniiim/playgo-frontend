import React from 'react';
// Ensure Tailwind CSS is imported in your main CSS file or index.css

const games = [
  {
    id: 1,
    type: '8 A Side • Regular',
    title: 'OUTPLAY | 6981 Karma',
    time: 'Sun, 04 May 2025, 09:00 PM - 10:00 PM',
    location: 'Bangalore Football S... ~1.87 Kms',
    level: 'Beginner - Professional',
    status: 'Only 2 Slots',
  },
  {
    id: 2,
    type: '9 A Side • Regular',
    title: 'Manosh | 3967 Karma',
    time: 'Mon, 05 May 2025, 10:30 PM - 11:30 PM',
    location: 'Bangalore Football S... ~1.87 Kms',
    level: 'Beginner - Professional',
    status: '2/18 Going',
  },

  {
    id: 3,
    type: '9 A Side • Regular',
    title: 'Manosh | 3967 Karma',
    time: 'Mon, 05 May 2025, 10:30 PM - 11:30 PM',
    location: 'Bangalore Football S... ~1.87 Kms',
    level: 'Beginner - Professional',
    status: '2/18 Going',
  },

  {
    id: 4,
    type: '9 A Side • Regular',
    title: 'Manosh | 3967 Karma',
    time: 'Mon, 05 May 2025, 10:30 PM - 11:30 PM',
    location: 'Bangalore Football S... ~1.87 Kms',
    level: 'Beginner - Professional',
    status: '2/18 Going',
  },

  {
    id: 5,
    type: '9 A Side • Regular',
    title: 'Manosh | 3967 Karma',
    time: 'Mon, 05 May 2025, 10:30 PM - 11:30 PM',
    location: 'Bangalore Football S... ~1.87 Kms',
    level: 'Beginner - Professional',
    status: '2/18 Going',
  },
  {
    id: 6,
    type: '9 A Side • Regular',
    title: 'Manosh | 3967 Karma',
    time: 'Mon, 05 May 2025, 10:30 PM - 11:30 PM',
    location: 'Bangalore Football S... ~1.87 Kms',
    level: 'Beginner - Professional',
    status: '2/18 Going',
  },

  // Add more objects as needed
];

const GameCardGrid = () => {
  const handleCardClick = (gameId) => {
    // Add custom behavior for each card
    console.log(`Clicked game with ID: ${gameId}`);
    // e.g., navigate(`/game/${gameId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => handleCardClick(game.id)}
          >
            <div className="text-sm text-gray-500">{game.type}</div>
            <div className="font-semibold text-gray-800 mt-1">{game.title}</div>
            <div className="text-sm text-gray-700 mt-2">{game.time}</div>
            <div className="text-sm text-gray-600">{game.location}</div>
            <div className="text-xs bg-gray-200 inline-block px-2 py-1 rounded-full mt-2">
              {game.level}
            </div>
            <div className="text-xs text-yellow-600 font-semibold mt-2">
              {game.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCardGrid;
