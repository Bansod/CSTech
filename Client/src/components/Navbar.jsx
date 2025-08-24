import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
        <Link to="/dashboard" className="hover:underline cursor-pointer">Dashboard</Link>
        <Link to="/agents" className="hover:underline cursor-pointer">Agents</Link>
        <Link to="/tasks" className="hover:underline cursor-pointer">Tasks</Link>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-sm font-semibold sm:text-base cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
}
