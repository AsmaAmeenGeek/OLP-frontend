import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
      reset();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-6 text-center text-warm-gray-900">Register</h2>
      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Name"
        className="w-full p-3 mb-4 border rounded-md"
      />
      {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}
      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 border rounded-md"
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
      <input
        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 border rounded-md"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
      <select {...register('role')} className="w-full p-3 mb-6 border rounded-md">
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
      </select>
      <button type="submit" className="w-full btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;