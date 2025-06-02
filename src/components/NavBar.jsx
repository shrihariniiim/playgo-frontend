// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsOpen(!isOpen);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setLoggedIn(false);
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-green-600 text-white p-4">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <div className="text-lg font-bold">PlayGo</div>

//         <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
//           {isOpen ? (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>

//         <div className="hidden md:flex space-x-8 items-center">
//           <Link to="/" className="hover:text-gray-200">Home</Link>
//           <Link to="/play" className="hover:text-gray-200">Play</Link>
//           <Link to="/train" className="hover:text-gray-200">Train</Link>
//           <Link to="/book" className="hover:text-gray-200">Book</Link>
//           {loggedIn ? (
//             <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
//           ) : (
//             <div>
//               <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden mt-2 space-y-2 px-4 flex flex-col">
//           <Link to="/" className="hover:text-gray-200">Home</Link>
//           <Link to="/play" className="hover:text-gray-200">Play</Link>
//           <Link to="/train" className="hover:text-gray-200">Train</Link>
//           <Link to="/book" className="hover:text-gray-200">Book</Link>
//           {loggedIn ? (
//             <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
//           ) : (
//             <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 w-fit">Login/Signup</Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Gamepad2,
  Dumbbell,
  CalendarCheck,
  LogIn,
  LogOut,
  UserPlus,
  Menu,
  X
} from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-bold flex items-center gap-2">
          <Gamepad2 className="w-6 h-6" />
          PlayGo
        </div>

        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="flex items-center gap-1 hover:text-gray-200">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link to="/play" className="flex items-center gap-1 hover:text-gray-200">
            <Gamepad2 className="w-5 h-5" /> Play
          </Link>
          <Link to="/train" className="flex items-center gap-1 hover:text-gray-200">
            <Dumbbell className="w-5 h-5" /> Train
          </Link>
          <Link to="/book" className="flex items-center gap-1 hover:text-gray-200">
            <CalendarCheck className="w-5 h-5" /> Book
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <div className="flex gap-3 items-center">
              <Link to="/login" className="flex items-center gap-1 hover:text-gray-200">
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-1 hover:text-gray-200">
                <UserPlus className="w-4 h-4" /> Signup
              </Link>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 flex flex-col">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-200">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link to="/play" className="flex items-center gap-2 hover:text-gray-200">
            <Gamepad2 className="w-5 h-5" /> Play
          </Link>
          <Link to="/train" className="flex items-center gap-2 hover:text-gray-200">
            <Dumbbell className="w-5 h-5" /> Train
          </Link>
          <Link to="/book" className="flex items-center gap-2 hover:text-gray-200">
            <CalendarCheck className="w-5 h-5" /> Book
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-green-600 px-3 py-1 rounded flex items-center gap-2 hover:bg-green-100 w-fit"
            >
              <LogIn className="w-4 h-4" /> Login/Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
