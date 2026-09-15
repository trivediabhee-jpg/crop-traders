import React, { useState } from "react";
import axios from "axios";

export default function BuyCropRequest() {
  const [form, setForm] = useState({
    company: "",
    person: "",
    email: "",
    phone: "",
    crop: "",
    quantity: "",
    price: "",
    location: "",
    date: "",
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
        "http://localhost:4000/api/buy-request",
        {
          company: form.company,
          person: form.person,
          email: form.email,
          phone: form.phone,
          crop: form.crop,
          quantity: form.quantity,
          price: form.price,
          location: form.location,
          date: form.date,
          notes: form.notes,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Buy Request:", res.data);

      alert("✅ Buy Request Sent Successfully!");

      setForm({
        company: "",
        person: "",
        email: "",
        phone: "",
        crop: "",
        quantity: "",
        price: "",
        location: "",
        date: "",
        notes: "",
      });
    } catch (error) {
      console.error("Buy Request Error:", error);

      alert(
        error.response?.data?.message ||
          "❌ Failed to send buy request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Buy Crop Request
          </h1>

          <p className="text-gray-500 mt-2">
            Submit your crop buying requirements to the owner.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Person */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Person
            </label>

            <input
              type="text"
              name="person"
              value={form.person}
              onChange={handleChange}
              placeholder="Enter contact person name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Crop */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Crop Name
            </label>

            <input
              type="text"
              name="crop"
              value={form.crop}
              onChange={handleChange}
              placeholder="e.g. Wheat, Rice, Potato"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Required Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter required quantity"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Offered Price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter offered price"
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter delivery/location"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Required Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any additional requirements..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Sending Request..." : "🛒 Send Buy Request"}
          </button>

        </form>
      </div>
    </div>
  );
}
