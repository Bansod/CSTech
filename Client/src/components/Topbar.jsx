import React from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center" onClick={()=>navigate("/home")}>
        <p className="text-red-500 font-bold text-xl tracking-widest italic cursor-pointer">
          CSTech
        </p>
      </div>
  
      <div className="space-x-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
