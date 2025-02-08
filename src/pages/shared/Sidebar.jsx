import { useState } from "react";
import { FaSearch, FaUser, FaEnvelope, FaInfoCircle, FaCog, FaTh } from "react-icons/fa";

const Sidebar = () => {
  const [active, setActive] = useState("Find Teachers");

  const menuItems = [
    { name: "Overview", icon: <FaTh /> },
    { name: "Find Teachers", icon: <FaSearch /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "Info", icon: <FaInfoCircle /> },
    { name: "Setting", icon: <FaCog /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <p className="text-2xl text-center font-semibold ">MusicMatch</p>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-3 py-3 rounded-lg cursor-pointer transition ${active === item.name ? "bg-gold text-yellow-700" : "text-gray-700 hover:bg-gray-200"}`}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
