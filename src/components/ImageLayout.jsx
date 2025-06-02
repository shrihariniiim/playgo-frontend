import React from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
  { id: 1, src: 'venues.png', title: 'Image 1' },
  { id: 2, src: 'events.png', title: 'Image 2' },
  { id: 3, src: 'trainer.png', title: 'Image 3' },
];

const ImageLayout = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/image/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.title}
            className="w-full md:w-1/3 cursor-pointer"
            onClick={() => handleClick(img.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageLayout;
