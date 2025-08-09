import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordPage from './pages/PasswordPage';
import GalleryPage from './pages/GalleryPage';
import AddPage from './pages/AddPage';
import MemoryDetailPage from './pages/MemoryDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

import { gql, useQuery } from '@apollo/client';

const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated
  }
`;

function App() {
  const { data, loading, error } = useQuery(IS_AUTHENTICATED);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error checking auth status</p>;

  const isAuthenticated = data?.isAuthenticated;

  return (
    <>
      <Router>
        <Routes>
          <Route index path='/' element={<PasswordPage />} />
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
          <Route path="/memory/:id" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MemoryDetailPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
