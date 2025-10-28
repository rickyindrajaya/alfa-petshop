import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useApp();
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (login(username, password)) {
      onClose();
      setError('');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <button onClick={() => { onClose(); setError(''); }} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Login
          </button>
          <p className="text-sm text-gray-500 text-center mt-4">
            Demo: username: <code className="bg-gray-100 px-2 py-1 rounded">admin</code>, password: <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
          </p>
        </form>
      </div>
    </div>
  );
}