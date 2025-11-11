import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import Navbar from '../../components/Common/Navbar';
import { ArrowRightIcon, PlusIcon, PencilIcon, ChartBarIcon, ChatBubbleLeftIcon, BellIcon, CheckCircleIcon, TrashIcon, PencilSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [totalCourses, setTotalCourses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/courses');
      const ownCourses = res.data.courses.filter(course => course.instructor._id === user.id);
      setTotalCourses(ownCourses.length); 

      // Placeholder recent activities (futre development for now it is ui only)
      setRecentActivities([
        { action: 'Added new course', item: 'React Native Basics', icon: CheckCircleIcon, color: 'green' },
        { action: 'Deleted course', item: 'HTML for Beginners', icon: TrashIcon, color: 'red' },
        { action: 'Updated course', item: 'Python for Data Analysis', icon: PencilSquareIcon, color: 'blue' },
      ]);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      alert('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchStats();
  }, [user]);

  const handleAddCourse = () => navigate('/instructor/courses');
  const handleManageCourses = () => navigate('/instructor/courses');
  const handleAnalytics = () => alert('Analytics page (coming soon)');
  const handleFeedback = () => alert('Feedback page (coming soon)');
  const handleNotification = () => alert('Notifications (coming soon)');
  const handleRefresh = () => fetchStats();

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex items-center justify-center">
      <Navbar />
      <p className="text-white">Loading dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center space-y-8">

        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center space-y-8">
        {/* Welcome message with specific user name */}
        <h1 className="text-3xl font-bold text-warm-gray-900 text-center">Welcome, {user.name}!</h1>
        </div> 
         {/*  Buttons  */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          <button onClick={handleAddCourse} className="btn-primary px-6 py-3 text-sm flex items-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all">
            <PlusIcon className="w-5 h-5" />
            Add New Course
          </button>
          <button onClick={handleManageCourses} className="bg-white text-butter-brown-500 px-6 py-3 rounded-md shadow-soft hover:bg-gray-300 hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2">
            <PencilIcon className="w-5 h-5" />
            Manage Courses
          </button>
          <button onClick={handleAnalytics} className="bg-white text-butter-brown-500 px-6 py-3 rounded-md shadow-soft hover:bg-gray-300 hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5" />
            View Analytics
          </button>
          <button onClick={handleFeedback} className="bg-white text-butter-brown-500 px-6 py-3 rounded-md shadow-soft hover:bg-gray-300 hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            View Feedback
          </button>
        </div>

        {/* total cours show in big number in circle badge view */}
        <div className="card p-6 text-center relative">
          <button onClick={handleRefresh} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200">
            
          </button>
          <h2 className="text-xl font-semibold text-warm-gray-900 mb-4">Total Courses Created</h2>
          <div className="w-24 h-24 mx-auto bg-butter-brown-500 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{totalCourses}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Courses: {totalCourses}</p>
        </div>

        {/* Recent Activity Section futere backend developmnt for now ui only */}
        <div className="w-full max-w-2xl card p-6">
          <h2 className="text-xl font-semibold text-warm-gray-900 mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            {recentActivities.map((activity, idx) => (
              <li key={idx} className="flex items-center space-x-3 p-3 bg-white/50 rounded-md">
                <activity.icon className={`w-5 h-5 text-${activity.color}-500`} />
                <span className="text-gray-700">{activity.action}: <span className="font-medium">{activity.item}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;