import React from "react";

function Navbar() {
  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 text-white px-2 py-1 rounded-md font-bold">
          🐱‍🏍
        </div>
        <h1 className="font-bold text-lg">Progress Tracker</h1>
      </div>
      <div className="flex gap-6 font-medium">
        <button className="hover:text-blue-500 transition">Home</button>
        <button className="hover:text-blue-500 transition">Dashboard</button>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Welcome</span>
      </div>

    </div>
  );
}

export default Navbar;