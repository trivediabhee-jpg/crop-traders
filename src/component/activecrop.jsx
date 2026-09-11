import React, { useState } from "react";
import axios from "axios";

export default function ActiveCropForm() {
  const [form, setForm] = useState({
    cropName: "",
    quantity: "",
    expectedPrice: "",
    harvestDate: "",
    storageDuration: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/active-crops/activecrop",
        {
          cropName: form.cropName,
          quantity: form.quantity,
          expectedPrice: form.expectedPrice,
          harvestDate: form.harvestDate,
          storageDuration: form.storageDuration,
          notes: form.notes,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Crop Saved:", res.data);

      alert("✅ Active Crop Request Added Successfully!");

      setForm({
        cropName: "",
        quantity: "",
        expectedPrice: "",
        harvestDate: "",
        storageDuration: "",
        notes: "",
      });
    } catch (error) {
      console.error("Crop Error:", error);

      alert(
        error.response?.data?.message ||
          "❌ Failed to add crop request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            🌾 Add Active Crop
          </h1>

          <p className="text-gray-500 mt-2">
            Submit your crop details to send a request to the owner.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

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
              placeholder="e.g. Wheat, Rice, Potato"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
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
              placeholder="Enter quantity"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Expected Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expected Price
            </label>

            <input
              type="number"
              name="expectedPrice"
              value={form.expectedPrice}
              onChange={handleChange}
              placeholder="Expected price per unit"
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Harvest Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Harvest Date
            </label>

            <input
              type="date"
              name="harvestDate"
              value={form.harvestDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Storage Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Storage Duration (Days)
            </label>

            <input
              type="number"
              name="storageDuration"
              value={form.storageDuration}
              onChange={handleChange}
              placeholder="e.g. 30"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any additional information..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading
              ? "Submitting..."
              : "🌾 Submit Crop Request"}
          </button>

        </form>
      </div>
    </div>
  );
}
