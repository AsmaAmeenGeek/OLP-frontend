import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/Common/Navbar';

const CourseStudents = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    try {
      const res = await api.get(`/courses/${courseId}/students`);
      setStudents(res.data.students);
      setCourseTitle(res.data.courseTitle);
    } catch (err) {
      console.error('Failed to fetch students');
      alert('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex items-center justify-center">
      <Navbar />
      <p className="text-white">Loading students...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-warm-gray-900">Enrolled Students - {courseTitle}</h1>
          <button onClick={() => navigate('/instructor/courses')} className="btn-primary px-6 py-2">
            Back to Courses
          </button>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Total Enrolled: {students.length}</h2>
          {students.length === 0 ? (
            <p className="text-gray-600">No students enrolled yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-butter-brown-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Enrolled Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{new Date(student.enrolledAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseStudents;