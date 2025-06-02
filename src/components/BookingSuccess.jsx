import React from "react";
import { Link } from "react-router-dom";

const BookingSuccess = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
    <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your booking has been confirmed. Check your email for details.
      </p>
      <Link
        to="/"
        className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default BookingSuccess;