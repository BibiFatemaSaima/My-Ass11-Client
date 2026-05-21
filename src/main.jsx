import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./index.css";

import { router } from "./routes/router.jsx";
import AuthProvider from "./Components/AuthContext/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Elements>
    </AuthProvider>
  </StrictMode>
);