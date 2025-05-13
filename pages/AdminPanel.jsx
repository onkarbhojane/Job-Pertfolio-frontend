import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    image: '',
    email: '',
    skills: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/profiles', formData);
      fetchProfiles();
      setFormData({ name: '', address: '', description: '', image: '', email: '', skills: '' });
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/profiles/${id}`);
      fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="p-2 border rounded"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="p-2 border rounded"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="p-2 border rounded"
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
          />
          <textarea
            placeholder="Description"
            className="p-2 border rounded md:col-span-2"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add Profile
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <button
                onClick={() => deleteProfile(profile.id)}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3">{profile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;