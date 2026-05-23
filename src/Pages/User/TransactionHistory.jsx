import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../Components/AuthContext/AuthContext";

const TransactionHistory = () => {

  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);

  // fetch transactions
  useEffect(() => {

    if (user?.email) {

      axios
        .get(`https://ass-11-server-sigma.vercel.app/${user.email}`)

        .then((res) => {

          setTransactions(res.data);

        })

        .catch((error) => {

          console.log(error);

        });

    }

  }, [user]);

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Transaction History
      </h1>

      {
        transactions.length === 0 ? (

          <div className="text-center text-xl font-semibold">
            No Transaction Found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="table">

              <thead>

                <tr>

                  <th>#</th>

                  <th>Ticket</th>

                  <th>Transaction ID</th>

                  <th>Amount</th>

                  <th>Payment Status</th>

                  <th>Booking Date</th>

                </tr>

              </thead>

              <tbody>

                {
                  transactions.map((transaction, index) => (

                    <tr key={transaction._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {transaction.ticketTitle}
                      </td>

                      <td>
                        {
                          transaction.transactionId
                            ? transaction.transactionId
                            : "Not Paid Yet"
                        }
                      </td>

                      <td>
                        ৳{transaction.totalPrice}
                      </td>

                      <td>

                        <span className="badge badge-primary">
                          {
                            transaction.paymentStatus
                              ? transaction.paymentStatus
                              : "Pending"
                          }
                        </span>

                      </td>

                      <td>
                        {
                          transaction.bookingDate
                            ? transaction.bookingDate
                            : "N/A"
                        }
                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>

        )
      }

    </div>
  );
};

export default TransactionHistory;