import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const RequestedBookings = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  // fetch requested bookings
  useEffect(() => {
    if (user?.email) {
      axios

        .get(
          `https://backend-ticket-server.vercel.apprequestedBookings/${user.email.toLowerCase()}`,
        )

        .then((res) => {
          setBookings(res.data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  // accept booking
  const handleAccept = (id) => {
    axios

      .patch(`https://backend-ticket-server.vercel.appbookings/accept/${id}`)

      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Booking Accepted");

          const updatedBookings = bookings.map((booking) =>
            booking._id === id
              ? { ...booking, bookingStatus: "accepted" }
              : booking,
          );

          setBookings(updatedBookings);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // reject booking
  const handleReject = (id) => {
    axios

      .patch(`https://backend-ticket-server.vercel.appbookings/reject/${id}`)

      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Booking Rejected");

          const updatedBookings = bookings.map((booking) =>
            booking._id === id
              ? { ...booking, bookingStatus: "rejected" }
              : booking,
          );

          setBookings(updatedBookings);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Requested Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-xl font-semibold">
          No Bookings Found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* table head */}
            <thead>
              <tr>
                <th>#</th>

                <th>Ticket</th>

                <th>Buyer Name</th>

                <th>Buyer Email</th>

                <th>Seats</th>

                <th>Total Price</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>

                  <td>{booking.ticketTitle}</td>

                  <td>{booking.buyerName}</td>

                  <td>{booking.buyerEmail}</td>

                  <td>{booking.seats}</td>

                  <td>৳{booking.totalPrice}</td>

                  {/* status */}
                  <td>
                    <span
                      className={`badge ${
                        booking.bookingStatus === "accepted"
                          ? "badge-info"
                          : booking.bookingStatus === "rejected"
                            ? "badge-error"
                            : booking.bookingStatus === "paid"
                              ? "badge-success"
                              : "badge-warning"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  {/* buttons */}
                  <td className="space-x-2">
                    <button
                      disabled={booking.bookingStatus !== "pending"}
                      onClick={() => handleAccept(booking._id)}
                      className="btn btn-sm btn-success"
                    >
                      Accept
                    </button>

                    <button
                      disabled={booking.bookingStatus !== "pending"}
                      onClick={() => handleReject(booking._id)}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedBookings;
