import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/Layouts/RootLayout";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Home/Login";
import Register from "../Components/Pages/Home/Register";
import MyProfile from "../Components/Pages/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../Components/Pages/AllTickets";
import TicketsDetails from "../Components/Pages/TicketsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [

      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "myProfile",

        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "allTickets",

        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },

      {
        path: "ticket/:id",

        element: (
          <TicketsDetails />
        ),

        loader: async ({ params }) => {

          const res = await fetch("/data.json");

          const data = await res.json();

          const singleTicket = data.find(
            ticket => ticket._id === params.id
          );

          return singleTicket;
        },
      },

    ],
  },
]);