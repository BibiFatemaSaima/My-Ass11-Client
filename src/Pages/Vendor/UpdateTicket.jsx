import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTicket = () => {
  const ticket = useLoaderData();
  const navigate = useNavigate();

  const [selectedPerks, setSelectedPerks] = useState([]);

  // ✅ SAFE INIT
  useEffect(() => {
    if (ticket?.perks && Array.isArray(ticket.perks)) {
      setSelectedPerks(ticket.perks);
    } else {
      setSelectedPerks([]);
    }
  }, [ticket]);

  // checkbox handler
  const handlePerksChange = (e) => {
    const value = e.target.value;

    setSelectedPerks((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((p) => p !== value)
    );
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
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      departureDate: form.departureDate.value,
      departureTime: form.departureTime.value,
      image: form.image.value,
      perks: selectedPerks,
      status: "pending",
    };

    axios
      .put(`http://localhost:3000/tickets/${ticket?._id}`, updatedTicket)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Ticket Updated Successfully");
          navigate("/dashboard/myAddedTickets");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update Failed");
      });
  };

  // ✅ IMPORTANT: loader empty hole crash prevent
  if (!ticket) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading ticket...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Update Ticket
      </h1>

      <form
        onSubmit={handleUpdateTicket}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          name="title"
          defaultValue={ticket.title}
          className="input input-bordered w-full"
          placeholder="Title"
        />

        <input
          name="from"
          defaultValue={ticket.from}
          className="input input-bordered w-full"
        />

        <input
          name="to"
          defaultValue={ticket.to}
          className="input input-bordered w-full"
        />

        <select
          name="transportType"
          defaultValue={ticket.transportType}
          className="select select-bordered w-full"
        >
          <option>Bus</option>
          <option>Train</option>
          <option>Launch</option>
          <option>Flight</option>
        </select>

        <input
          name="price"
          type="number"
          defaultValue={ticket.price}
          className="input input-bordered w-full"
        />

        <input
          name="quantity"
          type="number"
          defaultValue={ticket.quantity}
          className="input input-bordered w-full"
        />

        <input
          name="departureDate"
          type="date"
          defaultValue={ticket.departureDate}
          className="input input-bordered w-full"
        />

        <input
          name="departureTime"
          defaultValue={ticket.departureTime}
          className="input input-bordered w-full"
        />

        <input
          name="image"
          defaultValue={ticket.image}
          className="input input-bordered w-full md:col-span-2"
        />

        {/* perks */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-3">
            {[
              "AC",
              "WiFi",
              "Charging Port",
              "Meal",
              "Breakfast",
              "Dinner",
              "Cabin",
            ].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={perk}
                  checked={selectedPerks.includes(perk)}
                  onChange={handlePerksChange}
                />
                {perk}
              </label>
            ))}
          </div>
        </div>

        <button className="btn btn-primary md:col-span-2">
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default UpdateTicket;