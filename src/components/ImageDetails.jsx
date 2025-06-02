// import React from 'react';
// import { useParams } from 'react-router-dom';

// const imageDetails = {
//   1: { title: 'Image 1', navigate: '/book' },
//   2: { title: 'Image 2', description: 'Details about Image 2' },
//   3: { title: 'Image 3', description: 'Details about Image 3' },
// };

// const ImageDetail = () => {
//   const { id } = useParams();
//   const image = imageDetails[id];

//   if (!image) return <div>.</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{image.title}</h1>
//       <p className="mt-2">{image.description}</p>
//     </div>
//   );
// };

// export default ImageDetail;
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const imageDetails = {
  1: { title: 'Image 1', navigate: '/book' },
  2: { title: 'Image 2', navigate: '/play', description: 'Details about Image 2' },
  3: { title: 'Image 3', navigate: '/train', description: 'Details about Image 3' },
};

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const image = imageDetails[id];

  useEffect(() => {
    // If a navigate path exists, redirect immediately
    if (image?.navigate) {
      navigate(image.navigate);
    }
  }, [image, navigate]);

  if (!image || image.navigate) return null; // Skip rendering if it's navigating

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{image.title}</h1>
      <p className="mt-2">{image.description}</p>
    </div>
  );
};

export default ImageDetail;
