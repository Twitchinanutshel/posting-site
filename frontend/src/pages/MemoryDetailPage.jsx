import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_MEMORY_BY_ID = gql`
  query GetMemoryById($id: ID!) {
    getMemoryById(id: $id) {
      id
      title
      description
      image_path
      date
      uploaded_at
    }
  }
`;

const DELETE_MEMORY = gql`
  mutation DeleteMemory($id: ID!) {
    deleteMemory(id: $id)
  }
`;

const MemoryDetailPage = () => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [confirmTimeout, setConfirmTimeout] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false); // NEW

  const navigate = useNavigate();
  const { id } = useParams();

  const [deleteMemory] = useMutation(DELETE_MEMORY);

  const handleDeleteClick = async () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      const timeout = setTimeout(() => {
        setConfirmingDelete(false);
      }, 5000);
      setConfirmTimeout(timeout);
      return;
    }
    clearTimeout(confirmTimeout);
    try {
      const res = await deleteMemory({ variables: { id } });
      if (res.data.deleteMemory) {
        navigate('/gallery');
      } else {
        alert('Failed to delete memory.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting memory.');
    }
    setConfirmingDelete(false);
  };

  useEffect(() => {
    return () => {
      if (confirmTimeout) clearTimeout(confirmTimeout);
    };
  }, [confirmTimeout]);

  const { data, loading, error } = useQuery(GET_MEMORY_BY_ID, {
    variables: { id },
  });

  if (loading) return <p className="text-pink-500">Loading memory...</p>;
  if (error) return <p className="text-red-500">Memory not found.</p>;

  const memory = data.getMemoryById;

  const imageUrl = `https://posting-site-noahgauci-76f8b67cb3a2.herokuapp.com${memory.image_path}`;

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center">
      <div className="max-w-lg w-full bg-white p-6 rounded-2xl shadow-lg border border-pink-100">
        <img
          src={imageUrl}
          alt={memory.title}
          className="w-full h-96 object-cover rounded-xl mb-4 cursor-pointer"
          onClick={() => setIsZoomed(true)}
        />
        <h2 className="text-2xl font-bold text-pink-600 mb-2">{memory.title}</h2>
        <p className="text-gray-700 mb-4">{memory.description}</p>
        <div className="flex justify-between items-start mt-4">
          <div>
            <p className="text-sm text-gray-500">📅 Date: {new Date(Number(memory.date)).toLocaleDateString('en-GB')}</p>
            <p className="text-sm text-gray-500">
              ⏱ Uploaded: {new Date(Number(memory.uploaded_at)).toLocaleDateString('en-GB')}
            </p>
          </div>
          <button
            onClick={handleDeleteClick}
            className={`hover:cursor-pointer px-4 py-2 ${confirmingDelete ? 'bg-red-600' : 'bg-red-400'} hover:bg-red-500 text-white rounded-lg shadow-md transition`}
          >
            {confirmingDelete ? 'Are you sure?' : 'Remove Memory'}
          </button>
        </div>
      </div>

      <Link
        to="/gallery"
        className="m-4 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg shadow-md transition"
      >
        Go Back 💖
      </Link>

      {/* FULLSCREEN IMAGE OVERLAY */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={imageUrl}
            alt={memory.title}
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
};

export default MemoryDetailPage;
