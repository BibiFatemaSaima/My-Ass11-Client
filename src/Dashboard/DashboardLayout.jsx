import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {

  return (

    <div className="drawer lg:drawer-open min-h-screen">

      {/* drawer toggle */}
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* page content */}
      <div className="drawer-content flex flex-col">

        {/* mobile navbar */}
        <div className="navbar bg-base-200 lg:hidden">

          <div className="flex-none">

            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >

              ☰

            </label>

          </div>

          <div className="flex-1 px-2 font-bold text-xl">
            Dashboard
          </div>

        </div>

        {/* outlet */}
        <div className="p-6">

          <Outlet />

        </div>

      </div>

      {/* sidebar */}
      <div className="drawer-side">

        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content space-y-2">

          {/* title */}
          <h2 className="text-3xl font-bold mb-6 text-center">
            TicketBari
          </h2>

          {/* links */}
          <li>

            <NavLink to="/dashboard/user-profile">
              User Profile
            </NavLink>

          </li>

          <li>

            <NavLink to="/dashboard/my-booked-tickets">
              My Booked Tickets
            </NavLink>

          </li>

          <li>

            <NavLink to="/dashboard/transaction-history">
              Transaction History
            </NavLink>

          </li>

          {/* divider */}
          <div className="divider"></div>

          <li>

            <NavLink to="/">
              Home
            </NavLink>

          </li>

          <li>

            <NavLink to="/allTickets">
              All Tickets
            </NavLink>

          </li>

        </ul>

      </div>

    </div>
  );
};

export default DashboardLayout;