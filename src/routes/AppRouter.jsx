import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errorpage from "../Pages/Error/Errorpage.jsx";
import App from "../App.jsx";
import "../index.css";
import Login from "../Pages/Login/Login.jsx";
import UserPage from "../Pages/User page/UserPage.jsx";
import Register from "../Pages/Register/Register.jsx";
import WS_page from "../Pages/Workshop_page/WS_page.jsx";
import Event_page from "../Pages/Event_page/Event_page.jsx";
import WS_details from "../Pages/WS_Details/WS_details.jsx";
import Forget from "../Pages/Forget_pass/Forget.jsx";
import EventForm from "../Pages/SpacialEvent/EventForm.jsx";
import CloseAuth from "../Auth/CloseAuth.jsx";



const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Errorpage />,
    },
    {
      path: "/login",
      element: <CloseAuth><Login /></CloseAuth>,
    },
    {
      path: "/login/forgetPassword",
      element: <Forget />,
    },
    {
      path: "/userPage/:UserName",
      element:  <UserPage />,
    },
    {
      path: "/register",
      element: <CloseAuth><Register /></CloseAuth>,
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
      path: "/events/:company/:eventName",
      element: <EventForm />

    },
    {
      path: "/workshops/details/:name",
      element: <WS_details />,
    }
  ]);


const AppRouter = () => {
  return (
    <RouterProvider router={Router} />
  )
}

export default AppRouter