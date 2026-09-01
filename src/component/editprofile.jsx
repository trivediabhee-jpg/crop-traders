import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile() {

  console.log("EditProfile Page Loaded");

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    village: ""
  });

  // 🔥 existing data load karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/user/profile",
          { withCredentials: true }
        );

        setForm(res.data); // 👈 form fill ho jayega
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:4000/api/active-crops/update-profile",
        form,
        { withCredentials: true }
      );

      alert("✅ Profile Updated");

    } catch (error) {
      console.log(error);
      alert("❌ Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          ✏️ Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="text"
            name="village"
            placeholder="Village"
            value={form.village}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}