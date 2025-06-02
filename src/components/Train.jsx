// src/components/TrainPage.jsx
import React from 'react';
//  import NavBar from './NavBar';
// import Footer from './Footer';

// Component for a single trainer card
const TrainerCard = ({ name, location, audience, image }) => {
  return (
    
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-80">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded">
          TRAINER
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{location}</p>
        <p className="text-gray-700 text-sm mt-2">{audience}</p>
        <div className="mt-2 text-sm text-gray-500 flex items-center">
          <span>★ --</span>
        </div>
      </div>
    </div>
  );
};

// Main page component
const Train = () => {
  
  const trainers = [
  {
    name: 'Ashiq P',
    location: 'Whitefield, Indiranagar, KR Puram, Mahadevapura, Bangalore',
    audience: 'Adults & Kids',
    image: 'https://www.massgeneralbrigham.org/content/mgb-global/global/en/patient-care/services-and-specialties/sports-medicine/programs/certified-athletic-trainers/_jcr_content/root/container_924996778/hero_banner.coreimg.jpeg/1746040709816/certified-athletic-trainers-1428x1110.jpeg',
  },
  {
    name: 'Pooja Batla',
    location: 'Koramangala, HSR Layout, Jayanagar, Bangalore',
    audience: 'Adults',
    image: 'https://www.tcu.edu/academics/images/AthleticTraining.jpg',
  },
  {
    name: 'Jubin Raju',
    location: 'BTM Layout, Richmond Town, Electronic City, Bangalore',
    audience: 'Adults & Kids',
    image: 'https://static.toiimg.com/thumb/msid-59403487,width-400,resizemode-4/59403487.jpg',
  },
  {
    name: 'Amar Singh',
    location: 'Banashankari, Rajajinagar, Malleswaram, Bangalore',
    audience: 'Teens & Adults',
    image: 'https://t3.ftcdn.net/jpg/01/73/89/66/360_F_173896685_3Q3Vv2aCRkm9irKWD1g5BqASx6seST8L.jpg',
  },
  {
    name: 'Maymol Rocky',
    location: 'Indiranagar, Ulsoor, Hebbal, Bangalore',
    audience: 'Women & Kids',
    image: 'https://thebridge.in/h-upload/2021/03/12/540-maymol-rocky-coach-of-indian-womens-football-team-source-aiff.jpg',
  },
  {
    name: 'Ritika Sharma',
    location: 'Kalyan Nagar, Frazer Town, Marathahalli, Bangalore',
    audience: 'Kids & Teens',
    image: 'https://media.istockphoto.com/id/1445099602/photo/soccer-field-woman-coach-with-and-girl-team-training-on-grass-in-background-sports-youth.jpg?s=612x612&w=0&k=20&c=0D22JtbWBwcQHlSUXrcxG-PRhc5pGHYXTUk1VtgWC2Y=',
  },
];


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} {...trainer} />
        ))}
      </div>
    </div>
    
  );
};

export default Train;


