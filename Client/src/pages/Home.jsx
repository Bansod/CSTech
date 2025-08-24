import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Topbar/>
            <main className="p-8">
                <h1 className="text-3xl font-bold">
                    Welcome to
                    <span className="text-red-500 font-bold tracking-widest italic"> CSTech</span>
                </h1>
                <p className="mt-4 text-gray-300">
                    <span
                        className="text-blue-400 underline cursor-pointer hover:text-blue-300"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>{" "}
                    or{" "}
                    <span
                        className="text-blue-400 underline cursor-pointer hover:text-blue-300"
                        onClick={() => navigate("/register")}
                    >
                        Signup
                    </span>{" "}
                    now to create and manage tasks amongst agents!
                </p>
            </main>
        </div>
    );
}
