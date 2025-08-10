import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($password: String!) {
    login(password: $password)
  }
`;

const PasswordPage = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [submitLogin, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitLogin({ variables: { password } });
      console.log('Login response:', response);
      if (response.data.login) {
        console.log('✅ Authenticated');
        const refetchResult = await onLoginSuccess();
        console.log('Refetched auth status:', refetchResult.data.isAuthenticated);
        navigate('/gallery');
      } else {
        console.log('❌ Incorrect password');
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-200">
        <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
          💕 Anniversary Gift 💕
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-pink-500 bg-white/70"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            {loading ? 'Checking...' : 'Log In 💞'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-500 text-center animate-pulse">Incorrect password 😢</p>
        )}

        <p className="text-center mt-6 text-pink-600 text-sm italic">
          I love you dearly 💝
        </p>
      </div>
    </div>

  );
};

export default PasswordPage;
