import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      // Logout hone ke baad Home page par bhej do
      navigate("/", { replace: true });

    } catch (error) {
      console.log(error);
      alert("Logout Failed");
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-700"
        >
          AgriCold 🌾
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-green-600"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-green-600"
          >
            About
          </Link>

          {/* Farmer */}
          {user?.role === "farmer" && (
            <>
              <Link
                to="/profile"
                className="text-green-600"
              >
                Profile
              </Link>

              <Link
                to="/activecrop"
                className="text-green-600"
              >
                Active Crop
              </Link>
            </>
          )}

          {/* Client */}
          {user?.role === "client" && (
            <>
              <Link
                to="/client/profile"
                className="text-green-600"
              >
                Profile
              </Link>

              <Link
                to="/client/buycrop"
                className="text-green-600"
              >
                Buy Crop
              </Link>
            </>
          )}

          {user ? (
            <>
              <span className="text-gray-700 font-medium">
                Hi, {user.fullname}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

