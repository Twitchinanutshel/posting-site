import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_MEMORY = gql`
  mutation AddMemory($title: String!, $description: String, $file: Upload!, $date: String!) {
    addMemory(title: $title, description: $description, file: $file, date: $date) {
      id
      title
      uploaded_at
      image_path
    }
  }
`;

const AddPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [addMemory, { loading, error }] = useMutation(ADD_MEMORY);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    try {
      await addMemory({
        variables: {
          ...formData,
          file
        }
      });

      setFormData({ title: '', description: '', date: '' });
      setFile(null);
      setPreviewUrl(null);
      navigate('/gallery');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-200">
        <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
          Add a New Memory 💌
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Memory Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-pink-500 bg-white/70"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg resize-none focus:ring-2 focus:ring-pink-500 outline-none text-pink-500 bg-white/70"
            rows={3}
          />

          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-gradient-to-r bg-pink-400 from-pink-300 to-pink-400 file:text-white hover:file:from-pink-400 hover:file:to-pink-500 cursor-pointer"
          />

          {previewUrl && (
            <div className="mt-2 text-center">
              <p className="text-sm text-pink-500 mb-1 italic">You have the most beautiful hair</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-xl border border-pink-200 shadow-md w-full h-auto max-h-64 object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          )}

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-pink-500 bg-white/70"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            {loading ? 'Uploading...' : 'Add Memory 💖'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Try again.</p>
          )}
        </form>

        <p className="text-center mt-6 text-pink-600 text-sm italic">
          Every moment with you is a blessing
        </p>
      </div>
    </div>

  );
};

export default AddPage;
