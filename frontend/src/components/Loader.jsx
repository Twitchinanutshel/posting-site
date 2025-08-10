import React from 'react'

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-pink-50 z-50">
    <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
  </div>
);


export default Loader