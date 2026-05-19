import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TicketCard from "../../components/TicketCard/TicketCard";

const AllTickets = () => {

  const [tickets, setTickets] = useState([]);

  // search
  const [search, setSearch] = useState("");

  // filter
  const [transportFilter, setTransportFilter] = useState("All");

  // sort
  const [sortOrder, setSortOrder] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const ticketsPerPage = 6;

  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get("http://localhost:3000/tickets")

      .then((res) => {

        // only approved tickets
        const approvedTickets = res.data.filter(
          (ticket) => ticket.status === "approved"
        );

        setTickets(approvedTickets);

        setLoading(false);

      })

      .catch((error) => {

        console.log(error);

        setLoading(false);

      });

  }, []);

  // filter + search + sort
  const filteredTickets = useMemo(() => {

    let filtered = [...tickets];

    // search by from/to
    if (search) {

      filtered = filtered.filter((ticket) =>

        ticket.from.toLowerCase().includes(search.toLowerCase()) ||

        ticket.to.toLowerCase().includes(search.toLowerCase())

      );

    }

    // transport filter
    if (transportFilter !== "All") {

      filtered = filtered.filter(
        (ticket) => ticket.transportType === transportFilter
      );

    }

    // sort by price
    if (sortOrder === "low-high") {

      filtered.sort((a, b) => a.price - b.price);

    }

    else if (sortOrder === "high-low") {

      filtered.sort((a, b) => b.price - a.price);

    }

    return filtered;

  }, [tickets, search, transportFilter, sortOrder]);

  // pagination
  const totalPages = Math.ceil(
    filteredTickets.length / ticketsPerPage
  );

  const startIndex = (currentPage - 1) * ticketsPerPage;

  const endIndex = startIndex + ticketsPerPage;

  const currentTickets = filteredTickets.slice(
    startIndex,
    endIndex
  );

  // loading spinner
  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        All Tickets
      </h1>

      {/* search + filter + sort */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10">

        {/* search */}
        <input
          type="text"
          placeholder="Search by From / To"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setCurrentPage(1);

          }}
        />

        {/* filter */}
        <select
          className="select select-bordered w-full lg:w-60"
          value={transportFilter}
          onChange={(e) => {

            setTransportFilter(e.target.value);

            setCurrentPage(1);

          }}
        >

          <option value="All">
            All Transport
          </option>

          <option value="Bus">
            Bus
          </option>

          <option value="Train">
            Train
          </option>

          <option value="Flight">
            Flight
          </option>

          <option value="Launch">
            Launch
          </option>

        </select>

        {/* sort */}
        <select
          className="select select-bordered w-full lg:w-60"
          value={sortOrder}
          onChange={(e) => {

            setSortOrder(e.target.value);

            setCurrentPage(1);

          }}
        >

          <option value="">
            Sort By Price
          </option>

          <option value="low-high">
            Low to High
          </option>

          <option value="high-low">
            High to Low
          </option>

        </select>

      </div>

      {/* no tickets */}
      {
        currentTickets.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No Tickets Found
            </h2>

          </div>
        )
      }

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          currentTickets.map((ticket) => (

            <TicketCard
              key={ticket._id}
              ticket={ticket}
            />

          ))
        }

      </div>

      {/* pagination */}
      {
        totalPages > 1 && (

          <div className="flex justify-center mt-10 gap-3 flex-wrap">

            {/* prev */}
            <button
              className="btn btn-outline"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Prev
            </button>

            {/* page numbers */}
            {
              [...Array(totalPages).keys()].map((number) => (

                <button
                  key={number}
                  onClick={() =>
                    setCurrentPage(number + 1)
                  }
                  className={`btn ${
                    currentPage === number + 1
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                >
                  {number + 1}
                </button>
              ))
            }

            {/* next */}
            <button
              className="btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>

          </div>
        )
      }

    </div>
  );
};

export default AllTickets;