import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

export default function Tasks() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!file) {
      setMsg("Please select a file to upload");
      return;
    }

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    if (!allowedTypes.includes(file.type)) {
      setMsg("Invalid file type. Only CSV, XLS, and XLSX are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await API.post("/tasks/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg(data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Upload failed");
    }
  };

  const closeModal = () => setMsg("");

  return (
    <div className="px-6 bg-gray-900 min-h-screen flex justify-center items-center relative">
      <Navbar />
      <form
        onSubmit={uploadFile}
        className="bg-gray-800 p-4 rounded-xl shadow max-w-md space-y-3 border border-gray-50"
      >
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border border-gray-500 px-3 py-2 rounded-lg text-white cursor-pointer"
        />
        <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 cursor-pointer">
          Upload
        </button>
      </form>

      {msg && (
        <Modal
          title={"Success"}
          message={msg}
          onClose={closeModal}
          showConfirm={false}
          cancelText="Close"
        />
      )}
    </div>
  );
}
