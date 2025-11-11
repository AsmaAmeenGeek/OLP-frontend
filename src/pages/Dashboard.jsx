import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import Navbar from '../components/Common/Navbar';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchEnrolled = async () => {
      try {
        const res = await api.get('/courses');
        const enrolled = res.data.courses.filter(course =>
          course.students.some(s => s.user._id === user.id)
        );
        setEnrolledCourses(enrolled);
      } catch (err) {
        console.error('Failed to fetch enrolled');
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolled();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  if (user.role !== 'student') return <Navigate to="/instructor/dashboard" />;  // Redirect instructor for now

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex items-center justify-center">
      <Navbar />
      <p className="text-white">Loading your dashboard...</p>
    </div>
  );

  const handleViewCourses = () => navigate('/courses');

  // Filter enrolled courses based on search
  const filteredCourses = enrolledCourses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAllCourses = () => {
    setSearch('');  // Clear search to show all enrolled on the dashboard page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center space-y-8"> 
        {/* Welcome message with specific user name */}
        <h1 className="text-3xl font-bold text-warm-gray-900 text-center">Welcome, {user.name}!</h1>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search your enrolled courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 bg-butter-brown-100 text-warm-gray-900 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-butter-brown-500/20 focus:border-butter-brown-500"
        />
        {/* buttons for options */}
        <div className="flex justify-start gap-4 w-full"> 
          <button onClick={handleAllCourses} className="btn-primary text-white px-6 py-2 rounded-md shadow-soft hover:bg-gray-300 flex items-center space-x-2">  
            All Courses 
          </button>
          <button onClick={handleViewCourses} className="bg-white text-butter-brown-500 px-6 py-2 rounded-md shadow-soft hover:bg-gray-300">
            View Courses 
          </button>
          <button onClick={() => navigate('/gpt')} className="bg-white text-butter-brown-500 px-6 py-2 rounded-md shadow-soft hover:bg-gray-300">AI Recommendations</button>
          <button className="bg-white text-butter-brown-500 px-6 py-2 rounded-md shadow-soft hover:bg-gray-300">Finished Courses</button>
          <button className="bg-white text-butter-brown-500 px-6 py-2 rounded-md shadow-soft hover:bg-gray-300">Wishlist</button>
          <button className="bg-white text-butter-brown-500 px-6 py-2 rounded-md shadow-soft hover:bg-gray-300">Certifications</button>

        </div>
        {/* Enrolled courses grid */}
        {filteredCourses.length === 0 ? (
          <p className="text-warm-gray-900 text-center">No enrolled courses found—start browsing!</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">  
            {filteredCourses.map((course) => (
              <div key={course._id} className="card text-center p-6">  
                <h3 className="text-xl font-semibold mb-2 text-warm-gray-900">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-sm text-gray-500 mb-4">By {course.instructor?.name}</p>
                <p className="text-sm text-gray-500">Enrolled: {new Date(course.students.find(s => s.user._id === user.id).enrolledAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;