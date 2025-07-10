import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "features/auth/AuthContext";
import { signOut } from "services/authService";
import {
  FaUserMd,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserShield,
} from "react-icons/fa";

export const Header: React.FC = () => {
  const { session } = useAuth();

  return (
    <header className="bg-primary p-4 border-b border-secondary flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="text-white text-2xl font-bold hover:text-accent transition duration-300 ease-in-out flex items-center"
      >
        Free Sessions
      </Link>
      <nav className="flex items-center space-x-6">
        <Link
          to="/directory"
          className="text-white hover:text-accent transition duration-300 ease-in-out text-lg font-medium flex items-center"
        >
          <FaUserMd className="mr-2" /> Directory
        </Link>
        {session ? (
          <>
            <Link
              to="/dashboard"
              className="text-white hover:text-accent transition duration-300 ease-in-out text-lg font-medium flex items-center"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
            {session.user.email === process.env.REACT_APP_ADMIN_EMAIL && (
              <Link
                to="/admin"
                className="text-white hover:text-accent transition duration-300 ease-in-out text-lg font-medium flex items-center"
              >
                <FaUserShield className="mr-2" /> Admin
              </Link>
            )}
            <button
              onClick={signOut}
              className="text-white hover:text-accent transition duration-300 ease-in-out text-lg font-medium bg-transparent border-none cursor-pointer flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-white hover:text-accent transition duration-300 ease-in-out text-lg font-medium flex items-center"
          >
            <FaSignInAlt className="mr-2" /> Therapist Login
          </Link>
        )}
      </nav>
    </header>
  );
};

