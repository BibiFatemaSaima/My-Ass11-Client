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
import UpdateTicket from "../Pages/Vendor/UpdateTicket";
import RequestedBookings from "../Pages/Vendor/RequestedBookings";
import RevenueOverview from "../Pages/Vendor/RevenueOverview";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import CheckoutForm from "../Components/CheckoutForm/CheckoutForm";
import AdminUsers from "../Pages/Admin/AdminUsers";

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
            `https://ass-11-server-sigma.vercel.app/tickets/${params.id}`,
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

        element: <UserProfile />,
      },

      {
        path: "my-booked-tickets",

        element: <MyBookedTickets />,
      },

      {
        path: "transaction-history",

        element: <TransactionHistory />,
      },

      // vendor route
      {
        path: "addTicket",

        element: <AddTicket />,
      },
      {
        path: "myAddedTickets",
        element: <MyAddedTickets />,
      },
      {
        path: "updateTicket/:id",
        element: <UpdateTicket />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://ass-11-server-sigma.vercel.app/tickets/${params.id}`,
          );
          return res.json();
        },
      },
      {
        path: "requestedBookings",
        element: <RequestedBookings />,
      },
      {
        path: "revenueOverview",
        element: <RevenueOverview />,
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(`https://ass-11-server-sigma.vercel.app/booking/${params.id}`),
        element: <PaymentPage />,
      },
      {
        path: "checkoutFrom",
        element: <CheckoutForm />,
      },
      {
        path: "adminUsers",
        element: <AdminUsers />,
      },
    ],
  },
]);
