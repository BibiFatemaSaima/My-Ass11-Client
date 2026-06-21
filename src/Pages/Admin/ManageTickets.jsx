import { useEffect, useState } from "react";
import axios from "axios";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("https://backend-ticket-server.vercel.app/tickets").then((res) => {
      setTickets(res.data);
    });
  }, []);

  const approve = (id) => {
    axios
      .patch(`https://backend-ticket-server.vercel.app/tickets/approve/${id}`)
      .then(() => {
        alert("Approved");
      });
  };

  const reject = (id) => {
    axios
      .patch(`https://backend-ticket-server.vercel.app/tickets/reject/${id}`)
      .then(() => {
        alert("Rejected");
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tickets</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>From → To</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>
                {t.from} → {t.to}
              </td>
              <td>{t.price}</td>
              <td>{t.status}</td>

              <td className="space-x-2">
                <button
                  onClick={() => approve(t._id)}
                  className="btn btn-sm btn-success"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(t._id)}
                  className="btn btn-sm btn-error"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;
