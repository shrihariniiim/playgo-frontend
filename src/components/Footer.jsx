import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-12 mt-auto">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>

        <div className="space-y-3 text-base text-gray-700 max-w-2xl mx-auto">
          <p>
            <span className="font-semibold text-black">PlayGo</span> connects sports enthusiasts with local venues,
            making it easier to find and book sports facilities.
          </p>
          <p>
            We promote sports and fitness by offering a smooth, user-friendly booking experience.
          </p>
          <p>
            Our mission is to make sports accessible to everyone, regardless of location or skill level.
          </p>
        </div>

        <div className="flex justify-center space-x-6 pt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-transform transform hover:scale-110"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-transform transform hover:scale-110"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition-transform transform hover:scale-110"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>

        <hr className="border-t border-gray-300 my-8 w-3/4 mx-auto" />

        <p className="text-sm text-gray-500">&copy; 2025 PlayGo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
