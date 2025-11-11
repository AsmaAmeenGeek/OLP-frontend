import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import api from '../../utils/api';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';

const InstructorCourses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!user) return;
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      const ownCourses = res.data.courses.filter(course => course.instructor._id === user.id);
      setCourses(ownCourses);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      alert('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Parse simple content (line by line to array of objects)
      if (data.content && data.content.trim()) {
        data.content = data.content.split('\n').filter(line => line.trim()).map(line => ({
          title: line.trim(),
          type: 'text',
          body: line.trim(),
        }));
      } else {
        data.content = [];
      }

      if (editingId) {
        await api.put(`/courses/${editingId}`, data);
      } else {
        await api.post('/courses', data);
      }
      fetchCourses();
      setShowForm(false);
      setEditingId(null);
      reset();
    } catch (err) {
      console.error('Add/Edit error:', err.response?.data || err);
      alert(err.response?.data?.message || 'Operation failed: ' + err.message); 
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setShowForm(true);
    
    const contentString = course.content ? course.content.map(item => item.title || item || 'Untitled').join('\n') : '';
    reset({
      title: course.title,
      description: course.description,
      content: contentString,
    });
  };
  const handleDelete = async (id) => {
      try {
        await api.delete(`/courses/${id}`);
        fetchCourses();
        setDeleteConfirm(null);
      } catch (err) {
        alert('Delete failed');
      }
    };

  if (loading) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex items-center justify-center">
      <Navbar />
      <p className="text-white">Loading your courses...</p>
    </div>
    ); 
    } 
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-warm-gray-900">My Courses</h1>
          <button onClick={() => { setShowForm(true); setEditingId(null); reset(); }} className="btn-primary px-6 py-2">
            Add New Course
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="mb-8 card p-6 max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Course' : 'Add New Course'}</h2>
            <input {...register('title', { required: 'Title required' })} placeholder="Title" className="w-full p-3 mb-4 border rounded-md" />
            {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}
            <textarea {...register('description', { required: 'Description required' })} placeholder="Description" className="w-full p-3 mb-4 border rounded-md h-24" />
            {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>}
            <textarea {...register('content')} placeholder="Content (e.g., 'Module 1: Intro ')" className="w-full p-3 mb-4 border rounded-md h-32" />
            <div className="flex gap-4">
              <button type="submit" className="btn-primary flex-1">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); reset(); }} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No courses yet, Add your first one!</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="card p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-sm text-gray-500 mb-4">Enrolled: {course.students.length}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(course)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex-1">
                    Edit
                  </button>
                  <button onClick={() => setDeleteConfirm(course._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-1">
                    Delete
                  </button>
                  {deleteConfirm === course._id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="mb-4">Delete this course?</p>
                        <div className="flex gap-4">
                          <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                            Delete
                          </button>
                          <button onClick={() => setDeleteConfirm(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button onClick={() => navigate(`/instructor/course-students/${course._id}`)} className="btn-primary px-4 py-2 flex-1">
                    View Students
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourses;