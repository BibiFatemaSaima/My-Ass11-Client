import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../Components/Layouts/RootLayout";
import DashboardLayout from "../dashboard/DashboardLayout";

import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Home/Login";
import Register from "../Components/Pages/Home/Register";

import MyProfile from "../Components/Pages/MyProfile";
import AllTickets from "../Components/Pages/AllTickets";
import TicketsDetails from "../Components/Pages/TicketsDetails";

import PrivateRoute from "./PrivateRoute";

import AddTicket from "../Pages/Vendor/AddTicket";
import UserProfile from "../Pages/User/UserProfile";
import MyBookedTickets from "../Pages/User/MyBookedTickets";
import TransactionHistory from "../Pages/User/TransactionHistory";
import MyAddedTickets from "../Pages/Vendor/MyAddedTickets";

export const router = createBrowserRouter([

  // main layout
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
          <PrivateRoute>
            <TicketsDetails />
          </PrivateRoute>
        ),

        loader: async ({ params }) => {

          const res = await fetch(
            `http://localhost:3000/tickets/${params.id}`
          );

          return res.json();

        },
      },

    ],
  },

  // dashboard layout
  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [

      // user dashboard routes
      {
        path: "user-profile",

        element: <UserProfile/>,
      },

      {
        path: "my-booked-tickets",

        element: <MyBookedTickets/>,
      },

      {
        path: "transaction-history",

        element: <TransactionHistory/>,
      },

      // vendor route
      {
        path: "addTicket",

        element: <AddTicket />,
      },
      {
        path: "myAddedTickets",
        element:<MyAddedTickets/>,
      }

    ],
  },

]);