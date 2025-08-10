import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordPage from './pages/PasswordPage';
import GalleryPage from './pages/GalleryPage';
import AddPage from './pages/AddPage';
import MemoryDetailPage from './pages/MemoryDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import TimerPage from './pages/TimerPage'
import Loader from '../components/Loader';

import { gql, useQuery } from '@apollo/client';

const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated
  }
`;

function App() {
  const { data, loading, error, refetch } = useQuery(IS_AUTHENTICATED);


  if (loading) return <Loader />;
  if (error) return <p>Error checking auth status</p>;

  const isAuthenticated = data?.isAuthenticated;

  console.log('Auth status:', isAuthenticated);


  return (
    <div className='bg-pink-50'>
      <Router>
        <Routes>
          <Route index path='/' element={<PasswordPage onLoginSuccess={refetch} />} />
          <Route path='/gallery' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <GalleryPage />
            </ProtectedRoute>
          } />
          <Route path='/add' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddPage />
            </ProtectedRoute>
          } />
          <Route path="/timer" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TimerPage />
            </ProtectedRoute>
          } />
          <Route path="/memory/:id" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MemoryDetailPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
