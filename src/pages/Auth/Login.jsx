import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';

const Login = () => (
  <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex flex-col">
    <Navbar />
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <LoginForm />
        <p className="text-center text-gray-600 text-sm">
          Don't have an account? <Link to="/register" className="text-butter-brown-500 hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Login;


