import { useState } from "react";
import axios from "axios";

const RegAsTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://47.129.237.189:8448/teachers", {
        ...formData,
        experience: Number(formData.experience), // Convert to number
        // Add any additional required fields from the API documentation
      });

      if (response.status === 201) {
        setSuccess(true);
        setError("");
        console.log("Registration successful:", response.data);
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          expertise: "",
          experience: "",
        });
      }
    } catch (err) {
      setSuccess(false);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      console.error("Registration error:", err.response?.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg w-96 shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-4">Register as a Music Teacher</h2>

        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">Registration successful!</div>}
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

        {/* All input fields now have onChange={handleChange} */}
        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300" required value={formData.email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expertise"
          placeholder="Instrument Expertise (e.g., Guitar, Piano)"
          className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300"
          required
          value={formData.expertise}
          onChange={handleChange}
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Teaching Experience"
          className="w-full p-2 mb-3 shadow-md rounded-md border border-gray-300"
          required
          value={formData.experience}
          onChange={handleChange}
        />

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegAsTeacher;
