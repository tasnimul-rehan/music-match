import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import UseAccessToken from "../../hooks/UseAccessToken";
import { useNavigate } from "react-router-dom";

const RegAsTeacher = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = UseAccessToken(createdUserEmail);

  if (token) {
    navigate("/");
    window.location.reload(false);
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "+1",
    phoneNumber: "",
    specialties: [],
    experience: "",
    certificates: [],
  });

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const instruments = ["Piano", "Violin", "Guitar", "Drums", "Vocal"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecialtySelect = (instrument) => {
    setFormData((prev) => {
      const specialties = prev.specialties.includes(instrument)
        ? prev.specialties.filter((item) => item !== instrument)
        : [...prev.specialties, instrument];
      return { ...prev, specialties };
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    try {
      const uploadPromises = files.map((file) => {
        const fileData = new FormData();
        fileData.append("file", file);
        return axios.post("http://47.129.237.189:8448/api/v1/gsf/teachers", fileData);
      });

      const responses = await Promise.all(uploadPromises);
      const uploadedFiles = responses.map((res) => res.data.fileUrl);
      setFormData((prev) => ({ ...prev, certificates: [...prev.certificates, ...uploadedFiles] }));
    } catch (err) {
      setError("File upload failed. Please try again.");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Create User in Firebase Authentication
      const userCredential = await createUser(formData.email, formData.password);
      const user = userCredential.user;

      // 2️⃣ Update User Profile in Firebase
      await updateUserProfile({
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      setCreatedUserEmail(user.email);

      // 3️⃣ Prepare User Data to Save in MongoDB
      const userPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: `${formData.countryCode} ${formData.phoneNumber}`,
        specialties: formData.specialties,
        experience: formData.experience,
        certificates: formData.certificates,
        role: "teacher", // 🔥 Set role as "teacher"
      };

      // 4️⃣ Save User in Both Databases
      await axios.post("http://localhost:5000/users", userPayload);
      await axios.post("http://47.129.237.189:8448/api/v1/gsf/teachers", userPayload);

      // 5️⃣ Show Success Message & Navigate
      toast.success("Registration successful!");
      navigate("/main");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg w-96 shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-4">Register as Music Teacher</h2>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        
        <input type="text" name="firstName" placeholder="First Name" className="w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.firstName} />
        <input type="text" name="lastName" placeholder="Last Name" className="w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.lastName} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.email} />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.password} />

        <div className="grid grid-cols-3 gap-3">
          <input type="text" name="countryCode" placeholder="Code" className="w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.countryCode} />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" className="col-span-2 w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.phoneNumber} />
        </div>

        <label className="block mb-1 text-sm font-medium">Specialties</label>
        <div className="w-full p-2 border rounded cursor-pointer" onClick={() => setFormData((prev) => ({ ...prev, showDropdown: !prev.showDropdown }))}>
          {formData.specialties.length > 0 ? formData.specialties.join(", ") : "Select your specialties"}
        </div>

        <input type="number" name="experience" placeholder="Years of Experience" className="w-full p-2 mb-3 border rounded" required onChange={handleChange} value={formData.experience} />

        <input type="file" multiple onChange={handleFileUpload} className="w-full p-2 mb-3 border rounded" accept=".pdf,.doc,.docx,.jpg,.png" />
        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800" disabled={uploading}>
          {uploading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegAsTeacher;
