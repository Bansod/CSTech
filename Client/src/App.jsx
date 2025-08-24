import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import TasksForAgent from "./pages/TasksForAgent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/agents/:id/tasks" element={<TasksForAgent />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <Agents />
            </ProtectedRoute>
          } />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}
