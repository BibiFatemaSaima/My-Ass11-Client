import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layouts/RootLayout";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Home/Login";
import Register from "../Components/Pages/Home/Register";
import MyProfile from "../Components/Pages/MyProfile";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element:<Home/>,
      },
      {
        path: "login",
        element:<Login/>,
      },
      {
        path: "register",
        element:<Register/>,
      },
      {
        path: "myProfile",
        element:<PrivateRoute><MyProfile/></PrivateRoute>,
      }
    ]
  },
]);