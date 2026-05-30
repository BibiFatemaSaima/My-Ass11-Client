import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* drawer toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content min-h-screen flex flex-col bg-base-100 relative z-0">
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

          <div className="flex-1 px-2 text-xl font-bold">Dashboard</div>
        </div>

        {/* page content */}
        <div className="p-6 w-full overflow-x-hidden">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content space-y-2">
          {/* title */}
          <h2 className="text-3xl font-bold mb-6 text-center">TicketBari</h2>

          {/* USER LINKS */}
          <li>
            <NavLink to="/dashboard/user-profile">User Profile</NavLink>
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
          <div className="divider">Vendor Panel</div>

          {/* VENDOR LINKS */}
          <li>
            <NavLink to="/dashboard/addTicket">Add Ticket</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myAddedTickets">My Added Tickets</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/requestedBookings">
              Requested Bookings
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/revenueOverview">Revenue Overview</NavLink>
          </li>

          {/* divider */}
          <div className="divider"></div>

          {/* MAIN LINKS */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/allTickets">All Tickets</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
