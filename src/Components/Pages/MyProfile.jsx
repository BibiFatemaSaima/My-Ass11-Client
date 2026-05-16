import React, { useContext } from "react";

import { AuthContext } from "../../components/AuthContext/AuthContext";

const MyProfile = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl">

        <div className="card-body items-center text-center">

          <h1 className="text-3xl font-bold mb-5">
            My Profile
          </h1>

          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />

          <div className="mt-5 space-y-3">

            <h2 className="text-2xl font-semibold">
              {user?.displayName || "No Name"}
            </h2>

            <p className="text-gray-600">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyProfile;