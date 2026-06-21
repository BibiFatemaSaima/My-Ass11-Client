import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const BASE_URL = "https://backend-ticket-server.vercel.app/";

  useEffect(() => {
    axios.get(`${BASE_URL}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const makeAdmin = (id) => {
    axios.patch(`${BASE_URL}/users/admin/${id}`).then(() => {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: "admin" } : u
        )
      );
    });
  };

  const makeVendor = (id) => {
    axios.patch(`${BASE_URL}/users/vendor/${id}`).then(() => {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: "vendor" } : u
        )
      );
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td className="space-x-2">
                <button
                  onClick={() => makeAdmin(u._id)}
                  className="btn btn-sm btn-primary"
                >
                  Make Admin
                </button>

                <button
                  onClick={() => makeVendor(u._id)}
                  className="btn btn-sm btn-secondary"
                >
                  Make Vendor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;