import React from "react";
import { NavLink } from "react-router";
import { FaBus, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiStripe } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Column 1 */}
        <div>

          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <FaBus className="text-yellow-400" />
            <h2>TicketBari</h2>
          </div>

          <p className="text-gray-300">
            Book bus, train, launch & flight tickets easily.
          </p>

        </div>

        {/* Column 2 */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>
              <NavLink to="/" className="hover:text-yellow-400">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/allTickets" className="hover:text-yellow-400">
                All Tickets
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className="hover:text-yellow-400">
                Contact Us
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-yellow-400">
                About
              </NavLink>
            </li>

          </ul>

        </div>

        {/* Column 3 */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact Info
          </h3>

          <div className="space-y-3 text-gray-300">

            <p className="flex items-center gap-2">
              <MdEmail />
              ticketbari@gmail.com
            </p>

            <p className="flex items-center gap-2">
              <FaPhoneAlt />
              +880 1234-567890
            </p>

            <p className="flex items-center gap-2">
              <FaFacebook />
              Facebook Page
            </p>

          </div>

        </div>

        {/* Column 4 */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Payment Methods
          </h3>

          <div className="flex items-center gap-3 text-4xl">

            <SiStripe className="text-blue-400" />

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">

        <p>
          © 2025 TicketBari. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;