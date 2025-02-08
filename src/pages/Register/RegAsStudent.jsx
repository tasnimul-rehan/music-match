import { useState } from "react";
import axios from "axios";

const RegAsStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skillLevel: "",
    instrument: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        ...formData,
        role: "student", // Assign role
      });
      alert("Registration Successful");
      console.log(res.data);
    } catch (error) {
      console.error("Error registering student", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg w-96 shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-4">Register as a Student</h2>

        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required onChange={handleChange} />
        <select name="skillLevel" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required onChange={handleChange}>
          <option value="">Select Your Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input type="text" name="instrument" placeholder="Preferred Instrument" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required onChange={handleChange} />

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegAsStudent;
