import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerProfile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeCrops, setActiveCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const profileRes = await axios.get(
          "http://localhost:4000/api/user/profile",
          { withCredentials: true }
        );

        setUser(profileRes.data);

        const cropRes = await axios.get(
          "http://localhost:4000/api/active-crops/my",
          { withCredentials: true }
        );

        setActiveCrops(cropRes.data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-100 p-6">

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8"
      >

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center text-white text-5xl font-bold"
        >
          {user.fullname?.charAt(0).toUpperCase()}
        </motion.div>

        {/* User Info */}
        <div className="flex-1">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {user.fullname}
          </h2>

          <p className="text-gray-600 text-lg">📧 {user.email}</p>
          <p className="text-gray-600 text-lg">📞 {user.phone}</p>
          <p className="text-gray-600 text-lg">📍 {user.village}</p>

          <span className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold">
            {user.role}
          </span>

          {/* Edit Profile Button */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-5 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            Edit Profile
          </button>

        </div>
      </motion.div>

      {/* Active Crops */}
      <div className="max-w-6xl mx-auto mt-12">

        <h3 className="text-3xl font-bold text-green-700 mb-8 text-center">
          🌾 Active Crops
        </h3>

        {activeCrops.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-8">

            {activeCrops.map((crop) => (

              <motion.div
                key={crop._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-green-500"
              >

                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {crop.cropName}
                </h4>

                <p><b>Quantity:</b> {crop.quantity}</p>
                <p><b>Expected Price:</b> ₹{crop.expectedPrice}</p>
                <p><b>Harvest Date:</b> {crop.harvestDate}</p>
                <p><b>Storage Duration:</b> {crop.storageDuration} days</p>

                {crop.notes && (
                  <p><b>Notes:</b> {crop.notes}</p>
                )}

                <p className="mt-2">
                  <b>Status:</b>
                  <span className="ml-2 px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                    {crop.status}
                  </span>
                </p>

              </motion.div>

            ))}

          </div>

        ) : (

          <div className="text-center text-gray-500 text-lg">
            No Active Crops 🌱
          </div>

        )}

      </div>

    </div>
  );
};

export default FarmerProfile;
