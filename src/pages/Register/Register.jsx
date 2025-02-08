import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileSelection = () => {
  const [selectedRole, setSelectedRole] = useState("teacher"); // Default selection

  const roles = [
    { id: "teacher", label: "Teacher", description: "Sign up as a teacher" },
    { id: "student", label: "Student", description: "Sign up as a student" },
    { id: "admin", label: "System Administrator", description: "Sign up as an admin" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Choose profile</h2>
        
        <div className="space-y-3">
          {roles.map((role) => (
            <label
              key={role.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                selectedRole === role.id ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={role.id}
                checked={selectedRole === role.id}
                onChange={() => setSelectedRole(role.id)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                  selectedRole === role.id ? "border-blue-600" : "border-gray-400"
                }`}
              >
                {selectedRole === role.id && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
              </div>
              <div>
                <p className="font-medium">{role.label}</p>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
            </label>
          ))}
        </div>

        <Link 
          to={`/register/${selectedRole}`} 
          className="block text-center w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default ProfileSelection;
