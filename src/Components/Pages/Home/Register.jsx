import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const Register = () => {

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event) => {

    event.preventDefault();

    const form = event.target;

    const name = form.name.value;

    const email = form.email.value;

    const password = form.password.value;

    const photo = form.photo.value;

    // Password Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must have an uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must have a lowercase letter");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        console.log(result.user);

        // Update User Profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {

            console.log("Profile Updated");

          })
          .catch((error) => {

            console.log(error.message);

          });

        form.reset();

        setError("");

        navigate("/");

      })
      .catch((error) => {

        console.log(error.message);

        setError("Registration Failed");

      });
  };

  // Google Register
  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {

        console.log(result.user);

        setError("");

        navigate("/");

      })
      .catch((error) => {

        console.log(error.message);

        setError("Google Sign In Failed");

      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-center mb-4">
          Please Register
        </h1>

        {/* Register Form */}
        <form onSubmit={handleRegister}>

          <fieldset className="fieldset space-y-3">

            <label className="label">
              Name
            </label>

            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              required
            />

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

            <label className="label">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              className="input input-bordered w-full"
              placeholder="Enter photo URL"
              required
            />

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button className="btn btn-neutral w-full mt-2">
              Register
            </button>

          </fieldset>

        </form>

        {/* Divider */}
        <div className="divider">
          OR
        </div>

        {/* Google Register */}
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

          Register with Google

        </button>

        <p className="text-center mt-4">

          Already have an account?{" "}

          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/login"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;