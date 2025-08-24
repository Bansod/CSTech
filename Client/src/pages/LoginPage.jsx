import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Modal from "../components/Modal"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

  const closeModal = () => setMsg("");

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Topbar />
      <main className="flex justify-center items-center min-h-[80vh] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p className="text-gray-400 text-sm mb-4 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 underline cursor-pointer hover:text-blue-300"
            >
              Sign Up
            </span>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold cursor-pointer"
          >
            Login
          </button>
        </form>
      </main>
      {msg && (
        <Modal
          title={"Error"}
          message={msg}
          onClose={closeModal}
          showConfirm={false}
          cancelText="Close"
        />
      )}
    </div>
  );
}