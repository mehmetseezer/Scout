// src/pages/NotFound.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = "Scout";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Sayfa bulunamadı.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
      >
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;