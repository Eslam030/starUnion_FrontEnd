import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Errorpage from "./Pages/Error/Errorpage.jsx";
import App from "./App.jsx";
import "./index.css";
import Login from "./Pages/Login/Login.jsx";
import UserPage from "./Pages/User page/UserPage.jsx";
import Register from "./Pages/Register/Register.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/userPage",
    element: <UserPage />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
