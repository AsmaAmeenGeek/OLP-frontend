import React, { useContext } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Landing from './pages/Landing';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';

// Student Imports
import StudentCourses from './pages/Student/Courses';
import EnrolledCourses from './pages/Student/EnrolledCourses';
import GPTRecommendations from './pages/Student/GPTRecommendations';

// Instructor Imports
import InstructorDashboard from './pages/Instructor/Dashboard';
import InstructorCourses from './pages/Instructor/Courses';
import CourseStudents from './pages/Instructor/CourseStudents';

//  Protected Route HOC
const ProtectedRoute = ({ children, redirectTo }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="text-center py-8">Loading...</div>;
  return user ? children : <Navigate to={redirectTo} />;
};

// Role Route HOC
const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);
  return user?.role === allowedRole ? children : <Navigate to="/dashboard" />;
};

const AppContent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute redirectTo="/login">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute redirectTo="/login">
          <RoleRoute allowedRole="student">
            <StudentCourses />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/enrolled" element={
        <ProtectedRoute redirectTo="/login">
          <RoleRoute allowedRole="student">
            <EnrolledCourses />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/gpt" element={
        <ProtectedRoute redirectTo="/login">
          <RoleRoute allowedRole="student">
            <GPTRecommendations />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/instructor/dashboard" element={
        <ProtectedRoute redirectTo="/login">
          <RoleRoute allowedRole="instructor">
            <InstructorDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/instructor/courses" element={
        <ProtectedRoute redirectTo="/login">
          <RoleRoute allowedRole="instructor">
            <InstructorCourses />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/instructor/course-students/:courseId" element={
        <ProtectedRoute redirectTo="/login">
          <RoleRoute allowedRole="instructor">
            <CourseStudents />
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;