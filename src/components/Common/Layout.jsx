import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, gradient = false }) => (  
  <div className={`min-h-screen ${gradient ? 'bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50' : 'bg-butter-brown-50'}`}>
    <Navbar />
    <main className="container mx-auto py-8 px-4 flex flex-col items-center">  
      {children}
    </main>
  </div>
);

export default Layout;