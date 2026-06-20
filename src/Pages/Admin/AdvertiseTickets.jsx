import { useEffect, useState } from "react";
import axios from "axios";

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("https://backend-ticket-server.vercel.apptickets").then((res) => {
      setTickets(res.data);
    });
  }, []);

  const toggleAdvertise = (id, current) => {
    axios.patch(
      `https://backend-ticket-server.vercel.apptickets/advertise/${id}`,
      {
        advertised: !current,
      },
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Advertise Tickets</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Advertised</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.price}</td>
              <td>{t.advertised ? "Yes" : "No"}</td>

              <td>
                <button
                  onClick={() => toggleAdvertise(t._id, t.advertised)}
                  className="btn btn-sm btn-info"
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTickets;
