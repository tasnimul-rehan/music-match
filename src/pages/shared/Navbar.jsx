import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState([]);
  axios
    .get(`https://localhost:5000/user`)
    .then((response) => {
      console.log("User Data:", response.data); // Handle the user data here
      setUserRole(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });

  console.log(userRole);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
      <input type="text" placeholder="Search for anything..." className="border border-gray-300 rounded-lg px-3 py-2 w-1/3" />
      <div className="flex items-center gap-6">
        <span className="text-gray-600">🔔</span>
        <span className="text-gray-600">🛒</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-semibold">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{userRole?.role}</p>
          </div>
          <span className="text-gray-600">▼</span>
        </div>
      </div>
    </div>
  );
}
