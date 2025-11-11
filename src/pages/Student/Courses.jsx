import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Common/Navbar';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(`/courses?q=${search}`);
        setCourses(res.data.courses);
      } catch (err) {
        console.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [search]);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      alert('Enrolled successfully!');
      setSearch('');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) return <div className="text-center py-8">Loading courses...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-warm-gray-900 mb-6">Available Courses</h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto p-3 mb-6 border rounded-md text-center"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">No courses found. Check back soon!</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="card text-center">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-sm text-gray-500 mb-4">By {course.instructor?.name}</p>
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="btn-primary w-full"
                >
                  Enroll Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;