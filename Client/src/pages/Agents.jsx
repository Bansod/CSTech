import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [agentToDelete, setAgentToDelete] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const { data } = await API.get("/agents");
    setAgents(data);
  };

  const addAgent = async (e) => {
    e.preventDefault();
    await API.post("/agents/add", form);
    setForm({ name: "", email: "", mobile: "", password: "" });
    fetchAgents();
  };

  const viewTasks = (id) => {
    window.open(`/agents/${id}/tasks`);
  };

  return (
    <div className="px-4 bg-gray-900 min-h-screen pt-[5rem]">
      <Navbar />
      <div className="flex flex-col">
        <div className="h-1/2 h-full">
          <form
            onSubmit={addAgent}
            className="space-y-3 bg-gray-900 border-2 border-gray-700 p-4 rounded-lg mb-6 md:w-[25rem] w-full"
          >
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-800 border-gray-500 text-white"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-800 border-gray-500 text-white"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-800 border-gray-500 text-white"
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-800 border-gray-500 text-white"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 cursor-pointer">
              Add Agent
            </button>
          </form>
        </div>

        <div className="h-full">
          <h3 className="text-xl font-semibold text-white mb-2">Agent List</h3>
          <div className="bg-gray-900 border-2 border-gray-700 p-4 rounded-lg shadow overflow-y-auto max-h-[17.4rem]">
            <ul className="space-y-4">
              {agents.map((a) => (
                <li
                  key={a._id}
                  className="flex justify-between items-center border-b border-gray-500 pb-3 last:border-none"
                >
                  <div>
                    <p className="font-bold text-gray-300">{a.name}</p>
                    <p className="text-sm text-gray-300">
                      {a.email} • {a.mobile}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewTasks(a._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm cursor-pointer"
                    >
                      View Tasks
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
