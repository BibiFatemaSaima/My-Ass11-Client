import React from "react";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import { useLoaderData } from "react-router-dom";

import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

// stripe public key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PK
);

const PaymentPage = () => {

  const booking = useLoaderData() || {};

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <div className="bg-base-100 shadow-2xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-10">
          Complete Payment
        </h1>

        {/* booking info */}
        <div className="space-y-4 mb-10">

          <p className="text-xl">
            <span className="font-bold">
              Ticket Name:
            </span>{" "}
            {booking.title}
          </p>

          <p className="text-xl">
            <span className="font-bold">
              Route:
            </span>{" "}
            {booking.from} → {booking.to}
          </p>

          <p className="text-xl">
            <span className="font-bold">
              Seats:
            </span>{" "}
            {booking.seats}
          </p>

          <p className="text-xl">
            <span className="font-bold">
              Total Amount:
            </span>{" "}
            ৳{booking.totalPrice}
          </p>

        </div>

        {/* stripe payment form */}
        <div className="border rounded-xl p-6">

          <Elements stripe={stripePromise}>

            <CheckoutForm booking={booking} />

          </Elements>

        </div>

      </div>

    </div>
  );
};

export default PaymentPage;