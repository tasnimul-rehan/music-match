import { useState } from "react";
import axios from "axios";

const RegAsAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        ...formData,
        role: "admin", // Assign role
      });
      alert("Admin Registration Successful");
      console.log(res.data);
    } catch (error) {
      console.error("Error registering admin", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-4">Register as Admin</h2>

        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 mb-3 shadow-md rounded-lg border border-gray-300" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 shadow-md rounded-lg border border-gray-300" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 shadow-md rounded-lg border border-gray-300" required onChange={handleChange} />

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegAsAdmin;
