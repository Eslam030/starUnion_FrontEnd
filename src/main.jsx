import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Errorpage from "./Pages/Error/Errorpage.jsx";
import App from "./App.jsx";
import "./index.css";
import Login from "./Pages/Login/Login.jsx";
import UserPage from "./Pages/User page/UserPage.jsx";
import Register from "./Pages/Register/Register.jsx";
import WS_page from "./Pages/Workshop_page/WS_page.jsx";
import Event_page from "./Pages/Event_page/Event_page.jsx";
import WS_details from "./Pages/WS_Details/WS_details.jsx";

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
  },
  {
    path: "/workshops",
    element: <WS_page />,
  },
  {
    path: "/events",
    element: <Event_page />,
  },
  {
    path: "/workshops/details",
    element: <WS_details />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
