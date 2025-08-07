import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($password: String!) {
    login(password: $password)
  }
`;

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [submitLogin, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitLogin({ variables: { password } });

      const token = response.data.login;
      if (token) {
        sessionStorage.setItem('token', token); // ✅ just store token now
        console.log('✅ Authenticated');

        await new Promise(resolve => setTimeout(resolve, 1000));

        navigate('/gallery');
      } else {
        console.log('❌ Incorrect password.');
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };


  let value = null;

  try {
    const access = sessionStorage.getItem('access');
    if (access) {
      const parsed = JSON.parse(access);
      value = parsed?.value ?? null;
    }
  } catch (e) {
    console.error('Error parsing access:', e);
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
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
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-pink-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition"
          >
            {loading ? 'Checking...' : 'Log In 💞'}
          </button>
        </form>

        {value === 'true' && (
          <p className="mt-4 text-green-600 text-center">Correct password! 💖</p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center">Incorrect password 😢</p>
        )}

        <p className="text-center mt-6 text-pink-400 text-sm">
          I love you dearly 💝
        </p>
      </div>
    </div>
  );
};

export default PasswordPage;
