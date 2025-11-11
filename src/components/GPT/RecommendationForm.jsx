import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';

const RecommendationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/gpt/recommend', data);
      setRecommendations(res.data.recommendations);
      reset();
    } catch (err) {
      alert(err.response?.data?.message || 'Recommendation failed');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Course Recommendations</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card max-w-lg">
        <textarea
          {...register('prompt', { required: 'Prompt required' })}
          placeholder="e.g., I want to be a software engineer..."
          className="w-full p-3 mb-4 border rounded-md h-24"
        />
        <input
          {...register('maxSuggestions', { valueAsNumber: true })}
          type="number"
          min="1"
          max="10"
          defaultValue={5}
          className="p-3 border rounded-md w-20"
        />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Generating...' : 'Get Recommendations'}
        </button>
      </form>
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommendations</h2>
          {recommendations.map((rec, idx) => (
            <div key={idx} className="card">
              <h3 className="font-semibold">{rec.suggested_title}</h3>
              <p className="text-gray-600">{rec.reason}</p>
              {rec.matched && rec.courses.map((c, i) => (
                <div key={i} className="ml-4 mt-2 p-2 bg-white rounded">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-gray-500">{c.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;