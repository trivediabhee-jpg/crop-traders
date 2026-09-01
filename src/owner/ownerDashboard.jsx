import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";

const OwnerDashboard = () => {
  const { user } = useAuth();

  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    cropName: "",
    quantity: "",
    unit: "kg",
    price: "",
    description: "",
  });

  // ==========================================
  // FETCH OWNER INVENTORY
  // ==========================================

  const fetchInventory = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/owner/inventory",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCrops(data.crops || []);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.error("Inventory Error:", error);
    }
  };


  useEffect(() => {
    fetchInventory();
  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================================
  // ADD CROP
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:4000/api/owner/inventory",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            cropName: form.cropName,
            quantity: Number(form.quantity),
            unit: form.unit,
            price: Number(form.price),
            description: form.description,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        setMessage("✅ Crop added successfully!");

        setForm({
          cropName: "",
          quantity: "",
          unit: "kg",
          price: "",
          description: "",
        });

        setShowForm(false);

        fetchInventory();

      } else {

        setMessage(
          `❌ ${data.message || "Failed to add crop"}`
        );
      }

    } catch (error) {

      console.error("Add Crop Error:", error);

      setMessage(
        "⚠️ Server error. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // DELETE CROP
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this crop?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:4000/api/owner/inventory/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {

        setMessage("✅ Crop removed successfully!");

        fetchInventory();

      } else {

        setMessage(
          `❌ ${data.message || "Delete failed"}`
        );
      }

    } catch (error) {

      console.error("Delete Error:", error);

      setMessage(
        "⚠️ Server error."
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6 lg:px-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">

              Welcome back,{" "}
              {user?.fullname || "Owner"} 👋

            </h1>

            <p className="text-gray-500 mt-2">

              Manage your crops and inventory from here.

            </p>

          </div>


          {/* ADD CROP BUTTON */}

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition"
          >

            {showForm
              ? "✕ Close"
              : "＋ Add Crop"}

          </button>

        </div>


        {/* ==========================================
            MESSAGE
        ========================================== */}

        {message && (

          <div className="mb-6 bg-white rounded-xl shadow p-4">

            <p className="text-center font-medium">
              {message}
            </p>

          </div>

        )}


        {/* ==========================================
            STATS
        ========================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Farmer Requests
            </p>

            <h2 className="text-3xl font-bold mt-2">
              0
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              New requests
            </p>

          </div>


          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Available Crops
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {crops.filter(
                (crop) => crop.available
              ).length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Crops available for clients
            </p>

          </div>


          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Buy Requests
            </p>

            <h2 className="text-3xl font-bold mt-2">
              0
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Pending requests
            </p>

          </div>


          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Total Inventory
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {crops.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Crops in inventory
            </p>

          </div>

        </div>


        {/* ==========================================
            ADD CROP FORM
        ========================================== */}

        {showForm && (

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Add Crop to Inventory 🌾

            </h2>


            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              {/* Crop Name */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crop Name
                </label>

                <input
                  type="text"
                  name="cropName"
                  value={form.cropName}
                  onChange={handleChange}
                  placeholder="e.g. Wheat"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

              </div>


              {/* Quantity */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  min="1"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

              </div>


              {/* Unit */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit
                </label>

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >

                  <option value="kg">
                    Kilogram (kg)
                  </option>

                  <option value="quintal">
                    Quintal
                  </option>

                  <option value="ton">
                    Ton
                  </option>

                </select>

              </div>


              {/* Price */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per {form.unit}
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 28"
                  min="0"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

              </div>


              {/* Description */}

              <div className="md:col-span-2">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter crop details..."
                  rows="4"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Submit */}

              <div className="md:col-span-2 flex justify-end">

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl font-semibold text-white shadow-md transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >

                  {loading
                    ? "Adding..."
                    : "Add to Inventory"}

                </button>

              </div>

            </form>

          </div>

        )}


        {/* ==========================================
            INVENTORY
        ========================================== */}

        <div className="mb-10">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Owner Inventory
              </h2>

              <p className="text-gray-500 mt-1">
                Crops currently available in your inventory.
              </p>

            </div>

          </div>


          {crops.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <div className="text-5xl mb-4">
                🌾
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No crops in inventory
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first crop to make it available for clients.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
              >
                ＋ Add First Crop
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {crops.map((crop) => (

                <div
                  key={crop._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >

                  {/* Crop Header */}

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-bold text-gray-800 capitalize">
                        🌾 {crop.cropName}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Owner Inventory
                      </p>

                    </div>


                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        crop.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {crop.available
                        ? "Available"
                        : "Unavailable"}

                    </span>

                  </div>


                  {/* Crop Information */}

                  <div className="mt-6 space-y-3">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Quantity
                      </span>

                      <span className="font-semibold">
                        {crop.quantity} {crop.unit}
                      </span>

                    </div>


                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Price
                      </span>

                      <span className="font-semibold text-green-700">
                        ₹{crop.price}/{crop.unit}
                      </span>

                    </div>

                  </div>


                  {/* Description */}

                  {crop.description && (

                    <p className="text-sm text-gray-500 mt-5 border-t pt-4">
                      {crop.description}
                    </p>

                  )}


                  {/* Actions */}

                  <div className="flex gap-3 mt-6">

                    <button
                      className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(crop._id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default OwnerDashboard;