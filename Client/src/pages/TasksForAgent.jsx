import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function TasksForAgent() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await API.get(`/agents/${id}/tasks`);
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.msg || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pt-[5rem]">
        <Navbar/>
      <h2 className="text-3xl font-bold mb-6 text-center w-full">Tasks for Agent</h2>

      {loading && (
        <div className="text-center text-gray-400 animate-pulse">
          Loading tasks...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 bg-red-900/30 p-3 rounded-lg max-w-lg mx-auto">
          Error: {error}
        </div>
      )}

      {!loading && !error && !tasks.length && (
        <div className="text-center text-gray-400 bg-gray-800 p-4 rounded-lg max-w-lg mx-auto">
          No tasks assigned to this agent.
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-700 transition"
            >
              <p className="text-lg font-semibold text-green-400">
                {task.firstName}
              </p>
              <p className="text-sm text-gray-300">
                <strong>📞 Phone:</strong> {task.phone}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                <strong>📝 Notes:</strong> {task.notes || "No notes provided"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
