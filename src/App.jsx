import { RouterProvider } from "react-router";
import "./App.css";
import route from "./routers/Route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={route} />
      <Toaster />
    </div>
  );
}

export default App;
