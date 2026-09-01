import React, { useState } from "react";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Client Buy Request:", form);
    alert("✅ Buy request sent to firm!");

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
  };

  return (
    <div className="min-h-screen bg-[#f4fdf7] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Crop Purchase Request 🏢🌾
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Company Name */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Contact Person */}
          <input
            type="text"
            name="person"
            placeholder="Contact Person"
            value={form.person}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Crop */}
          <input
            type="text"
            name="crop"
            placeholder="Crop Name (Wheat, Rice...)"
            value={form.crop}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Quantity */}
          <input
            type="number"
            name="quantity"
            placeholder="Required Quantity (Quintal)"
            value={form.quantity}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Offer Price (₹ per Quintal)"
            value={form.price}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Delivery Location"
            value={form.location}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Additional requirements (optional)"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="md:col-span-2 input"
          />

          {/* Submit */}
          <button
            type="submit"
            className="md:col-span-2 w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
          >
            Send Buy Request
          </button>

        </form>
      </div>
    </div>
  );
}
