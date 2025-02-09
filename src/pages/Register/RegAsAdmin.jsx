import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const RegAsAdmin = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // Setting role as admin
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register user with Firebase or Auth Context
      const userCredential = await createUser(formData.email, formData.password);
      const user = userCredential?.user;
      await updateUserProfile({ displayName: user?.name });
      console.log(user);
      // Save user details to database
      const res = await axios.post("http://localhost:5000/users", formData);
      if (res.data) {
        toast.success("Registration successful");
        navigate("/main");
      }
    } catch (error) {
      console.error("Error registering user", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-4">Register as an Admin</h2>
        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 mb-3 border border-gray-300 rounded-lg" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 border border-gray-300 rounded-lg" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 border border-gray-300 rounded-lg" required onChange={handleChange} />
        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegAsAdmin;
