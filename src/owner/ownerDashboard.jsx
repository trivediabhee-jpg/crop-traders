import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";

const OwnerDashboard = () => {
  const { user } = useAuth();

  // ==========================================
  // STATES
  // ==========================================

  const [crops, setCrops] = useState([]);
  const [farmerRequests, setFarmerRequests] = useState([]);
  const [buyRequests, setBuyRequests] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

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
        console.log("Inventory Error:", data.message);
      }
    } catch (error) {
      console.error("Inventory Error:", error);
    }
  };

  // ==========================================
  // FETCH FARMER + BUY REQUESTS
  // ==========================================

  const fetchRequests = async () => {
    try {
      setRequestLoading(true);

      const [farmerRes, buyRes] = await Promise.all([
        fetch(
          "http://localhost:4000/api/active-crops/owner/all",
          {
            credentials: "include",
          }
        ),

        fetch(
          "http://localhost:4000/api/buy-requests",
          {
            credentials: "include",
          }
        ),
      ]);

      const farmerData = await farmerRes.json();
      const buyData = await buyRes.json();

      // Farmer Requests
      if (farmerRes.ok) {
        setFarmerRequests(farmerData.crops || []);
      } else {
        console.error(
          "Farmer Requests Error:",
          farmerData.message
        );
      }

      // Buy Requests
      if (buyRes.ok) {
        setBuyRequests(buyData.requests || []);
      } else {
        console.error(
          "Buy Requests Error:",
          buyData.message
        );
      }
    } catch (error) {
      console.error("Fetch Requests Error:", error);
    } finally {
      setRequestLoading(false);
    }
  };

  // ==========================================
  // INITIAL FETCH
  // ==========================================

  useEffect(() => {
    fetchInventory();
    fetchRequests();
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
        setMessage(
          "✅ Crop removed successfully!"
        );

        fetchInventory();
      } else {
        setMessage(
          `❌ ${data.message || "Delete failed"}`
        );
      }
    } catch (error) {
      console.error("Delete Error:", error);

      setMessage("⚠️ Server error.");
    }
  };

  // ==========================================
  // UPDATE BUY REQUEST STATUS
  // ==========================================

  const updateBuyRequestStatus = async (
    id,
    status
  ) => {
    try {
      setRequestLoading(true);

      const res = await fetch(
        `http://localhost:4000/api/buy-requests/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(
          status === "Accepted"
            ? "✅ Buy request accepted successfully!"
            : "❌ Buy request rejected."
        );

        await fetchRequests();
      } else {
        setMessage(
          `❌ ${
            data.message ||
            "Failed to update request"
          }`
        );
      }
    } catch (error) {
      console.error(
        "Update Buy Request Error:",
        error
      );

      setMessage(
        "⚠️ Server error while updating buy request."
      );
    } finally {
      setRequestLoading(false);
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Welcome back,{" "}
              {user?.fullname || "Owner"} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your crops, farmer requests,
              buy requests and inventory from here.
            </p>

          </div>

          {/* ADD CROP BUTTON */}

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition"
          >
            {showForm ? "✕ Close" : "＋ Add Crop"}
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

          {/* FARMER REQUESTS */}

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Farmer Requests
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {farmerRequests.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Active farmer requests
            </p>

          </div>

          {/* AVAILABLE CROPS */}

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Available Crops
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {
                crops.filter(
                  (crop) => crop.available
                ).length
              }
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Crops available for clients
            </p>

          </div>

          {/* BUY REQUESTS */}

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Buy Requests
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {buyRequests.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Client buy requests
            </p>

          </div>

          {/* TOTAL INVENTORY */}

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
            FARMER REQUESTS
        ========================================== */}

        <div className="mb-10">

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-gray-800">
              👨‍🌾 Farmer Crop Requests
            </h2>

            <p className="text-gray-500 mt-1">
              Active crop requests submitted by farmers.
            </p>

          </div>

          {requestLoading ? (

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <p className="text-gray-500">
                Loading farmer requests...
              </p>

            </div>

          ) : farmerRequests.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <div className="text-4xl mb-3">
                👨‍🌾
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No farmer requests
              </h3>

              <p className="text-gray-500 mt-2">
                New farmer crop requests will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {farmerRequests.map((request) => (

                <div
                  key={request._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >

                  {/* HEADER */}

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-bold text-gray-800 capitalize">
                        🌾 {request.cropName}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Farmer Request
                      </p>

                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      Pending
                    </span>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-6 space-y-3">

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Farmer
                      </span>

                      <span className="font-semibold text-right">
                        {request.farmer?.fullname || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Phone
                      </span>

                      <span className="font-semibold text-right">
                        {request.farmer?.phone || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Village
                      </span>

                      <span className="font-semibold text-right">
                        {request.farmer?.village || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Quantity
                      </span>

                      <span className="font-semibold">
                        {request.quantity}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Expected Price
                      </span>

                      <span className="font-semibold text-green-700">
                        ₹{request.expectedPrice}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Harvest Date
                      </span>

                      <span className="font-semibold text-right">
                        {request.harvestDate
                          ? new Date(
                              request.harvestDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Storage
                      </span>

                      <span className="font-semibold">
                        {request.storageDuration || "N/A"} Days
                      </span>

                    </div>

                  </div>

                  {/* NOTES */}

                  {request.notes && (

                    <div className="mt-5 border-t pt-4">

                      <p className="text-sm text-gray-500">

                        <span className="font-semibold text-gray-700">
                          Notes:
                        </span>{" "}

                        {request.notes}

                      </p>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ==========================================
            BUY REQUESTS
        ========================================== */}

        <div className="mb-10">

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-gray-800">
              🛒 Buy Requests
            </h2>

            <p className="text-gray-500 mt-1">
              Crop buying requests submitted by clients.
            </p>

          </div>

          {requestLoading ? (

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <p className="text-gray-500">
                Loading buy requests...
              </p>

            </div>

          ) : buyRequests.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <div className="text-4xl mb-3">
                🛒
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No buy requests
              </h3>

              <p className="text-gray-500 mt-2">
                New client buy requests will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {buyRequests.map((request) => (

                <div
                  key={request._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >

                  {/* HEADER */}

                  <div className="flex justify-between items-start gap-3">

                    <div>

                      <h3 className="text-xl font-bold text-gray-800">
                        🛒 {request.crop}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {request.company || "Client"}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        request.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status || "Pending"}
                    </span>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-6 space-y-3">

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Person
                      </span>

                      <span className="font-semibold text-right">
                        {request.person || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Email
                      </span>

                      <span className="font-semibold text-right break-all">
                        {request.email || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Phone
                      </span>

                      <span className="font-semibold text-right">
                        {request.phone || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Quantity
                      </span>

                      <span className="font-semibold">
                        {request.quantity}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Offered Price
                      </span>

                      <span className="font-semibold text-green-700">
                        ₹{request.price}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Location
                      </span>

                      <span className="font-semibold text-right">
                        {request.location || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between gap-3">

                      <span className="text-gray-500">
                        Required Date
                      </span>

                      <span className="font-semibold text-right">
                        {request.date
                          ? new Date(
                              request.date
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>

                    </div>

                  </div>

                  {/* NOTES */}

                  {request.notes && (

                    <div className="mt-5 border-t pt-4">

                      <p className="text-sm text-gray-500">

                        <span className="font-semibold text-gray-700">
                          Notes:
                        </span>{" "}

                        {request.notes}

                      </p>

                    </div>

                  )}

                  {/* ACCEPT / REJECT */}

                  {(!request.status ||
                    request.status === "Pending") && (

                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          updateBuyRequestStatus(
                            request._id,
                            "Accepted"
                          )
                        }
                        disabled={requestLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                      >
                        ✓ Accept
                      </button>

                      <button
                        onClick={() =>
                          updateBuyRequestStatus(
                            request._id,
                            "Rejected"
                          )
                        }
                        disabled={requestLoading}
                        className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                      >
                        ✕ Reject
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

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

                  {/* CROP HEADER */}

                  <div className="flex justify-between items-start gap-3">

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

                  {/* CROP INFORMATION */}

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

                  {/* DESCRIPTION */}

                  {crop.description && (

                    <p className="text-sm text-gray-500 mt-5 border-t pt-4">
                      {crop.description}
                    </p>

                  )}

                  {/* ACTIONS */}

                  <div className="flex gap-3 mt-6">

                    <button
                      className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg font-semibold transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(crop._id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
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