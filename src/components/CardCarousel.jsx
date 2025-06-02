import React, { useRef, useEffect } from 'react';

const cardData = [
  {
    id: 1,
    title: 'Spotify Playlist',
    description: 'Show me',
    image: 'Badminton.avif',
    buttonText: 'Show me',
  },
  {
    id: 2,
    title: 'Thoughts on Playo?',
    description: 'Share now',
    image: 'football_new.avif',
    buttonText: 'Share now',
  },
  {
    id: 3,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'trainer.png',
    buttonText: 'Start now',
  },
  {
    id: 4,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'p.avif',
    buttonText: 'Start now',
  },
  {
    id: 5,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'cricket_new.avif',
    buttonText: 'Start now',
  },
  {
    id: 6,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'flashcamp.avif',
    buttonText: 'Start now',
  },

   {
    id: 7,
    title: 'Spotify Playlist',
    description: 'Show me',
    image: 'Badminton.avif',
    buttonText: 'Show me',
  },
  {
    id: 8,
    title: 'Thoughts on Playo?',
    description: 'Share now',
    image: 'football_new.avif',
    buttonText: 'Share now',
  },
  {
    id: 9,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'trainer.png',
    buttonText: 'Start now',
  },
  {
    id: 10,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'p.avif',
    buttonText: 'Start now',
  },
  {
    id: 11,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'cricket_new.avif',
    buttonText: 'Start now',
  },
  {
    id: 12,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'flashcamp.avif',
    buttonText: 'Start now',
  },
 {
    id: 13,
    title: 'Spotify Playlist',
    description: 'Show me',
    image: 'Badminton.avif',
    buttonText: 'Show me',
  },
  {
    id: 14,
    title: 'Thoughts on Playo?',
    description: 'Share now',
    image: 'football_new.avif',
    buttonText: 'Share now',
  },
  {
    id: 15,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'trainer.png',
    buttonText: 'Start now',
  },
  {
    id: 16,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'p.avif',
    buttonText: 'Start now',
  },
  {
    id: 17,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'cricket_new.avif',
    buttonText: 'Start now',
  },
  {
    id: 18,
    title: 'Plan an Adventure',
    description: 'Start now',
    image: 'flashcamp.avif',
    buttonText: 'Start now',
  },

 
];



const CardCarousel = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollDirection = 1;

    const autoScroll = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft) {
        scrollDirection = -1;
      } else if (container.scrollLeft <= 0) {
        scrollDirection = 1;
      }

      container.scrollBy({
        left: scrollDirection * 2,
        behavior: 'smooth',
      });
    };

    const interval = setInterval(autoScroll, 20); // small step, frequent interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Playgo Picks</h2>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {cardData.map((card) => (
          <div
            key={card.id}
            className="min-w-[250px] rounded-2xl overflow-hidden bg-white shadow-lg flex-shrink-0"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <button className="mt-2 px-4 py-1 text-sm bg-lime-300 rounded-full">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
