import React from "react";
import { useAuth } from "../context/Authcontext";

const ClientProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="mt-24 text-center text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Client Profile 🛒
        </h2>

        <div className="space-y-4 text-gray-700">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name:</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Role:</span>
            <span className="capitalize">{user.role}</span>
          </div>

        </div>

        <div className="mt-8 text-center">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClientProfile;
