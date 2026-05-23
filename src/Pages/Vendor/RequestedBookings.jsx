import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const RequestedBookings = () => {

  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  // fetch requested bookings
  useEffect(() => {

    if (user?.email) {

      axios
        .get(
          `https://ass-11-server-sigma.vercel.app/${user.email}`
        )

        .then((res) => {

          setBookings(res.data);

        })

        .catch((error) => {

          console.log(error);

        });

    }

  }, [user]);

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Requested Bookings
      </h1>

      {
        bookings.length === 0 ? (

          <div className="text-center text-xl font-semibold">
            No Bookings Found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="table">

              {/* head */}
              <thead>

                <tr>

                  <th>#</th>

                  <th>Ticket</th>

                  <th>Buyer Name</th>

                  <th>Buyer Email</th>

                  <th>Seats</th>

                  <th>Total Price</th>

                  <th>Payment</th>

                </tr>

              </thead>

              <tbody>

                {
                  bookings.map((booking, index) => (

                    <tr key={booking._id}>

                      <th>
                        {index + 1}
                      </th>

                      <td>
                        {booking.ticketTitle}
                      </td>

                      <td>
                        {booking.buyerName}
                      </td>

                      <td>
                        {booking.buyerEmail}
                      </td>

                      <td>
                        {booking.seats}
                      </td>

                      <td>
                        ৳{booking.totalPrice}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            booking.paymentStatus === "paid"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >

                          {booking.paymentStatus}

                        </span>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>

        )
      }

    </div>
  );
};

export default RequestedBookings;