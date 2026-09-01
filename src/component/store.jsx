import React from "react";

export default function Stock() {
  return (
    <div className="h-screen w-full flex bg-white">

      {/* LEFT FORM SECTION */}
      <div className="w-1/2 flex justify-center items-center">
        <form className="bg-green-50 border border-green-200 p-8 rounded-xl shadow-md w-3/4">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Add Stock
          </h2>

          <label className="block mb-2 font-medium">Select Crop:</label>
          <select className="border p-3 rounded-lg w-full mb-4">
            <option>Select</option>
            <option>Wheat</option>
            <option>Rice</option>
          </select>

          <label className="block mb-2 font-medium">Amount (kg/ton):</label>
          <input
            placeholder="Example: 300 kg"
            className="border p-3 rounded-lg w-full mb-4"
          />

          <label className="block mb-2 font-medium">Duration:</label>
          <select className="border p-3 rounded-lg w-full mb-6">
            <option>Select</option>
            <option>1 Month</option>
            <option>6 Month</option>
            <option>1 Year</option>
            <option>Not Say</option>
          </select>

          {/* No submit logic */}
          <button className="w-full py-3 text-white rounded-lg bg-green-600">
            Submit
          </button>
        </form>
      </div>

      {/* RIGHT CARD SECTION */}
      
       <div className="main w-1/2 h-screen overflow-y-auto p-4">


      <div className="right-card  text-white flex flex-col justify-center items-center p-8">

        <div className="bg-white w-full border p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold text-green-700">Wheat</h3>
          <p className="text-gray-700">Amount: 300kg</p>
          <p className="text-gray-700">Duration: 6 Month</p>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
         </div>


 <div className="right-card  text-white flex flex-col justify-center items-center p-8">

        <div className="bg-white w-full border p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold text-green-700">Wheat</h3>
          <p className="text-gray-700">Amount: 300kg</p>
          <p className="text-gray-700">Duration: 6 Month</p>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
         </div>
  


   <div className="right-card  text-white flex flex-col justify-center items-center p-8">

        <div className="bg-white w-full border p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold text-green-700">Wheat</h3>
          <p className="text-gray-700">Amount: 300kg</p>
          <p className="text-gray-700">Duration: 6 Month</p>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
         </div>




 <div className="right-card  text-white flex flex-col justify-center items-center p-8">

        <div className="bg-white w-full border p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold text-green-700">Wheat</h3>
          <p className="text-gray-700">Amount: 300kg</p>
          <p className="text-gray-700">Duration: 6 Month</p>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
         </div>




 <div className="right-card  text-white flex flex-col justify-center items-center p-8">

        <div className="bg-white w-full border p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold text-green-700">Wheat</h3>
          <p className="text-gray-700">Amount: 300kg</p>
          <p className="text-gray-700">Duration: 6 Month</p>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
         </div>






       </div>









    </div>
  );
}