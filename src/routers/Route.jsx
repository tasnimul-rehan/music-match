import { createBrowserRouter, Navigate } from "react-router-dom";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Main from "../layout/Main";
import RegAsAdmin from "../pages/Register/RegAsAdmin";
import RegAsTeacher from "../pages/Register/RegAsTeacher";
import RegAsStudent from "../pages/Register/RegAsStudent";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Login page without Main layout
  },
  {
    path: "/register",
    element: <Register />, // Profile selection page
  },
  {
    path: "/register/admin",
    element: <RegAsAdmin/>,  
  },
  {
    path: "/register/student",
    element: <RegAsStudent/>,  
  },
  {
    path: "/register/teacher",
    element: <RegAsTeacher/>,  
  },
  {
    path: "/main",
    element: <Main />, // Main layout for other pages
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />, // Redirect to login by default
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default route;
