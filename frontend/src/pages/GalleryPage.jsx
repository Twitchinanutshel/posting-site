import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';


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
  console.log('Image URL:', `https://posting-site-noahgauci-76f8b67cb3a2.herokuapp.com${memory.image_path}`);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <p className="text-pink-500 text-xl text-center">Loading sweet memories...</p>;
  if (error) return <p className="text-red-500 text-center">Oops! Couldn't load your memories.</p>;

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <input
          placeholder="Search for a memory!"
          className="px-4 py-2 rounded-lg border border-pink-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 w-1/2 text-pink-400"
        />
        <Link
          to="/add"
          className="ml-4 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg shadow-md transition"
        >
          Add a Memory 💖
        </Link>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {['2023', '2024', '2025'].map(year => (
          <button
            key={year}
            className="px-4 py-1 bg-white border border-pink-300 rounded-full text-pink-600 hover:bg-pink-100 transition"
          >
            {year}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.getMemories.map(memory => (
          <Link to={`/memory/${memory.id}`}>
            <div
              key={memory.id}
              className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition border border-pink-100"
            >
              <img
                src={`https://posting-site-noahgauci-76f8b67cb3a2.herokuapp.com${memory.image_path}`}
                alt={memory.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-bold text-pink-600">{memory.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{memory.description}</p>
              <p className="text-xs text-gray-500">
                📅 Date: {memory.date}
              </p>
              <p className="text-xs text-gray-500">
                ⏱ Uploaded: {new Date(Number(memory.uploaded_at)).toLocaleDateString('en-GB')}
              </p>
            </div>
          </Link>

        ))}
      </div>

      <footer className="mt-10 text-center text-pink-500">
        Made with love and effort for my beautiful girlfriend
      </footer>
    </div>
  );
};

export default GalleryPage;
