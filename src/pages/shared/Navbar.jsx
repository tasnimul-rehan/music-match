export default function Navbar() {
  const users = [
    {
      name: "Samantha Lee",
      role: "Teacher",
      status: "Unpublished",
    }
  ];

  return (
    <div className="p-4 rounded-lg">
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-2">
          <input type="text" placeholder="Search for anything..." className="border border-gray-300 rounded-lg px-3 py-2 w-1/3" />
          <div className="flex items-center gap-4">
            <span className="text-gray-600">🔔</span>
            <span className="text-gray-600">🛒</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.role} {user.status && `• ${user.status}`}
                </p>
              </div>
              <span className="text-gray-600">▼</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
