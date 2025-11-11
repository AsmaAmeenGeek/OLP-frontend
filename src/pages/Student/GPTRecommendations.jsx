import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import Navbar from '../../components/Common/Navbar';

const GPTRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/gpt/recommend', data);
      setRecommendations(res.data.recommendations);
      alert('Recommendations generated!');  // Success popup
      reset();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to get recommendations');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-brown-500 via-butter-brown-100 to-butter-brown-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center space-y-8">
        <h1 className="text-2xl font-bold text-warm-gray-900 text-center">AI Course Recommendations</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md card">
          <textarea
            {...register('prompt', { required: 'Prompt required' })}
            placeholder='e.g., "I want to be a software engineer, what courses should I follow?"'
            className="w-full p-3 mb-4 h-32 border rounded-md text-warm-gray-900 placeholder-gray-600"
          />
          <input
            {...register('maxSuggestions', { valueAsNumber: true, min: 1, max: 10 })}
            type="number"
            placeholder="Number of suggestions (1-10)"
            className="w-full p-3 mb-4 border rounded-md text-warm-gray-900"
            defaultValue={5}
          />
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? 'Generating...' : 'Get Recommendations'}
          </button>
        </form>
        {recommendations.length > 0 && (
          <div className="w-full max-w-4xl space-y-6">
            <h2 className="text-xl font-semibold text-warm-gray-900">Recommendations</h2>
            {recommendations.map((rec, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="font-semibold text-warm-gray-900">{rec.suggested_title}</h3>
                <p className="text-gray-600 mb-4">{rec.reason}</p>
                {rec.matched && rec.courses.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Matched Courses:</p>
                    {rec.courses.map((course, i) => (
                      <div key={i} className="p-3 bg-white rounded-md shadow-soft">
                        <h4 className="font-semibold text-warm-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No matching courses found.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GPTRecommendations;