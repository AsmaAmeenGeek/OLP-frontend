import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';

const Register = () => (
  <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex flex-col">
    <Navbar />
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <RegisterForm />
        <p className="text-center text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-butter-brown-500 hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Register;