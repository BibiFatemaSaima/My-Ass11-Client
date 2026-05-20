import React, { useContext } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthContext";

const UserProfile = () => {

  const { user } = useContext(AuthContext);

  return (

    <div className="max-w-4xl mx-auto">

      {/* heading */}
      <h1 className="text-4xl font-bold mb-10">
        My Profile
      </h1>

      {/* profile card */}
      <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden">

        {/* top banner */}
        <div className="h-40 bg-gradient-to-r from-primary to-secondary"></div>

        {/* profile content */}
        <div className="px-8 pb-8 relative">

          {/* image */}
          <div className="flex justify-center">

            <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="user"
              className="w-32 h-32 rounded-full border-4 border-white object-cover -mt-16 shadow-lg"
            />

          </div>

          {/* name */}
          <div className="text-center mt-4">

            <h2 className="text-3xl font-bold">
              {user?.displayName || "No Name"}
            </h2>

            <p className="text-gray-500 mt-2">
              {user?.email}
            </p>

          </div>

          {/* info section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            {/* role */}
            <div className="bg-base-200 p-5 rounded-xl">

              <h3 className="text-lg font-bold mb-2">
                Role
              </h3>

              <p className="text-base">
                User
              </p>

            </div>

            {/* provider */}
            <div className="bg-base-200 p-5 rounded-xl">

              <h3 className="text-lg font-bold mb-2">
                Login Method
              </h3>

              <p className="text-base">
                Firebase Authentication
              </p>

            </div>

            {/* email */}
            <div className="bg-base-200 p-5 rounded-xl">

              <h3 className="text-lg font-bold mb-2">
                Email Address
              </h3>

              <p className="text-base break-words">
                {user?.email}
              </p>

            </div>

            {/* uid */}
            <div className="bg-base-200 p-5 rounded-xl">

              <h3 className="text-lg font-bold mb-2">
                User UID
              </h3>

              <p className="text-sm break-all">
                {user?.uid}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;