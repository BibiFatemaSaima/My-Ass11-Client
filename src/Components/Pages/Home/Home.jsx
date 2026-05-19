import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../../TicketCard/TicketCard";

const Home = () => {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3000/tickets")

      .then((res) => {

        setTickets(res.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <div>

      {/* hero section */}
      <div
        className="hero min-h-[80vh]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/VYw5vKHp/images-2.jpg)",
        }}
      >

        <div className="hero-overlay bg-opacity-60"></div>

        <div className="hero-content text-neutral-content text-center">

          <div className="max-w-2xl">

            <h1 className="mb-5 text-5xl font-bold">
              Welcome To Ticket Bari
            </h1>

            <p className="mb-5 text-lg">
              Book Bus, Train, Launch & Flight tickets easily
              with secure online booking.
            </p>

            <button className="btn btn-primary">
              Explore Tickets
            </button>

          </div>

        </div>

      </div>

      {/* latest tickets */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        <h1 className="text-4xl font-bold text-center mb-10">
          Latest Tickets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            tickets.slice(0, 6).map((ticket) => (

              <TicketCard
                key={ticket._id}
                ticket={ticket}
              />

            ))
          }

        </div>

      </div>

      {/* why choose us */}
      <div className="bg-base-200 py-16">

        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-4xl font-bold text-center mb-10">
            Why Choose Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="card bg-base-100 shadow-xl p-8 text-center">

              <h2 className="text-2xl font-bold mb-4">
                Fast Booking
              </h2>

              <p>
                Book tickets instantly with a smooth and secure
                online process.
              </p>

            </div>

            <div className="card bg-base-100 shadow-xl p-8 text-center">

              <h2 className="text-2xl font-bold mb-4">
                Secure Payment
              </h2>

              <p>
                Safe and trusted payment system for all bookings.
              </p>

            </div>

            <div className="card bg-base-100 shadow-xl p-8 text-center">

              <h2 className="text-2xl font-bold mb-4">
                24/7 Support
              </h2>

              <p>
                Our support team is always ready to help you anytime.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* popular routes */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        <h1 className="text-4xl font-bold text-center mb-10">
          Popular Routes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="card bg-primary text-primary-content p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold">
              Dhaka → Cox's Bazar
            </h2>
          </div>

          <div className="card bg-secondary text-secondary-content p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold">
              Dhaka → Sylhet
            </h2>
          </div>

          <div className="card bg-accent text-accent-content p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold">
              Chittagong → Dhaka
            </h2>
          </div>

          <div className="card bg-neutral text-neutral-content p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold">
              Barisal → Dhaka
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;