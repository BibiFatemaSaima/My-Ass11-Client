import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {

  return (

    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
    >

      {/* image */}
      <figure>

        <img
          src={ticket.image}
          alt={ticket.title}
          className="h-56 w-full object-cover"
        />

      </figure>

      {/* body */}
      <div className="card-body">

        {/* title */}
        <h2 className="card-title text-xl">
          {ticket.title}
        </h2>

        {/* route */}
        <p>

          <span className="font-bold">
            Route:
          </span>

          {" "}
          {ticket.from} → {ticket.to}

        </p>

        {/* transport */}
        <p>

          <span className="font-bold">
            Transport:
          </span>

          {" "}
          {ticket.transportType}

        </p>

        {/* price */}
        <p>

          <span className="font-bold">
            Price:
          </span>

          {" "}
          ৳{ticket.price}

        </p>

        {/* quantity */}
        <p>

          <span className="font-bold">
            Available Seats:
          </span>

          {" "}
          {ticket.quantity}

        </p>

        {/* departure */}
        <p>

          <span className="font-bold">
            Departure:
          </span>

          {" "}
          {ticket.departureDate} - {ticket.departureTime}

        </p>

        {/* perks */}
        <div className="flex flex-wrap gap-2 mt-3">

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

        {/* button */}
        <div className="card-actions mt-5">

          <Link
            to={`/ticket/${ticket._id}`}
            className="btn btn-primary w-full"
          >
            See Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default TicketCard;