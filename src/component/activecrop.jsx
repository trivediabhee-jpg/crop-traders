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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        { withCredentials: true }
      );

      console.log("Crop Saved:", res.data);

      alert("✅ Active Crop Added Successfully");

      setForm({
        cropName: "",
        quantity: "",
        expectedPrice: "",
        harvestDate: "",
        storageDuration: "",
        notes: "",
      });

    } catch (error) {

      console.log("Crop Error:", error);

      alert("❌ Failed to add crop");

    }
  };

  return (
    <div className="min-h-screen bg-[#f9fdf9] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow p-8">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Add Active Crop 🌾
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="cropName"
            placeholder="Crop Name"
            value={form.cropName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity (Quintal)"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="number"
            name="expectedPrice"
            placeholder="Expected Price (₹)"
            value={form.expectedPrice}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="date"
            name="harvestDate"
            value={form.harvestDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="number"
            name="storageDuration"
            placeholder="Storage Duration (Days)"
            value={form.storageDuration}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700"
          >
            Submit Crop
          </button>

        </form>

      </div>
    </div>
  );
}
