import React, { useContext } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthContext";

const AdminProfile = () => {

  const { user, role } = useContext(AuthContext);

  return (

    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        Admin Profile
      </h1>

      <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden">

        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-primary to-secondary"></div>

        <div className="px-8 pb-8 relative">

          {/* Profile Image */}
          <div className="flex justify-center">

            <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="admin"
              className="w-32 h-32 rounded-full border-4 border-white object-cover -mt-16 shadow-lg"
            />

          </div>

          {/* Name & Email */}
          <div className="text-center mt-4">

            <h2 className="text-3xl font-bold">
              {user?.displayName || "Admin"}
            </h2>

            <p className="text-gray-500 mt-2">
              {user?.email}
            </p>

          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div className="bg-base-200 p-5 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                Role
              </h3>

              <p>
                {role || "admin"}
              </p>
            </div>

            <div className="bg-base-200 p-5 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                Login Method
              </h3>

              <p>
                Firebase Authentication
              </p>
            </div>

            <div className="bg-base-200 p-5 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                Email Address
              </h3>

              <p className="break-all">
                {user?.email}
              </p>
            </div>

            <div className="bg-base-200 p-5 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                Admin UID
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

export default AdminProfile;