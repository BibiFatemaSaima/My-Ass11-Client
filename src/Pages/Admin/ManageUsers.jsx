import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  const BASE_URL = "https://backend-ticket-server.vercel.app/";


  const fetchUsers = () => {
    axios.get(`${BASE_URL}/users`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };


  useEffect(() => {
    fetchUsers();
  }, []);




  const makeAdmin = (id) => {

    axios.patch(`${BASE_URL}/users/admin/${id}`)
      .then(res => {

        if (res.data.modifiedCount > 0) {

          fetchUsers();

        }

      })
      .catch(error => {

        console.log(error);

      });

  };




  const makeVendor = (id) => {

    axios.patch(`${BASE_URL}/users/vendor/${id}`)
      .then(res => {

        if (res.data.modifiedCount > 0) {

          fetchUsers();

        }

      })
      .catch(error => {

        console.log(error);

      });

  };



  return (

    <div className="p-6">


      <h2 className="text-3xl font-bold mb-6">

        Manage Users

      </h2>



      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Vendor</th>

            </tr>

          </thead>



          <tbody>


            {
              users.map((user, index) => (

                <tr key={user._id}>


                  <td>

                    {index + 1}

                  </td>



                  <td>

                    {user.name}

                  </td>



                  <td>

                    {user.email}

                  </td>



                  <td>

                    {user.role}

                  </td>




                  <td>

                    {
                      user.role === "admin"

                        ?

                        <span className="text-green-600 font-semibold">

                          Admin

                        </span>

                        :

                        <button
                          onClick={() => makeAdmin(user._id)}
                          className="btn btn-sm btn-primary"
                        >

                          Make Admin

                        </button>

                    }

                  </td>




                  <td>

                    {
                      user.role === "vendor"

                        ?

                        <span className="text-blue-600 font-semibold">

                          Vendor

                        </span>

                        :

                        <button
                          onClick={() => makeVendor(user._id)}
                          className="btn btn-sm btn-secondary"
                        >

                          Make Vendor

                        </button>

                    }

                  </td>


                </tr>

              ))
            }


          </tbody>

        </table>

      </div>


    </div>

  );

};

export default ManageUsers;