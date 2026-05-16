import React, { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const Login = () => {

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Email Password Login
  const handleLogIn = (event) => {

    event.preventDefault();

    const email = event.target.email.value;

    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {

        console.log(result.user);

        event.target.reset();

        setError("");

        navigate(from, { replace: true });

      })
      .catch((error) => {

        console.log(error.message);

        setError("Invalid email or password");

      });
  };

  // Forgot Password
  const handleForgotPassword = () => {

    const email = document.getElementsByName("email")[0].value;

    if (!email) {

      setError("Please enter your email first");

      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {

        alert("Password reset email sent");

        setError("");

      })
      .catch((error) => {

        console.log(error.message);

        setError("Failed to send reset email");

      });
  };

  // Google Login
  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {

        console.log(result.user);

        setError("");

        navigate(from, { replace: true });

      })
      .catch((error) => {

        console.log(error.message);

        setError("Google sign in failed");

      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-center mb-4">
          Please Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogIn}>

          <fieldset className="fieldset space-y-3">

            <label className="label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />

            <label className="label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />

            <div className="text-right">

              <button
                type="button"
                onClick={handleForgotPassword}
                className="link link-hover text-sm"
              >
                Forgot password?
              </button>

            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button className="btn btn-neutral w-full mt-2">
              Login
            </button>

          </fieldset>

        </form>

        {/* Divider */}
        <div className="divider">
          OR
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border border-gray-300 w-full flex gap-2 items-center justify-center"
        >

          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>

              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />

              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />

              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />

              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />

            </g>
          </svg>

          Login with Google

        </button>

        <p className="text-center mt-4">

          New to our website?{" "}

          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/register"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;