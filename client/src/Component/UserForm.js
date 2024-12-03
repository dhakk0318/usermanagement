import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [view, setView] = useState('welcome');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('photo', photo);

    try {
      if (currentUserId) {
        await axios.put(`http://localhost:3001/api/users/${currentUserId}`, formData);
      } else {
        await axios.post('http://localhost:3001/api/users', formData);
      }
      fetchUsers();
      resetForm();
      setView('list');
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPhoto(null);
    setCurrentUserId(null);
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setCurrentUserId(user._id);
    setView('form');
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-full">
      {view === 'welcome' && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <h1 className="text-5xl font-bold mb-6 text-gradient">Welcome to User Management👋</h1>
          <div className="space-x-4">
            <button
              onClick={() => setView('form')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Add User
            </button>
            <button
              onClick={() => setView('list')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              View Users
            </button>
          </div>
        </div>
      )}

      {view === 'form' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <button
              onClick={() => setView('welcome')}
              className="text-xl"
            >
              🔙
            </button>
            <h1 className="text-2xl font-semibold mb-6 text-center">{currentUserId ? 'Edit User' : 'Add User'}</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
                <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-medium">Photo</label>
                <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">{loading ? 'Submitting...' : currentUserId ? 'Update User' : 'Submit'}</button>
            </form>
          </div>
        </div>
      )}

      {view === 'list' && (
        <div className="p-8">
          <button onClick={() => setView('welcome')}   className="text-xl"
            >
              🔙</button>
          <h2 className="text-2xl text-center font-bold mb-4">Users List</h2>
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-orange-300">
                <th className="border px-4 py-2">Photo</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone Number</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">
                    {user.photo ? <img src={user.photo} alt={user.name} className="h-12 w-12 rounded-full mx-auto" /> : 'No Image'}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phoneNumber}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserForm;
