import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const HomePage: React.FC = () => {
  const { session } = useAuth();
  const isAdmin = session && session.user.email === process.env.REACT_APP_ADMIN_EMAIL;

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
          Find Your Support During the Holidays
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 font-medium mb-8">
          Connecting individuals with free therapy sessions to foster well-being and resilience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/directory"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            View Therapist Directory
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-lightAccent md:py-4 md:text-lg md:px-10 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Go to Admin Page
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;