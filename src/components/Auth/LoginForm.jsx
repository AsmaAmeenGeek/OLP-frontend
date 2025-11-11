import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
      reset();
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-6 text-center text-warm-gray-900">Login</h2>
      <input
        {...register('email', { required: 'Email is required' })}
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 border rounded-md"
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 border rounded-md"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
      <button type="submit" className="w-full btn-primary">Login</button>
    </form>
  );
};

export default LoginForm;