import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const MyBookedTickets = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch bookings
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://ass-11-server-sigma.vercel.app/bookings/${user.email}`)

        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })

        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

  // countdown function
  const getCountdown = (date) => {
    if (!date) return "No Date";

    const now = new Date().getTime();

    const departure = new Date(date).getTime();

    const difference = departure - now;

    if (difference <= 0) {
      return "Expired";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m left`;
  };

  // status badge
  const getBadgeClass = (status) => {
    if (status === "pending") {
      return "badge-warning";
    } else if (status === "accepted") {
      return "badge-info";
    } else if (status === "rejected") {
      return "badge-error";
    } else if (status === "paid") {
      return "badge-success";
    } else {
      return "badge-neutral";
    }
  };

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Booked Tickets
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-xl font-semibold">
          No Booked Tickets Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const expired =
              new Date(booking.departureDate || booking.date) < new Date();

            return (
              <div
                key={booking._id}
                className="card bg-base-100 shadow-xl border"
              >
                <figure>
                  <img
                    src={booking.image}
                    alt={booking.ticketTitle}
                    className="h-52 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{booking.ticketTitle}</h2>

                  <p>
                    <span className="font-bold">Route:</span> {booking.from} →{" "}
                    {booking.to}
                  </p>

                  <p>
                    <span className="font-bold">Transport:</span>{" "}
                    {booking.transportType}
                  </p>

                  <p>
                    <span className="font-bold">Seats:</span> {booking.seats}
                  </p>

                  <p>
                    <span className="font-bold">Total Price:</span> ৳
                    {booking.totalPrice}
                  </p>

                  <p>
                    <span className="font-bold">Departure:</span>{" "}
                    {booking.departureDate || booking.date}
                  </p>

                  <p className="text-primary font-semibold">
                    ⏳ {getCountdown(booking.departureDate || booking.date)}
                  </p>

                  {/* PAYMENT STATUS */}
                  <div className="mt-2">
                    <span
                      className={`badge ${
                        booking.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>

                  {/* PAY BUTTON */}
                  {booking.paymentStatus !== "paid" && !expired && (
                    <div className="mt-4">
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="btn btn-primary w-full">
                          Pay Now
                        </button>
                      </Link>
                    </div>
                  )}

                  {/* PAYMENT DONE */}
                  {booking.paymentStatus === "paid" && (
                    <p className="text-green-600 font-bold mt-2">
                      Payment Completed ✅
                    </p>
                  )}

                  {/* EXPIRED */}
                  {expired && booking.paymentStatus !== "paid" && (
                    <p className="text-red-500 font-semibold mt-2">
                      Departure Time Expired
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;