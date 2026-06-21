import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../../firebase/firebase.init";
import axios from "axios";

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
      .then(async (result) => {
        console.log(result.user);

        // Firebase profile update
        await updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });

        // Save user to MongoDB
        await axios.post("https://backend-ticket-server.vercel.app/users", {
          name,
          email,
          photoURL: photo,
          
          createdAt: new Date(),
        });

        // 🔥 FIX: save user to localStorage (IMPORTANT)

        form.reset();
        setError("");

        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError("Registration Failed");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;

        await axios.post("https://backend-ticket-server.vercel.app/users", {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          
        });

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
        <h1 className="text-3xl font-bold text-center mb-4">Please Register</h1>

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset space-y-3">
            <input
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <input
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn btn-neutral w-full">Register</button>
          </fieldset>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border w-full"
        >
          Register with Google
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
