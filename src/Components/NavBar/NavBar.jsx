import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaBus } from "react-icons/fa";

import { toast } from "react-toastify";

import { AuthContext } from "../AuthContext/AuthContext";

const NavBar = () => {

  const { user, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = () => {

    logOut()
      .then(() => {

        console.log("Logged Out");

        toast.success("Logout Successful");

        navigate("/");

      })
      .catch((error) => {

        console.log(error.message);

        toast.error("Logout Failed");

      });

  };

  const links = (
    <>
      <li>
        <NavLink to="/">
          Home
        </NavLink>
      </li>

      {
        user ? (
          <>
            <li>
              <NavLink to="/myProfile">
                My Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/allTickets">
                All Tickets
              </NavLink>
            </li>

            {/* dashboard link */}
            <li>
              <NavLink to="/dashboard/user-profile">
                Dashboard
              </NavLink>
            </li>

          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/register">
                Register
              </NavLink>
            </li>
          </>
        )
      }
    </>
  );

  return (

    <div className="navbar bg-base-100 shadow-sm">

      <div className="navbar-start">

        <div className="dropdown">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />

            </svg>

          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >

            {links}

          </ul>

        </div>

        <a className="btn btn-ghost text-xl flex items-center gap-2">

          <FaBus />

          Ticket Bari

        </a>

      </div>

      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1">

          {links}

        </ul>

      </div>

      <div className="navbar-end">

        {
          user ? (
            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost flex items-center gap-2"
              >

                <img
                  src={user?.photoURL}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />

                <span>
                  {user?.displayName}
                </span>

              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >

                <li>
                  <NavLink to="/myProfile">
                    My Profile
                  </NavLink>
                </li>

                {/* dashboard dropdown */}
                <li>
                  <NavLink to="/dashboard/user-profile">
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <button onClick={handleLogOut}>
                    Logout
                  </button>
                </li>

              </ul>

            </div>
          ) : (
            <div className="flex gap-2">

              <NavLink
                to="/login"
                className="btn btn-outline"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="btn btn-primary"
              >
                Register
              </NavLink>

            </div>
          )
        }

      </div>

    </div>
  );
};

export default NavBar;