import Sidebar from "../pages/shared/Sidebar";
import Navbar from "../pages/shared/Navbar";

const Main = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-auto">
        <Navbar />
      </div>
    </div>
  );
};

export default Main;
