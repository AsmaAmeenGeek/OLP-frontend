import React from 'react';
import { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const CourseCard = ({ course }) => {
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post(`courses/${course._id}/enroll`);
      alert('Enrolled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
    setEnrolling(false);
  };

  return (
    <div className="card max-w-sm">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <p className="text-sm text-gray-500 mb-4">By {course.instructor?.name}</p>
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(`/course/${course._id}`)} className="text-butter-brown-500 hover:underline">
          View Details
        </button>
        <button onClick={handleEnroll} disabled={enrolling} className="btn-primary text-sm px-4 py-2">
          {enrolling ? 'Enrolling...' : 'Enroll'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;