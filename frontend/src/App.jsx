import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordPage from './pages/PasswordPage';
import GalleryPage from './pages/GalleryPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddPage from './pages/AddPage';
import MemoryDetailPage from './pages/MemoryDetailPage';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index path='/' element={<PasswordPage />} />
          <Route path='/gallery' element={<ProtectedRoute> <GalleryPage /> </ProtectedRoute>} />
          <Route path='/add' element={<ProtectedRoute> <AddPage /> </ProtectedRoute>} />
          <Route path="/memory/:id" element={<MemoryDetailPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
