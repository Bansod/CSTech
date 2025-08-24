import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Admin Dashboard
          </h2>
          <p className="text-white mb-6 text-center">
            Welcome to the Admin Dashboard.  
            From here, you can manage agents and assign tasks effectively.
          </p>

          <div className="space-y-6">
            <div
              onClick={() => navigate("/agents")}
              className="bg-gray-900 p-4 rounded-lg border border-blue-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-blue-500 mb-2">
                Create Agents
              </h3>
              <p className="text-gray-400 text-sm">
                Add new agents to the system, manage their accounts, and assign
                roles. Each agent will have access to their assigned tasks.
              </p>
            </div>

            <div
              onClick={() => navigate("/tasks")}
              className="bg-gray-900 p-4 rounded-lg border border-green-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-green-500 mb-2">
                Add Tasks
              </h3>
              <p className="text-gray-400 text-sm">
                Create tasks and assign them to agents. You can track progress
                and update task statuses directly from the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
