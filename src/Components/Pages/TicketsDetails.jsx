import React, { useContext, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Components/AuthContext/AuthContext";

const TicketDetails = () => {
  const ticket = useLoaderData();
  const { user } = useContext(AuthContext);

  const [bookingQuantity, setBookingQuantity] = useState(1);

  const {
    _id,
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
    vendorEmail,
  } = ticket;

  // =======================
  // BOOKING HANDLER
  // =======================
  const handleBooking = () => {
    if (!user) {
      return toast.error("Please login first");
    }

    if (bookingQuantity < 1) {
      return toast.error("Invalid quantity");
    }

    if (bookingQuantity > quantity) {
      return toast.error("Not enough seats available");
    }

    const bookingData = {
      ticketId: _id,
      ticketTitle: title,

      buyerName: user?.displayName,
      buyerEmail: user?.email,

      vendorEmail: vendorEmail,

      seats: bookingQuantity, // ✅ IMPORTANT FIX (backend expects seats)

      totalPrice: price * bookingQuantity,

      paymentStatus: "pending", // ✅ FIXED (consistent naming)
      bookingDate: new Date(),
    };

    axios
      .post("http://localhost:3000/bookings", bookingData)
      .then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          toast.success("Booking Successful");

          document.getElementById("booking_modal").close();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Booking Failed");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 shadow-2xl rounded-2xl overflow-hidden">

        {/* IMAGE */}
        <div>
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* DETAILS */}
        <div className="p-6 space-y-4">

          <h1 className="text-4xl font-bold">{title}</h1>

          <p className="text-lg"><b>Route:</b> {from} → {to}</p>
          <p className="text-lg"><b>Transport:</b> {transportType}</p>
          <p className="text-lg"><b>Price:</b> ৳{price}</p>
          <p className="text-lg"><b>Available Seats:</b> {quantity}</p>
          <p className="text-lg"><b>Date:</b> {departureDate}</p>
          <p className="text-lg"><b>Time:</b> {departureTime}</p>

          {/* PERKS */}
          <div>
            <h2 className="text-xl font-bold mb-2">Perks</h2>
            <div className="flex flex-wrap gap-2">
              {perks?.map((perk, i) => (
                <span key={i} className="badge badge-outline">
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={quantity === 0}
            onClick={() => document.getElementById("booking_modal").showModal()}
            className="btn btn-primary w-full mt-5"
          >
            {quantity === 0 ? "No Seats Available" : "Book Now"}
          </button>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="booking_modal" className="modal">
        <div className="modal-box">

          <h3 className="font-bold text-2xl mb-4">Confirm Booking</h3>

          <div className="space-y-3">

            <input className="input input-bordered w-full" value={title} readOnly />
            <input className="input input-bordered w-full" value={user?.displayName || ""} readOnly />
            <input className="input input-bordered w-full" value={user?.email || ""} readOnly />

            <input
              type="number"
              min="1"
              max={quantity}
              value={bookingQuantity}
              onChange={(e) => setBookingQuantity(Number(e.target.value))}
              className="input input-bordered w-full"
            />

            <input
              className="input input-bordered w-full"
              value={`৳${price * bookingQuantity}`}
              readOnly
            />

          </div>

          <div className="modal-action">

            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>

            <button onClick={handleBooking} className="btn btn-primary">
              Confirm Booking
            </button>

          </div>

        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;