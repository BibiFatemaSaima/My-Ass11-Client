import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  // ⚠️ safe role fallback
  const role = user?.role || "user";

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content min-h-screen flex flex-col">

        <div className="navbar bg-base-200 lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
            ☰
          </label>
          <div className="px-3 font-bold">Dashboard</div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-200">

          <h2 className="text-3xl font-bold mb-6 text-center">
            TicketBari
          </h2>

          {/* USER */}
          {role === "user" && (
            <>
              <li><NavLink to="/dashboard/user-profile">User Profile</NavLink></li>
              <li><NavLink to="/dashboard/my-booked-tickets">My Booked Tickets</NavLink></li>
              <li><NavLink to="/dashboard/transaction-history">Transaction History</NavLink></li>
            </>
          )}

          {/* VENDOR */}
          {role === "vendor" && (
            <>
              <li><NavLink to="/dashboard/vendor-profile">Vendor Profile</NavLink></li>
              <li><NavLink to="/dashboard/add-ticket">Add Ticket</NavLink></li>
              <li><NavLink to="/dashboard/my-added-tickets">My Added Tickets</NavLink></li>
              <li><NavLink to="/dashboard/requested-bookings">Requested Bookings</NavLink></li>
              <li><NavLink to="/dashboard/revenue-overview">Revenue Overview</NavLink></li>
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/admin-profile">Admin Profile</NavLink></li>
              <li><NavLink to="/dashboard/manage-tickets">Manage Tickets</NavLink></li>
              <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
              <li><NavLink to="/dashboard/advertise-tickets">Advertise Tickets</NavLink></li>
            </>
          )}

          <div className="divider"></div>

          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;