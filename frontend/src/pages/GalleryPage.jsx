import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Loader from '../components/Loader';


const GET_MEMORIES = gql`
  query GetMemories {
    getMemories {
      id
      title
      description
      image_path
      date
      uploaded_at
    }
  }
`;

const GalleryPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_MEMORIES);
  console.log('Query data:', data);


  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">Oops! Couldn't load your memories: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 p-6 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <input
          placeholder="Search for a memory!"
          className="px-4 py-2 rounded-lg border border-pink-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-1/2 text-pink-500 bg-white/70 backdrop-blur-sm"
        />
        <div>
          <Link
            to="/add"
            className="ml-4 px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Add a Memory 💖
          </Link>
          <Link
            to="/timer"
            className="ml-4 px-4 py-2 bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Extra Cute Things 💞
          </Link>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {['2023', '2024', '2025'].map(year => (
          <button
            key={year}
            className="px-4 py-1 bg-white/80 border border-pink-400 rounded-full text-pink-700 hover:bg-pink-100 transition transform hover:scale-105 shadow-sm"
          >
            {year}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.getMemories.map(memory => (
          <Link key={memory.id} to={`/memory/${memory.id}`}>
            <div className="bg-white/80 p-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border border-pink-200 backdrop-blur-sm">
              <img
                src={memory.image_path}
                alt={memory.title}
                crossOrigin="use-credentials"
                className="w-full h-48 object-cover rounded-xl mb-3 shadow-sm"
              />
              <h3 className="text-lg font-bold text-pink-700">{memory.title}</h3>
              <p className="text-sm text-gray-700 mb-1">{memory.description}</p>
              <p className="text-xs text-pink-600">📅 Date: {new Date(Number(memory.date)).toLocaleDateString('en-GB')}</p>
              <p className="text-xs text-pink-500">⏱ Uploaded: {new Date(Number(memory.uploaded_at)).toLocaleDateString('en-GB')}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-10 text-center text-pink-600 font-medium">
        Made with ❤️ and effort for my beautiful girlfriend
      </footer>
    </div>

  );
};

export default GalleryPage;
