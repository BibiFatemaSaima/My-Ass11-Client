import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const MyAddedTickets = () => {

  const { user } = useContext(AuthContext);

  const [tickets, setTickets] = useState([]);

  // fetch tickets
  useEffect(() => {

    if (user?.email) {

      axios
        .get(`http://localhost:3000/myTickets/${user.email}`)

        .then((res) => {

          setTickets(res.data);

        })

        .catch((error) => {

          console.log(error);

        });

    }

  }, [user]);

  // delete ticket
  const handleDelete = (_id) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (confirmDelete) {

      axios
        .delete(`http://localhost:3000/tickets/${_id}`)

        .then((res) => {

          if (res.data.deletedCount > 0) {

            const remainingTickets = tickets.filter(
              (ticket) => ticket._id !== _id
            );

            setTickets(remainingTickets);

          }

        })

        .catch((error) => {

          console.log(error);

        });

    }

  };

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        My Added Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          tickets.map((ticket) => (

            <div
              key={ticket._id}
              className="card bg-base-100 shadow-xl"
            >

              <figure>

                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-56 w-full object-cover"
                />

              </figure>

              <div className="card-body">

                <h2 className="card-title">
                  {ticket.title}
                </h2>

                <p>
                  {ticket.from} → {ticket.to}
                </p>

                <p>
                  Transport: {ticket.transportType}
                </p>

                <p>
                  Price: ৳{ticket.price}
                </p>

                <p>
                  Quantity: {ticket.quantity}
                </p>

                <p>
                  Status:
                  <span className="font-bold ml-2 capitalize">
                    {ticket.status}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2 mt-2">

                  {
                    ticket.perks?.map((perk, index) => (

                      <div
                        key={index}
                        className="badge badge-outline"
                      >
                        {perk}
                      </div>
                    ))
                  }

                </div>

                {/* buttons */}
                <div className="flex gap-3 mt-5">

                  {/* update */}
                  <button
                    disabled={ticket.status === "rejected"}
                    className="btn btn-primary flex-1"
                  >
                    Update
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={ticket.status === "rejected"}
                    className="btn btn-error flex-1"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyAddedTickets;