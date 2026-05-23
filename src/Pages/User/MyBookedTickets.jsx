
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const MyBookedTickets = () => {

  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  // fetch booked tickets
  useEffect(() => {

    if (user?.email) {

      axios
        .get(`https://ass-11-server-sigma.vercel.app/${user.email}`)

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

      <h1 className="text-4xl font-bold text-center mb-10">
        My Booked Tickets
      </h1>

      {
        bookings.length === 0 ? (

          <div className="text-center text-xl font-semibold">
            No Booked Tickets Found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="table">

              <thead>

                <tr>

                  <th>#</th>

                  <th>Ticket</th>

                  <th>Route</th>

                  <th>Transport</th>

                  <th>Seats</th>

                  <th>Total Price</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {
                  bookings.map((booking, index) => (

                    <tr key={booking._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {booking.ticketTitle}
                      </td>

                      <td>
                        {booking.from} → {booking.to}
                      </td>

                      <td>
                        {booking.transportType}
                      </td>

                      <td>
                        {booking.seats}
                      </td>

                      <td>
                        ৳{booking.totalPrice}
                      </td>

                      <td>

                        <span className="badge badge-success">
                          {booking.bookingStatus}
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

export default MyBookedTickets;