import { RouterProvider } from "react-router";
import "./App.css";
import route from "./routers/Route";

function App() {
  return <div>
    <RouterProvider router={route}/>
  </div>;
}

export default App;
