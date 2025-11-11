import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserIcon, BellIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleNotification = () => alert('Notifications (coming soon in future versios.....)');  // UI only future dev

  return (
    <nav className="bg-butter-brown-500 text-white p-4 shadow-soft relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-butter-brown-500 font-bold text-lg">LH</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>{user.name} ({user.role})</span>
              </span>
              {/* Notification Bell icon - Only for logged-in users and ui only */}
              <button onClick={handleNotification} className="relative p-1 rounded-full hover:bg-white/20 transition-colors">
                <BellIcon className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>  
              </button>
              <button onClick={logout} className="btn-primary text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-butter-brown-100">Register</Link>
              <Link to="/login" className="btn-primary text-sm">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;