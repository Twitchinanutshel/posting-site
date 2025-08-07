import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      const now = Date.now() / 1000; // in seconds
      if (decoded.exp && decoded.exp < now) {
        // Token expired
        sessionStorage.removeItem('token');
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (err) {
      console.error('Invalid token:', err);
      sessionStorage.removeItem('token');
      setIsValid(false);
    }
  }, []);

  if (isValid === null) {
    return null;
  }

  if (isValid === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
