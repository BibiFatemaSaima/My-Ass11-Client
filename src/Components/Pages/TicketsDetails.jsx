import React from "react";
import { useLoaderData } from "react-router-dom";

const TicketDetails = () => {

  const ticket = useLoaderData();

  const {
    image,
    title,
    from,
    to,
    transportType,
    price,
    quantity,
    departureDate,
    departureTime,
    perks,
    vendorName,
  } = ticket;

  return (

    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 shadow-2xl rounded-2xl overflow-hidden">

        {/* image */}
        <div>

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />

        </div>

        {/* details */}
        <div className="p-6 space-y-4">

          {/* title */}
          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          {/* route */}
          <p className="text-lg">

            <span className="font-bold">
              Route:
            </span>

            {" "}
            {from} → {to}

          </p>

          {/* transport */}
          <p className="text-lg">

            <span className="font-bold">
              Transport:
            </span>

            {" "}
            {transportType}

          </p>

          {/* price */}
          <p className="text-lg">

            <span className="font-bold">
              Price:
            </span>

            {" "}
            ৳{price}

          </p>

          {/* quantity */}
          <p className="text-lg">

            <span className="font-bold">
              Available Seats:
            </span>

            {" "}
            {quantity}

          </p>

          {/* departure date */}
          <p className="text-lg">

            <span className="font-bold">
              Departure Date:
            </span>

            {" "}
            {departureDate}

          </p>

          {/* departure time */}
          <p className="text-lg">

            <span className="font-bold">
              Departure Time:
            </span>

            {" "}
            {departureTime}

          </p>

          {/* vendor */}
          <p className="text-lg">

            <span className="font-bold">
              Vendor:
            </span>

            {" "}
            {vendorName}

          </p>

          {/* perks */}
          <div>

            <h2 className="text-xl font-bold mb-3">
              Perks
            </h2>

            <div className="flex flex-wrap gap-3">

              {
                perks.map((perk, index) => (

                  <div
                    key={index}
                    className="badge badge-outline badge-lg"
                  >
                    {perk}
                  </div>
                ))
              }

            </div>

          </div>

          {/* button */}
          <button className="btn btn-primary w-full mt-5">
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default TicketDetails;