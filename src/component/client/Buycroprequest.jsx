import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";

export default function BuyCropRequest() {
  const { user } = useAuth();

  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [quantity, setQuantity] = useState("");

  const [form, setForm] = useState({
    company: "",
    person: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    notes: "",
  });


  // ==========================================
  // GET AVAILABLE CROPS
  // ==========================================

  const fetchAvailableCrops = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4000/api/owner/inventory/available",
        {
          withCredentials: true,
        }
      );

      setCrops(res.data.crops || []);

    } catch (error) {
      console.error(
        "Fetch Available Crops Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load available crops"
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD CROPS
  // ==========================================

  useEffect(() => {
    fetchAvailableCrops();
  }, []);


  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = (crop) => {
    setSelectedCrop(crop);

    setQuantity("");

    setForm({
      company: "",
      person: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: "",
      date: "",
      notes: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================================
  // QUANTITY CHANGE
  // ==========================================

  const handleQuantityChange = (e) => {
    let value = Number(e.target.value);

    if (value < 0) {
      value = 0;
    }

    if (
      selectedCrop &&
      value > selectedCrop.quantity
    ) {
      value = selectedCrop.quantity;
    }

    setQuantity(value);
  };


  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice =
    selectedCrop && quantity
      ? Number(quantity) *
        Number(selectedCrop.price)
      : 0;


  // ==========================================
  // CONFIRM PURCHASE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCrop) return;

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (
      Number(quantity) >
      selectedCrop.quantity
    ) {
      alert(
        `Only ${selectedCrop.quantity} ${selectedCrop.unit} available.`
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/buy-request",
        {
          company: form.company,
          person: form.person,
          email: form.email,
          phone: form.phone,

          crop: selectedCrop.cropName,

          quantity: Number(quantity),

          price: Number(selectedCrop.price),

          location: form.location,

          date: form.date,

          notes: form.notes,

          owner: selectedCrop.owner?._id,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "Purchase Request:",
        res.data
      );

      alert(
        "✅ Purchase request sent successfully!"
      );

      setSelectedCrop(null);

      setQuantity("");

      setForm({
        company: "",
        person: "",
        email: "",
        phone: "",
        location: "",
        date: "",
        notes: "",
      });

      fetchAvailableCrops();

    } catch (error) {
      console.error(
        "Purchase Request Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "❌ Failed to send purchase request"
      );

    } finally {
      setSubmitting(false);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-24">

        <div className="text-center">

          <div className="text-5xl mb-4">
            🌾
          </div>

          <p className="text-lg text-gray-600">
            Loading available crops...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // PURCHASE FORM
  // ==========================================

  if (selectedCrop) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4 pt-28">

        <div className="max-w-5xl mx-auto">

          <button
            onClick={() =>
              setSelectedCrop(null)
            }
            className="mb-6 text-green-700 font-semibold hover:underline"
          >
            ← Back to Crops
          </button>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CROP SUMMARY */}

            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">

              <div className="text-6xl text-center mb-5">
                🌾
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCrop.cropName}
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Price
                  </span>

                  <span className="font-bold text-green-700">
                    ₹{selectedCrop.price} /{" "}
                    {selectedCrop.unit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Available
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.quantity}{" "}
                    {selectedCrop.unit}
                  </span>
                </div>

                {selectedCrop.owner?.fullname && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Seller
                    </span>

                    <span className="font-semibold">
                      {selectedCrop.owner.fullname}
                    </span>
                  </div>
                )}

              </div>


              {selectedCrop.description && (
                <div className="mt-6 pt-5 border-t">

                  <p className="text-sm text-gray-500 mb-2">
                    Description
                  </p>

                  <p className="text-gray-700">
                    {selectedCrop.description}
                  </p>

                </div>
              )}

            </div>


            {/* FORM */}

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8">

              <h1 className="text-3xl font-bold text-gray-800">
                Complete Your Purchase 🛒
              </h1>

              <p className="text-gray-500 mt-2 mb-8">
                Enter your details to send a purchase
                request to the owner.
              </p>


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* COMPANY */}

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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>


                {/* PERSON */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Person
                  </label>

                  <input
                    type="text"
                    name="person"
                    value={form.person}
                    onChange={handleChange}
                    placeholder="Enter contact person"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>


                {/* EMAIL + PHONE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                  </div>


                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                  </div>

                </div>


                {/* QUANTITY */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity ({selectedCrop.unit})
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={selectedCrop.quantity}
                    placeholder={`Maximum ${selectedCrop.quantity}`}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <p className="text-sm text-gray-500 mt-2">
                    Maximum available:{" "}
                    {selectedCrop.quantity}{" "}
                    {selectedCrop.unit}
                  </p>

                </div>


                {/* LOCATION */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter delivery location"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>


                {/* DATE */}

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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>


                {/* NOTES */}

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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>


                {/* TOTAL */}

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-gray-600">
                        Total Amount
                      </p>

                      <p className="text-sm text-gray-500">
                        {quantity || 0}{" "}
                        {selectedCrop.unit} × ₹
                        {selectedCrop.price}
                      </p>

                    </div>

                    <p className="text-3xl font-bold text-green-700">
                      ₹
                      {totalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                </div>


                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition shadow-md"
                >
                  {submitting
                    ? "Sending Request..."
                    : "🛒 Confirm Purchase"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // AVAILABLE CROPS
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 pt-28">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Buy Crops 🛒
          </h1>

          <p className="text-gray-500 mt-2">
            Choose crops currently available
            from our owners.
          </p>

        </div>


        {crops.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <div className="text-6xl mb-4">
              🌾
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Crops Available
            </h2>

            <p className="text-gray-500 mt-2">
              No owner has added available crops yet.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {crops.map((crop) => (

              <div
                key={crop._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >

                <div className="bg-green-50 p-6">

                  <div className="text-5xl mb-3">
                    🌾
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {crop.cropName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {crop.description ||
                      "Fresh crop available"}
                  </p>

                </div>


                <div className="p-6">

                  <div className="space-y-3 mb-6">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Price
                      </span>

                      <span className="font-bold text-green-700">
                        ₹{crop.price} / {crop.unit}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Available
                      </span>

                      <span className="font-semibold">
                        {crop.quantity} {crop.unit}
                      </span>

                    </div>

                    {crop.owner?.fullname && (
                      <div className="flex justify-between">

                        <span className="text-gray-500">
                          Seller
                        </span>

                        <span className="font-medium">
                          {crop.owner.fullname}
                        </span>

                      </div>
                    )}

                  </div>


                  <button
                    onClick={() =>
                      handleBuyNow(crop)
                    }
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    🛒 Buy Now
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
