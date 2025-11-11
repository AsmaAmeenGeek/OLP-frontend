import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50">
    <Navbar />
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-8">
      <img src="/coverImg.png" alt="LearnHub" className="w-full max-w-2xl rounded-lg shadow-soft" />
      <h1 className="text-4xl md:text-6xl font-bold text-warm-gray-900">Welcome to LearnHub</h1>
      <p className="text-xl text-gray-600 max-w-md">Your gateway to personalized learning with AI-powered recommendations.</p>
      <Link to="/register" className="btn-primary px-8 py-4 text-lg flex items-center space-x-3">
        Get Started 
      </Link>
    </div>
  </div>
);

export default Landing;