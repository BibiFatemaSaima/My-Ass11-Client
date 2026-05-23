import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLoaderData, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const UpdateTicket = () => {

  const ticket = useLoaderData();

  const navigate = useNavigate();

  const [selectedPerks, setSelectedPerks] = useState([]);

  // set old perks
  useEffect(() => {

    if (ticket?.perks) {

      setSelectedPerks(ticket.perks);

    }

  }, [ticket]);

  // perks handle
  const handlePerksChange = (e) => {

    const value = e.target.value;

    if (e.target.checked) {

      setSelectedPerks([
        ...selectedPerks,
        value,
      ]);

    } else {

      const remainingPerks = selectedPerks.filter(
        (perk) => perk !== value
      );

      setSelectedPerks(remainingPerks);

    }

  };

  // update ticket
  const handleUpdateTicket = (e) => {

    e.preventDefault();

    const form = e.target;

    const updatedTicket = {

      title: form.title.value,

      from: form.from.value,

      to: form.to.value,

      transportType: form.transportType.value,

      price: parseInt(form.price.value),

      quantity: parseInt(form.quantity.value),

      departureDate: form.departureDate.value,

      departureTime: form.departureTime.value,

      image: form.image.value,

      perks: selectedPerks,

      status: "pending",
    };

    axios
      .put(
        `https://ass-11-server-sigma.vercel.app/${ticket._id}`,
        updatedTicket
      )

      .then((res) => {

        console.log(res.data);

        if (res.data.modifiedCount > 0) {

          toast.success("Ticket Updated Successfully");

          navigate("/dashboard/myAddedTickets");

        }

      })

      .catch((error) => {

        console.log(error);

        toast.error("Update Failed");

      });

  };

  return (

    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Update Ticket
      </h1>

      {/* form */}
      <form
        onSubmit={handleUpdateTicket}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        {/* title */}
        <div>

          <label className="label font-semibold">
            Ticket Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={ticket.title}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* from */}
        <div>

          <label className="label font-semibold">
            From
          </label>

          <input
            type="text"
            name="from"
            defaultValue={ticket.from}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* to */}
        <div>

          <label className="label font-semibold">
            To
          </label>

          <input
            type="text"
            name="to"
            defaultValue={ticket.to}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* transport */}
        <div>

          <label className="label font-semibold">
            Transport Type
          </label>

          <select
            name="transportType"
            defaultValue={ticket.transportType}
            className="select select-bordered w-full"
            required
          >

            <option value="Bus">
              Bus
            </option>

            <option value="Train">
              Train
            </option>

            <option value="Launch">
              Launch
            </option>

            <option value="Flight">
              Flight
            </option>

          </select>

        </div>

        {/* price */}
        <div>

          <label className="label font-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            defaultValue={ticket.price}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* quantity */}
        <div>

          <label className="label font-semibold">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            defaultValue={ticket.quantity}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* departure date */}
        <div>

          <label className="label font-semibold">
            Departure Date
          </label>

          <input
            type="date"
            name="departureDate"
            defaultValue={ticket.departureDate}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* departure time */}
        <div>

          <label className="label font-semibold">
            Departure Time
          </label>

          <input
            type="text"
            name="departureTime"
            defaultValue={ticket.departureTime}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* image */}
        <div className="md:col-span-2">

          <label className="label font-semibold">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            defaultValue={ticket.image}
            className="input input-bordered w-full"
            required
          />

        </div>

        {/* perks */}
        <div className="md:col-span-2">

          <label className="label font-semibold mb-2 block">
            Perks
          </label>

          <div className="flex flex-wrap gap-4">

            {
              [
                "AC",
                "WiFi",
                "Charging Port",
                "Meal",
                "Breakfast",
                "Dinner",
                "Cabin",
                "Sleeper",
                "Blanket",
                "Window Seat",
              ].map((perk) => (

                <label
                  key={perk}
                  className="label cursor-pointer gap-2"
                >

                  <input
                    type="checkbox"
                    value={perk}
                    checked={selectedPerks.includes(perk)}
                    onChange={handlePerksChange}
                    className="checkbox checkbox-primary"
                  />

                  <span>
                    {perk}
                  </span>

                </label>
              ))
            }

          </div>

        </div>

        {/* button */}
        <div className="md:col-span-2">

          <button className="btn btn-primary w-full">
            Update Ticket
          </button>

        </div>

      </form>

    </div>
  );
};

export default UpdateTicket;