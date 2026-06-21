import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const AddTicket = () => {
  const { user } = useContext(AuthContext);

  const [selectedPerks, setSelectedPerks] = useState([]);

  // handle checkbox
  const handlePerks = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setSelectedPerks([...selectedPerks, value]);
    } else {
      const remaining = selectedPerks.filter((perk) => perk !== value);

      setSelectedPerks(remaining);
    }
  };

  // add ticket
  const handleAddTicket = (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const from = form.from.value;
    const to = form.to.value;
    const transportType = form.transportType.value;
    const price = parseInt(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const departureDate = form.departureDate.value;
    const departureTime = form.departureTime.value;
    const image = form.image.value;

    const ticketData = {
      title,
      from,
      to,
      transportType,
      price,
      quantity,
      departureDate,
      departureTime,
      perks: selectedPerks,
      image,
      vendorName: user?.displayName,
      vendorEmail: user?.email,
      status: "approved",
      advertised: false,
      createdAt: new Date(),
    };

    axios
      .post("https://backend-ticket-server.vercel.app/tickets", ticketData)

      .then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          toast.success("Ticket Added Successfully");

          form.reset();

          setSelectedPerks([]);
        }
      })

      .catch((error) => {
        console.log(error);

        toast.error("Failed To Add Ticket");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-base-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center mb-10">Add Ticket</h2>

        <form onSubmit={handleAddTicket} className="space-y-6">
          {/* title */}
          <div>
            <label className="label font-bold">Ticket Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter ticket title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* from & to */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label font-bold">From</label>

              <input
                type="text"
                name="from"
                placeholder="From Location"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-bold">To</label>

              <input
                type="text"
                name="to"
                placeholder="To Location"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* transport */}
          <div>
            <label className="label font-bold">Transport Type</label>

            <select
              name="transportType"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Transport</option>

              <option value="Bus">Bus</option>

              <option value="Train">Train</option>

              <option value="Launch">Launch</option>

              <option value="Flight">Flight</option>
            </select>
          </div>

          {/* price & quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label font-bold">Price</label>

              <input
                type="number"
                name="price"
                placeholder="Ticket Price"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-bold">Ticket Quantity</label>

              <input
                type="number"
                name="quantity"
                placeholder="Available Seats"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* departure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label font-bold">Departure Date</label>

              <input
                type="date"
                name="departureDate"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-bold">Departure Time</label>

              <input
                type="time"
                name="departureTime"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* perks */}
          <div>
            <label className="label font-bold mb-2">Perks</label>

            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="AC"
                  onChange={handlePerks}
                  className="checkbox"
                />
                AC
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="WiFi"
                  onChange={handlePerks}
                  className="checkbox"
                />
                WiFi
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Breakfast"
                  onChange={handlePerks}
                  className="checkbox"
                />
                Breakfast
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Charging Port"
                  onChange={handlePerks}
                  className="checkbox"
                />
                Charging Port
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Cabin"
                  onChange={handlePerks}
                  className="checkbox"
                />
                Cabin
              </label>
            </div>
          </div>

          {/* image */}
          <div>
            <label className="label font-bold">Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* vendor name */}
          <div>
            <label className="label font-bold">Vendor Name</label>

            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* vendor email */}
          <div>
            <label className="label font-bold">Vendor Email</label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* button */}
          <button type="submit" className="btn btn-primary w-full">
            Add Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
