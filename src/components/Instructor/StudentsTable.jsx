import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const StudentsTable = ({ courseId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`/courses/${courseId}/students`);
        setStudents(res.data.students);
      } catch (err) {
        console.error('Failed to fetch students');
      }
    };
    fetchStudents();
  }, [courseId]);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Enrolled Students ({students.length})</h2>
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
            <tr key={student.id} className="border-t">
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.email}</td>
              <td className="p-3">{new Date(student.enrolledAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;