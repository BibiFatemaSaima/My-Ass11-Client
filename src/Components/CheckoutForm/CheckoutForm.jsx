import React, { useEffect, useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import axios from "axios";

import { toast } from "react-toastify";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();

  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  const [processing, setProcessing] = useState(false);

  // =======================
  // CREATE PAYMENT INTENT
  // =======================
  useEffect(() => {
    axios
      .post("https://backend-ticket-server.vercel.appcreate-payment-intent", {
        totalPrice: booking.totalPrice,
      })

      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [booking.totalPrice]);

  // =======================
  // HANDLE PAYMENT
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // create payment method
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);

      setProcessing(false);

      return;
    }

    // confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (result.error) {
      toast.error(result.error.message);

      setProcessing(false);

      return;
    }

    // =======================
    // PAYMENT SUCCESS
    // =======================
    if (result.paymentIntent.status === "succeeded") {
      // update booking status
      const paymentInfo = {
        paymentStatus: "paid",

        transactionId: result.paymentIntent.id,

        paymentDate: new Date(),
      };

      try {
        const res = await axios.patch(
          `https://backend-ticket-server.vercel.appbookings/${booking._id}`,
          paymentInfo,
        );

        console.log(res.data);

        toast.success("Payment Successful!");
      } catch (error) {
        console.log(error);

        toast.error("Database update failed");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border rounded-lg p-5">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : `Pay ৳${booking.totalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
