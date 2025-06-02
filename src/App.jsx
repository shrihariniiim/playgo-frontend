import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Play from './components/Play';
import Train from './components/Train';
import Book from './components/Book';
import ImageLayout from './components/ImageLayout';
import ImageDetail from './components/ImageDetails';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard'; 
import VenueDetail from './components/VenueDetail';
import BookingPage from './components/BookingPage';
import BookingSuccess from "./components/BookingSuccess";


const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<Play />} />
        <Route path="/train" element={<Train />} />
        <Route path="/book" element={<Book />} />
    <Route path="/venue/:venueId" element={<VenueDetail />} />
    <Route path="/booking/:venueId" element={<BookingPage />} />
        <Route path="/" element={<ImageLayout />} />
        <Route path="/image/:id" element={<ImageDetail />} />
         <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 

        />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </Router>
      
    
  );
};

export default App;
