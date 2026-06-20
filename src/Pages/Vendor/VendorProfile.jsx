import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Components/AuthContext/AuthContext";

const VendorProfile = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingRequests: 0,
    acceptedBookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (user?.email) {
      Promise.all([
        axios.get(
          `http://localhost:3000/vendor/totalTickets/${user.email}`
        ),

        axios.get(
          `http://localhost:3000/vendor/pendingRequests/${user.email}`
        ),

        axios.get(
          `http://localhost:3000/vendor/acceptedBookings/${user.email}`
        ),

        axios.get(
          `http://localhost:3000/vendor/revenue/${user.email}`
        ),
      ])
        .then(([tickets, pending, accepted, revenue]) => {
          setStats({
            totalTickets: tickets.data.totalTickets,
            pendingRequests: pending.data.pendingRequests,
            acceptedBookings:
              accepted.data.acceptedBookings,
            revenue: revenue.data.revenue,
          });
        })
        .catch(console.log);
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl border mb-8">
        <div className="card-body items-center text-center">

          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-2">

              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="Vendor"
              />

            </div>
          </div>

          <h2 className="text-3xl font-bold mt-4">
            Vendor Profile
          </h2>

          <div className="mt-5 space-y-2">

            <p>
              <span className="font-bold">
                Name:
              </span>{" "}
              {user?.displayName}
            </p>

            <p>
              <span className="font-bold">
                Email:
              </span>{" "}
              {user?.email}
            </p>

            <p>
              <span className="font-bold">
                Role:
              </span>{" "}
              Vendor
            </p>

          </div>
        </div>
      </div>


      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body text-center">

            <h2 className="text-lg font-semibold">
              Total Tickets
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalTickets}
            </p>

          </div>
        </div>


        <div className="card bg-warning text-white shadow-xl">
          <div className="card-body text-center">

            <h2 className="text-lg font-semibold">
              Pending Requests
            </h2>

            <p className="text-4xl font-bold">
              {stats.pendingRequests}
            </p>

          </div>
        </div>


        <div className="card bg-success text-white shadow-xl">
          <div className="card-body text-center">

            <h2 className="text-lg font-semibold">
              Accepted Bookings
            </h2>

            <p className="text-4xl font-bold">
              {stats.acceptedBookings}
            </p>

          </div>
        </div>


        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body text-center">

            <h2 className="text-lg font-semibold">
              Revenue
            </h2>

            <p className="text-4xl font-bold">
              ৳{stats.revenue}
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default VendorProfile;