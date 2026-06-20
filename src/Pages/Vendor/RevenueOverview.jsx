import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Components/AuthContext/AuthContext";

const RevenueOverview = () => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    totalRevenue: 0,
    acceptedBookings: 0,
    pendingRequests: 0,
    totalTicketsSold: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `http://localhost:3000/vendor/revenue/${user.email}`
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Revenue Overview
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="card bg-success text-white shadow-xl">
          <div className="card-body text-center">
            <h2>Total Revenue</h2>
            <p className="text-4xl font-bold">৳{data.totalRevenue}</p>
          </div>
        </div>

        <div className="card bg-info text-white shadow-xl">
          <div className="card-body text-center">
            <h2>Accepted Bookings</h2>
            <p className="text-4xl font-bold">{data.acceptedBookings}</p>
          </div>
        </div>

        <div className="card bg-warning text-white shadow-xl">
          <div className="card-body text-center">
            <h2>Pending Requests</h2>
            <p className="text-4xl font-bold">{data.pendingRequests}</p>
          </div>
        </div>

        <div className="card bg-primary text-white shadow-xl">
          <div className="card-body text-center">
            <h2>Total Tickets Sold</h2>
            <p className="text-4xl font-bold">{data.totalTicketsSold}</p>
          </div>
        </div>

      </div>

      {/* SUMMARY */}
      <div className="mt-10 card bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>

          <p>💰 Revenue: <b>৳{data.totalRevenue}</b></p>
          <p>✅ Accepted: <b>{data.acceptedBookings}</b></p>
          <p>⏳ Pending: <b>{data.pendingRequests}</b></p>
          <p>🎫 Sold: <b>{data.totalTicketsSold}</b></p>
        </div>
      </div>

    </div>
  );
};

export default RevenueOverview;