import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/Authcontext.jsx";
import ProtectedRoute from "./route/protectedroute.jsx";
import RoleProtectedRoute from "./route/roleprotected.jsx";

import Navbar from "./component/Navbar.jsx";

import Home from "./component/home.jsx";
import About from "./component/about.jsx";
import Login from "./forms/login.jsx";
import Signup from "./forms/signup.jsx";
import Stock from "./component/store.jsx";

import FarmerProfile from "./component/Farmerprofile.jsx";
import ActiveCropForm from "./component/activecrop.jsx";

import BuyCropRequest from "./component/client/Buycroprequest.jsx";
import ClientProfile from "./component/Clientprofile.jsx";

import EditProfile from "./component/editprofile.jsx";

import OwnerDashboard from "./owner/ownerDashboard.jsx";


// ==========================================
// ROOT ROUTE
// ==========================================

const RootRoute = () => {
  const { user, loading } = useAuth();

  // AuthContext abhi check kar raha hai
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  // Owner hai to Owner Dashboard
  if (user?.role === "owner") {
    return <Navigate to="/owner/dashboard" replace />;
  }

  // Baaki users ke liye normal Home
  return <Home />;
};


// ==========================================
// APP
// ==========================================

const App = () => {
  return (
    <AuthProvider>

      <Navbar />

      <Routes>

        {/* =================================
            🌍 PUBLIC ROUTES
        ================================= */}

        <Route
          path="/"
          element={<RootRoute />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/store"
          element={<Stock />}
        />


        {/* =================================
            👨‍🌾 FARMER ROUTES
        ================================= */}

        <Route
          path="/profile"
          element={
            <RoleProtectedRoute allowedRole="farmer">
              <FarmerProfile />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/activecrop"
          element={
            <RoleProtectedRoute allowedRole="farmer">
              <ActiveCropForm />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <RoleProtectedRoute allowedRole="farmer">
              <EditProfile />
            </RoleProtectedRoute>
          }
        />


        {/* =================================
            🛒 CLIENT ROUTES
        ================================= */}

        <Route
          path="/client/buycrop"
          element={
            <RoleProtectedRoute allowedRole="client">
              <BuyCropRequest />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/client/profile"
          element={
            <RoleProtectedRoute allowedRole="client">
              <ClientProfile />
            </RoleProtectedRoute>
          }
        />


        {/* =================================
            👑 OWNER ROUTES
        ================================= */}

        <Route
          path="/owner/dashboard"
          element={
            <RoleProtectedRoute allowedRole="owner">
              <OwnerDashboard />
            </RoleProtectedRoute>
          }
        />

      </Routes>

    </AuthProvider>
  );
};


export default App; 


